const formatMessage = require('format-message');
const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
// const Cast = require('../../util/cast');
const DOMPurify  = require('dompurify');

const icon = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPg0KPHN2ZyBmaWxsPSIjMDAwMDAwIiB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZWxsaXBzZSBjeD0iMy43MiIgY3k9IjQuMDIiIHJ4PSIuNjciIHJ5PSIuNjIiLz48cGF0aCBkPSJNNi4yOSA0LjY1QS42NS42NSAwIDAgMCA3IDRhLjY3LjY3IDAgMCAwLTEuMzggMCAuNjUuNjUgMCAwIDAgLjY3LjY1eiIvPjxlbGxpcHNlIGN4PSI4Ljg3IiBjeT0iNC4wMiIgcng9Ii42NyIgcnk9Ii42MyIvPjxwYXRoIGQ9Ik0xNC4yNSAxLjVIMS43NUExLjI1IDEuMjUgMCAwIDAgLjUgMi43NXYxMC41YTEuMjUgMS4yNSAwIDAgMCAxLjI1IDEuMjVoMTIuNWExLjI1IDEuMjUgMCAwIDAgMS4yNS0xLjI1VjIuNzVhMS4yNSAxLjI1IDAgMCAwLTEuMjUtMS4yNXpNMS43NSAyLjc1aDEyLjV2Mi41SDEuNzV2LTIuNXptMCAxMC41VjYuNWgxMi41djYuNzV6Ii8+PC9zdmc+"

class Net {
    constructor(runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo() {
        return {
            id: "snnet",
            name: "SN-Net",
            blockIconURI: icon,
            menuIconURI: icon,
            docsURI: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            color1: "#ff964c",
            color2: "#fd8a5e",
            blocks: [
              {
                    opcode: "getUrl",
                    text: formatMessage({
                        id: "sn.net.getUrl",
                        default: "current URL",
                        description: "Block that returns the current url"
                    }),
                    blockType: BlockType.REPORTER,
              },
              {
                    opcode: 'checkIfQueryStringFieldExists',
                    text: formatMessage({
                        id: "sn.net.queryField",
                        defualt: "field [FIELD] exists in current URL"
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        FIELD: {
                            type: ArgumentType.STRING,
                            defaultValue: 'search'
                        }
                    }
                },
              {
                    opcode: 'getQueryStringFieldValue',
                    text: formatMessage({
                      id: "sn.net.getQueryField",
                      defualt: "field [FIELD] in current URL"
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        FIELD: {
                            type: ArgumentType.STRING,
                            defaultValue: 'search'
                        }
                    }
                },
              {
                    opcode: 'openUrl',
                    text: formatMessage({
                        id: "sn.net.openURL",
                        defualt: "open [URL] URL",
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        URL: {
                            type: ArgumentType.STRING,
                            defaultValue: 'https://cube-enix.github.io/'
                        }
                    }
                },
              {
                    opcode: 'localStorageSetItem',
                    text: formatMessage({
                        id: "sn.net.saveData",
                        defualt: "save [NAME] to [VALUE] to saveData"
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: 'var'
                        },
                        VALUE: {
                            type: ArgumentType.STRING,
                            defaultValue: '1'
                        }
                    }
                },
                {
                    opcode: 'localStorageGetItem',
                    text: formatMessage({
                        id: "sn.net.getData",
                        defualt: "return [NAME] from save data"
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: 'var'
                        }
                    }
                },
                {
                    opcode: 'localStorageRemoveItem',
                    text: formatMessage({
                        id: "sn.net.purgeData",
                        defualt: "remove [NAME] from saveData"
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: 'var'
                        }
                    }
                },
                {
                    opcode: 'localStorageItemExists',
                    blockType: BlockType.BOOLEAN,
                    text: formatMessage({
                        id: "sn.net.saveDataExist",
                        defualt: "does [NAME] exist?"
                    }),
                    arguments: {
                        NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: 'var'
                        }
                    }
                },
            ],
            menus: {},
        };
    }

    getUrl () {
        return window.location.href;
    }

  	checkIfQueryStringFieldExists (args) {
        const field = args.FIELD
        let parameters = (new URL(window.location)).searchParams
        return parameters.has(field)
    }

    getQueryStringFieldValue (args) {
        const field = args.FIELD
        let parameters = (new URL(window.location)).searchParams
        const value = parameters.get(field)
        // Be sure to always return a valid string/ If the field can't be found,
        // we return an empty string.
        return value !== null ? value : ''
    	}

    openUrl (args) {
        window.open(args.URL, '_blank')
    }

    localStorageSetItem (args) {
        localStorage.setItem(
            this.getLocalStorageKey(args.NAME),
            args.VALUE
        )
    }

    localStorageGetItem (args) {
        const value = localStorage.getItem(this.getLocalStorageKey(args.NAME))
        return value || ''
    }
    
    localStorageRemoveItem (args) {
        localStorage.removeItem(this.getLocalStorageKey(args.NAME))
    }
    
    localStorageItemExists (args) {
        return localStorage.getItem(this.getLocalStorageKey(args.NAME)) !== null
    }
}

module.exports = Net;
