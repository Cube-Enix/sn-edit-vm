const formatMessage = require('format-message');
const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
// const Cast = require('../../util/cast');
const DOMPurify  = require('dompurify');

class HighClass {
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
            id: "hc",
            name: "HighClass",
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
                        description:
                            "Block that returns the current url,
                    }),
                    blockType: BlockType.REPORTER,
                },
              {
                    opcode: 'checkIfQueryStringFieldExists',
                    blockType: BlockType.BOOLEAN,
                    text: formatMessage({
                        id: "sn.net.queryField",
                        defualt: "field [FIELD] exists in current URL"
                    }),
                    arguments: {
                        FIELD: {
                            type: ArgumentType.STRING,
                            defaultValue: 'search'
                        }
                    }
                },
              {
                    opcode: 'getQueryStringFieldValue',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                      id: "sn.net.getQueryField",
                      defualt: "field [FIELD] in current URL"
                    }),
                    arguments: {
                        FIELD: {
                            type: ArgumentType.STRING,
                            defaultValue: 'search'
                        }
                    }
                },
              {
                    opcode: 'openUrl',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: "sn.net.openURL",
                        defualt: "open [URL] URL",
                    }),
                    arguments: {
                        URL: {
                            type: ArgumentType.STRING,
                            defaultValue: 'https://cube-enix.github.io/'
                        }
                    }
                },
              {
                    opcode: 'localStorageSetItem',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: "sn.net.saveData",
                        defualt: "save [NAME] to [VALUE] to saveData"
                    }),
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
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: "sn.net.getData",
                        defualt: "return [NAME] from save data"
                    }),
                    arguments: {
                        NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: 'var'
                        }
                    }
                },
                {
                    opcode: 'localStorageRemoveItem',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: "sn.net.purgeData",
                        defualt: "remove [NAME] from saveData"
                    }),
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
        },
    };

    getUrl () {
        return window.location.href;
    }
}

module.exports = HighClass;