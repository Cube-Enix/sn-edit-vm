const formatMessage = require('format-message');
const Swal = require('sweetalert2');
const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const Cast = require('../../util/cast');
const icon = "data:image/png;base64,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"
// Define the audio object so we can edit it from several different functions
var audio

/**
 * @constructor
 */

 class snap {
    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */

    getInfo () {
        return {
            id: 'snap',
            name: 'Snap',
            blockIconURI: icon,
            menuIconURI: icon,
            docsURI: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            color1: '#77b8e8',
            color2: '#009bde',
            blocks: [
                {
                    opcode: 'playsound',
                    text: formatMessage({
                        id: 'sn.blocks.playsound',
                        default: 'Play Sound from URL [url]',
                        description: 'Play a sound from a url'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        url: {
                            type: ArgumentType.STRING,
                            defaultValue: 'https://vgmsite.com/soundtracks/pokemon-black-and-white/ircnaryc/501%20What.mp3'
                        }
                    }
                },
                {
                    opcode: 'stopsound',
                    text: formatMessage({
                        id: 'sn.blocks.stopsound',
                        default: 'Stop Sound',
                        description: 'Stop the music,'
                    }),
                    blockType: BlockType.COMMAND
                },
                {
                    opcode: 'audioTime',
                    text: formatMessage({
                        id: 'sn.blocks.currentAudioTime',
                        defualt: 'Current Timestamp',
                        description: "Returm the current timestamp"
                    }),
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'lengthAudio',
                    text: formatMessage({
                        id: 'sn.blocks.currentAudioTime',
                        defualt: 'Audio Duration',
                        description: "Returm the current timestamp"
                    }),
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'loopAudio',
                    text: formatMessage({
                        id: 'sn.blocks.loop',
                        default: 'Set looped for sound to [checked]'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        checked: {
                            type: ArgumentType.BOOLEAN,
                            defaultValue: true
                        }
                    }
                }
            ]
        }
    }

    playsound (args, utils) {
        // --> Now before I begin I've never done this before so expect bugs 
        // --> make sure they're playing an mp3
        var ext = args.url.charAt(args.url.length - 3) + args.url.charAt(args.url.length - 2) +  args.url.charAt(args.url.length - 1) + args.url.charAt(args.url.length)
        if(ext = '.mp3') {
            if(audio !== undefined) {
                audio.pause()
            }
            audio = new Audio(args.url)
            audio.type = 'audio/mp3';
            try {
                audio.play()
                console.log('playing');
            } catch {
                Swal.fire({
                    title: "Audio Error",
                    text: "We're unable to play your audio",
                    icon: 'error',
                    confirmButtonText: 'Ok.'
                  })
            }
        } else {
            Swal.fire({
                title: "Audio Error",
                text: "Invalid Audio Type. Only MP3 is supported",
                icon: 'error',
                confirmButtonText: 'Ok.'
              })
        }
    }
    stopsound (args, utils) {
        audio.pause()
    }
    audioTime (args, utils) {
        return audio.currentTime
    }
    lengthAudio (args, utils) {
        return audio.duration
    }
    loopAudio (args, utils) {
        audio.loop = args.checked
    }
}

module.exports = snap;
