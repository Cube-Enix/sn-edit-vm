const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const formatMessage = require('format-message');
const axios = require('axios').default;
const config = {
    baseURL: 'https://data.codingclip.com/',
    timeout: 10000
};

// eslint-disable-next-line max-len
const defaultUA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36';
const icon = ''

class sn {
    constructor(runtime) {
        this.runtime = runtime;
        this.client = axios.create(config);
    }
    getInfo() {
        return {
            id: 'apifiy',
            name: 'Axolotol',
            blockIconURI: icon,
            menuIconURI: icon,
            docsURI: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            color1: '#ff964c',
            color2: '#fd8a5e',
            blocks: [
                {
                    opcode: 'setUA',
                    text: formatMessage({
                        id: 'sn.setUA',
                        default: 'set User-Agent to [UA]',
                        description: 'http set useragent'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        UA: {
                            type: ArgumentType.STRING,
                            defaultValue: defaultUA
                        }
                    }
                },
                {
                    opcode: 'setHeader',
                    text: formatMessage({
                        id: 'sn.setHeader',
                        default: 'set header to [HEADER]',
                        description: 'http set header'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        HEADER: {
                            type: ArgumentType.STRING,
                            defaultValue: JSON.stringify({
                                'Content-Type': 'application/json;charset=utf-8',
                                'User-Agent': defaultUA
                            })
                        }
                    }
                },
                {
                    opcode: 'httpGet',
                    text: formatMessage({
                        id: 'sn.httpGet',
                        default: 'get data from [URL]',
                        description: 'http get'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        URL: {
                            type: ArgumentType.STRING,
                            defaultValue: 'https://SNext-eService.simple21.repl.co/testUbject'
                        }
                    }
                },
                {
                    opcode: 'httpPost',
                    text: formatMessage({
                        id: 'sn.httpPost',
                        default: 'post to [URL] with data [JSON]',
                        description: 'http post'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        URL: {
                            type: ArgumentType.STRING,
                            defaultValue: 'https://SNext-eService.simple21.repl.co'
                        },
                        JSON: {
                            type: ArgumentType.STRING,
                            defaultValue: `{"key": "value"}`
                        }
                    }
                }]
        };
    }

    setUA(args) {
        this.client.defaults.headers.common['User-Agent'] = args.UA;
    }

    setHeader(args) {
        const header = JSON.parse(args.HEADER);
        this.client.defaults.headers.common = Object.assign(this.client.defaults.headers.common, header);
    }

    httpGet(args) {
        return new Promise((resolve, reject) => {
            this.client.get(args.URL).then(res => {
                if (typeof res.data === 'object') resolve(JSON.stringify(res.data));
                resolve(res.data);
            })
                .catch(err => reject(err));
        });
    }

    httpPost (args) {
        return new Promise((resolve, reject) => {
            const postData = JSON.parse(args.JSON);
            this.client.post(args.URL, postData).then(res => {
                if (typeof res.data === 'object') resolve(JSON.stringify(res.data));
                resolve(res.data);
            })
                .catch(err => reject(err));
        });
    }
}

module.exports = sn;