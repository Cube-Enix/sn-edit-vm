const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const formatMessage = require('format-message');

const icon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' width='152.972' height='98.62465' viewBox='0,0,152.972,98.62465'%3E%3Cg transform='translate(-243.514,-130.68767)'%3E%3Cg data-paper-data='%7B&quot;isPaintingLayer&quot;:true%7D' fill-rule='nonzero' stroke-dasharray='' stroke-dashoffset='0' style='mix-blend-mode: normal'%3E%3Cpath d='M365.06311,197.12876c-5.81509,36.96666 -35.39002,32.18455 -63.99112,28.87686c-28.6011,-3.30769 -33.96041,-12.52486 -28.18382,-38.57949c5.7766,-26.05463 24.29098,-44.77027 54.05748,-44.12384c29.7665,0.64643 43.93255,16.85981 38.11746,53.82647z' fill='%23f7aa32' stroke='none' stroke-width='1.99937' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10'/%3E%3Cpath d='M352.81932,218.38213c6.48456,6.18911 -22.8644,15.06167 -53.82646,8.77856c-30.96206,-6.28311 -29.80215,-20.37937 -28.41483,-27.49077c1.38731,-7.1114 24.72086,-14.38132 44.58587,-8.77856c19.86501,5.60276 26.35194,18.98626 37.65542,27.49077z' fill='%23fbede4' stroke='none' stroke-width='1.99937' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10'/%3E%3Cpath d='M298.51223,172.26398c-0.48959,4.05329 -3.24812,7.24467 -6.8164,7.0729c-3.56828,-0.17178 -7.18465,-3.75741 -6.10548,-7.69495c1.19785,-4.37054 4.76479,-6.64397 6.8164,-7.0729c5.10602,-1.0675 6.65126,3.17641 6.10548,7.69495z' fill='%232c2c2b' stroke='none' stroke-width='1.99937' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10'/%3E%3Cpath d='M309.60888,189.76822c-0.59621,4.03898 -3.06807,6.6675 -7.15082,6.6675c-4.08275,0 -7.29836,-3.31081 -7.39247,-7.39248c-0.08815,-3.82298 3.52021,-6.76103 7.60296,-6.76103c4.08275,0 7.41067,4.29974 6.94033,7.48601z' fill='%232c2c2b' stroke='none' stroke-width='1.99937' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10'/%3E%3Cpath d='M313.31578,200.36297c-5.94532,0.62097 -12.97873,3.27011 -11.78176,-6.69943c-2.57254,8.43708 -6.72314,6.27781 -10.39567,5.31334' fill='none' stroke='%232c2c2b' stroke-width='6' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='4'/%3E%3Cpath d='M326.15111,175.02449c-0.48959,4.05329 -3.24812,7.24467 -6.8164,7.0729c-3.56828,-0.17178 -7.18465,-3.75741 -6.10548,-7.69495c1.19785,-4.37054 4.76479,-6.64397 6.8164,-7.0729c5.10602,-1.0675 6.65126,3.17641 6.10548,7.69495z' fill='%232c2c2b' stroke='none' stroke-width='1.99937' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='10'/%3E%3Cpath d='M321.65425,143.72333l-29.0006,10.94725c0.9388,-7.36218 5.45558,-21.06769 12.86782,-23.04683c7.41223,-1.97914 12.66848,6.02507 16.13278,12.09959z' fill='%23f7aa32' stroke='none' stroke-width='18' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='4'/%3E%3Cpath d='M344.31696,146.22007c5.35447,-3.08983 12.19783,-9.42572 18.43747,-4.41731c6.23964,5.00841 3.53307,16.83399 1.72851,25.35152z' fill='%23f7aa32' stroke='none' stroke-width='18' stroke-linecap='round' stroke-linejoin='round' stroke-miterlimit='4'/%3E%3Cpath d='M243.514,175.10382c2.28874,0.03602 4.52251,-0.70239 6.33886,-2.09542c1.6796,-1.40668 2.82846,-3.34477 3.2564,-5.49341c0.6727,-3.93242 0.9626,-7.92076 0.86568,-11.90913c0.03236,-5.62285 0.13349,-9.32692 0.30339,-11.11222c0.17997,-2.35171 0.75146,-4.65684 1.6909,-6.82024c0.71584,-1.57294 1.75672,-2.97641 3.05414,-4.11803c1.36807,-1.10576 2.95706,-1.90576 4.66009,-2.34623c2.0557,-0.40725 4.15139,-0.57691 6.24582,-0.50565h2.83165v7.92863h-1.5655c-2.48227,-0.31583 -4.98852,0.36492 -6.96991,1.89316c-1.46674,2.56315 -2.06953,5.53032 -1.71922,8.4626c0.13529,5.57898 -0.04976,11.16112 -0.5542,16.71889c-0.36729,2.98303 -1.43156,5.83772 -3.10673,8.33315c-1.85398,2.25574 -4.21623,4.0399 -6.89305,5.2062c3.44982,1.32252 6.30959,3.84061 8.05808,7.09531c1.98833,4.96009 2.84247,10.30198 2.49995,15.63477c0,6.56675 0.06741,10.47712 0.20226,11.73114c0.05172,1.79284 0.78012,3.49964 2.03879,4.7774c1.94947,1.12144 4.20333,1.59853 6.43999,1.36324h1.5655v7.94077h-2.83165c-2.41847,0.11155 -4.83932,-0.16153 -7.17217,-0.80904c-2.09904,-0.73419 -3.95315,-2.03655 -5.35587,-3.76205c-1.49115,-1.91215 -2.44244,-4.18907 -2.75479,-6.59371c-0.51463,-4.34092 -0.73761,-8.71148 -0.66746,-13.08224c0.10886,-4.2061 -0.181,-8.41302 -0.86568,-12.56445c-0.4348,-2.14941 -1.58215,-4.08923 -3.2564,-5.50554c-1.80995,-1.40774 -4.04619,-2.15554 -6.33886,-2.11969z' fill='%23fbc02d' stroke='none' stroke-width='1' stroke-linecap='butt' stroke-linejoin='miter' stroke-miterlimit='10'/%3E%3Cpath d='M396.486,183.33584c-2.29267,-0.03584 -4.52891,0.71196 -6.33886,2.11969c-1.67426,1.41631 -2.8216,3.35614 -3.2564,5.50554c-0.68273,4.15567 -0.96988,8.36671 -0.85759,12.57659c0.06478,4.37112 -0.16361,8.74168 -0.68364,13.08224c-0.31235,2.40464 -1.26365,4.68155 -2.75479,6.59371c-1.40272,1.72551 -3.25683,3.02787 -5.35587,3.76205c-2.33286,0.64752 -4.7537,0.92059 -7.17217,0.80904h-2.83165v-7.92458h1.5655c2.23666,0.23529 4.49052,-0.2418 6.43999,-1.36324c1.26634,-1.28155 1.99808,-2.99662 2.04688,-4.79763c0.13485,-1.24593 0.20226,-5.1563 0.20226,-11.73114c-0.34253,-5.33279 0.51162,-10.67469 2.49995,-15.63477c1.75,-3.25167 4.60959,-5.76672 8.05808,-7.08722c-2.67055,-1.16733 -5.02701,-2.94994 -6.87687,-5.20215c-1.67517,-2.49544 -2.73944,-5.35013 -3.10673,-8.33315c-0.50444,-5.55777 -0.68949,-11.13991 -0.5542,-16.71889c0.35032,-2.93228 -0.25248,-5.89945 -1.71922,-8.4626c-1.98139,-1.52824 -4.48765,-2.20899 -6.96991,-1.89316h-1.5655v-7.93268h2.83165c2.08905,-0.07002 4.17924,0.09963 6.22964,0.50565c1.69909,0.4433 3.28381,1.24461 4.64796,2.35027c1.29742,1.14162 2.3383,2.54509 3.05414,4.11803c0.93944,2.1634 1.51093,4.46853 1.6909,6.82024c0.16721,1.7853 0.26834,5.48936 0.30339,11.11222c-0.10038,3.99215 0.18683,7.9846 0.85759,11.92126c0.43051,2.14425 1.57915,4.07768 3.2564,5.48127c1.81634,1.39303 4.05011,2.13145 6.33886,2.09542z' fill='%23fbc02d' stroke='none' stroke-width='1' stroke-linecap='butt' stroke-linejoin='miter' stroke-miterlimit='10'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
// var StartAT

class tree {
    constructor (runtime) {
        this.runtime = runtime;
    }

    getInfo () {
        return {
            id: 'tree',
            name: 'TreeSN',
            blockIconURI: icon,
            menuIconURI: icon,
            color1: '#FFB11B',
            
            blocks: [
                {
                    opcode: 'getValueByKey',
                    text: formatMessage({
                        id: 'sn.getValueByKey',
                        default: 'get [KEY] in [JSON]',
                        description: 'get value in json object by key'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        KEY: {
                            type: ArgumentType.STRING,
                            defaultValue: 'key'
                        },
                        JSON: {
                            type: ArgumentType.STRING,
                            defaultValue: '{"key": "value"}'
                        }
                    }
                },
                // {
                //     opcode: 'arrayStartAtZero',
                //     text: formatMessage({
                //         id: 'sn.luamode',
                //         defualt: 'array starts at 0 [switch]',
                //         description: 'Change if arrays start at 0 (i-1) or 1 (i)'
                //     }),
                //     blockType: BlockType.COMMAND,
                //     arguments: {
                //         switch: {
                //           type: ArgumentType.BOOLEAN,
                //           defaultValue: true
                //         }
                //     }
                // },
                // {
                //     opcode: 'startPoint',
                //     text: formatMessage({
                //       id: 'sn.luamodeval',
                //       defualt: 'do arrays starting at 0?',
                //       description: 'returns whether arrays start at 0'
                //     }),
                //     blockType: BlockType.REPORTER,
                //     disableMonitor: true,
                // },
                {
                    opcode: 'getValueByArray',
                    text: formatMessage({
                        id: 'sn.getValueByArray',
                        default: 'get value [POS] of [ARRAY]',
                        description: 'export array to list'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        POS: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1,
                        },
                        ARRAY: {
                            type: ArgumentType.STRING,
                            defaultValue: '["SheepTester","TeleKiwi","Kaylerr"]'
                        }
                    }
                },
                {
                    opcode: 'getLengthOfArray',
                    text: formatMessage({
                        id: 'sn.getLengthOfArray',
                        default: 'get length of [ARRAY]',
                        description: 'length of array'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        ARRAY: {
                            type: ArgumentType.STRING,
                            defaultValue: '["SheepTester","TeleKiwi","Kaylerr"]'
                        }
                    }
                },
                {
                    opcode: 'setValueByKey',
                    text: formatMessage({
                        id: 'sn.setValueByKey',
                        default: 'set [KEY] to [VALUE] in [JSON]',
                        description: 'set value in json object by key'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        KEY: {
                            type: ArgumentType.STRING,
                            defaultValue: 'key'
                        },
                        VALUE: {
                            type: ArgumentType.STRING,
                            defaultValue: 'sample'
                        },
                        JSON: {
                            type: ArgumentType.STRING,
                            defaultValue: '{"key": "value"}'
                        }
                    }
                },
                {
                    opcode: 'setValueByPos',
                    text: formatMessage({
                        id: 'sn.setValueByPos',
                        default: 'set [POS] in array [ARRAY] to [VALUE]',
                        description: 'set value in array by pos'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        POS: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        VALUE: {
                            type: ArgumentType.STRING,
                            defaultValue: '🐢💈'
                        },
                        ARRAY: {
                            type: ArgumentType.STRING,
                            defaultValue: '["🍎", "🍌", "🚇"]'
                        }
                    }
                }
            ]
        };
    }

    getValueByKey (args, util) {
        try {
            const decodedText = JSON.parse(Cast.toString(args.JSON).replace(/\\/g, '\\\\')) [Cast.toString(args.KEY)];
            // console.log(decodedText);
            if (typeof decodedText === 'object') return JSON.stringify(decodedText);
            return Cast.toString(decodedText) || '';
        } catch (e) {
            return `[ERROR] ${e.message}`;
        }
    }

    getValueByArray (args, util) {
        try {
            const array = JSON.parse(args.ARRAY.replace(/\\/g, '\\\\'));
            if (typeof array[args.POS] === 'object') return JSON.stringify(array[Cast.toNumber(args.POS)]);
            return Cast.toString(array[Cast.toNumber(args.POS)])  || '';
        } catch (e) {
            return `[ERROR]${e.message}`;
        }
    }
    
    getLengthOfArray (args) {
        try {
            const array = JSON.parse(args.ARRAY.replace(/\\/g, '\\\\'));
            return array.length;
        } catch (e) {
            return `[ERROR]${e.message}`;
        }
    }
    
    setValueByPos (args, util) {
        let array = [];
        let data = null;
        try {
            try {
                data = JSON.parse(args.VALUE.replace(/\\/g, '\\\\'));
            } catch (e) {
                data = args.VALUE;
            }
            if (args.ARRAY != '') array = JSON.parse(Cast.toString(args.ARRAY).replace(/\\/g, '\\\\'));
            typeof data === 'object' ? array[Cast.toNumber(args.POS)] = data : array[Cast.toNumber(args.POS)] = Cast.toString(data);
            const result = [];
            for (const elem of array) {
                if (typeof elem === 'object') result.push(JSON.stringify(elem));
                else if (typeof elem === 'string') result.push(`"${elem}"`);
                else result.push(elem);
            }
            return `[${result.join(', ')}]`;
        } catch (e) {
            return `[ERROR] ${e.message}`;
        }
    }

    setValueByKey (args, util) {
        let obj = {};
        let data = null;
        try {
            try {
                data = JSON.parse(args.VALUE.replace(/\\/g, '\\\\'));
            } catch (e) {
                let value = args.VALUE;
                if (Number.isNaN(Cast.toNumber(args.VALUE))) value = Cast.toNumber(args.VALUE);
                data = value;
            }
            
            if (args.JSON != '') obj = JSON.parse(Cast.toString(args.JSON).replace(/\\/g, '\\\\'));
            typeof data === 'object' ? obj[Cast.toString(args.KEY)] = data : obj[Cast.toString(args.KEY)] = Cast.toString(data);
            return Cast.toString(JSON.stringify(obj))  || '';
        } catch (e) {
            return `[ERROR] ${e}`;
        }
    }
}

module.exports = tree;