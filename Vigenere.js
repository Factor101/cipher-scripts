import { MAX_KEY_LENGTH, RANDOM_INDEX_OF_COINCIDENCE } from './constants.js';
import { indexOfCoincidence, buildCosets } from './vigenereCrack.js';

export const Vigenere = function()
{
    /**
     *
     * @param {string} str
     * @param {string} key
     * @returns {string}
     */
    this.encode = (str, key) =>
    {
        key = key.toUpperCase();
        const keystream = (function* () {
            const len = key.length - 1;
            let i = 0;
            while(true) {
                if(i > len) {
                    i = 0;
                }

                yield key.charAt(i++);
            }
        })();

        return str.split('').map(e => {
            if(/[^a-z]/i.test(e)) {
                return e;
            }

            const baseIndex = e === e.toUpperCase() ? 65 : 97;
            return String.fromCharCode(((e.toUpperCase().charCodeAt() + keystream.next().value.charCodeAt()) % 26) + baseIndex);
        }).join('');
    }

    this.decode = (str, key) =>
    {
        key = key.toUpperCase();
        const keystream = (function* () {
            const len = key.length - 1;
            let i = 0;
            while(true) {
                if(i > len) {
                    i = 0;
                }

                yield key.charAt(i++);
            }
        })();

        return str.split('').map(e => {
            if(/[^a-z]/i.test(e)) {
                return e;
            }

            const baseIndex = e === e.toUpperCase() ? 65 : 97;
            return String.fromCharCode(((e.toUpperCase().charCodeAt() - keystream.next().value.charCodeAt() + 26) % 26) + baseIndex);
        }).join('');
    }

    this.bruteForce = (str) =>
    {
        /** @typedef {{keyLength: number, ioc: number}} KeySample */
        /** @type {KeySample[]} */
        const keyLengths = [];

        // max key length must not exceed half the length of the string + 1
        const maxKeyLength = Math.min(MAX_KEY_LENGTH, Math.ceil(str.length / 2)) + 1;

        for(let l = 2; l < maxKeyLength; l++)
        {
            const cosets = buildCosets(str, l);
            const avgIoc = cosets.reduce((a, b) => a + indexOfCoincidence(b), 0) / l;

            // discard trash results
            if(avgIoc <= RANDOM_INDEX_OF_COINCIDENCE) {
                continue;
            }

            keyLengths.push(
                {
                    keyLength: l,
                    ioc: avgIoc
                }
            );
        }

        const sortedKeyLengths = keyLengths.sort((a, b) => b.ioc - a.ioc);
        /** @type {KeySample[]} */
        const bestKeyLengths = [];

        const ARBITRARY_THRESHOLD = 0.01;
        for(let i = 0; i < sortedKeyLengths.length - 1; i++)
        {
            bestKeyLengths.push(sortedKeyLengths[i]);
            // if difference between current and next ioc is greater than threshold, break
            if(sortedKeyLengths[i].ioc - sortedKeyLengths[i + 1].ioc > ARBITRARY_THRESHOLD) {
                break;
            }
        }

        for(let i = 0; i < bestKeyLengths.length - 1; i++)
        {
            const a = bestKeyLengths[i];
            const b = bestKeyLengths[i + 1];

            // dumbass check need 2 fix
            if(a.keyLength % b.keyLength === 0 || Math.abs(a.ioc - b.ioc) < ARBITRARY_THRESHOLD / 2) {
                bestKeyLengths.splice(i, 1);
                i--;
            }
        }

        return bestKeyLengths;
    }
}