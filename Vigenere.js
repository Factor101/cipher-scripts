import { ALPHABET_LENGTH, MAX_KEY_LENGTH, RANDOM_INDEX_OF_COINCIDENCE, UPPERCASE_INDEX } from './constants.js';
import { indexOfCoincidence, buildCosets } from './vigenereCrack.js';

export const Vigenere = function()
{

    this.encodingInternal = (str, key, isModeEncode) =>
    {
        str = str.toUpperCase();
        const keystream = createKeyStream(key);

        return str.split('').map(e => {
            if(/[^A-Z]/.test(e))
            {
                return e;
            }

            // noinspection JSCheckFunctionSignatures
            return isModeEncode
                   ? String.fromCharCode(((e.charCodeAt() + keystream.next().value.charCodeAt()) % ALPHABET_LENGTH) + UPPERCASE_INDEX)
                   : String.fromCharCode(((e.charCodeAt() - keystream.next().value.charCodeAt() + ALPHABET_LENGTH) % ALPHABET_LENGTH) + UPPERCASE_INDEX);
        }).join('');
    }

    /**
     *
     * @param {string} str - Plaintext
     * @param {string} key - Key string
     * @returns {string} - Encoded string
     */
    this.encode = (str, key) =>
    {
        return this.encodingInternal(str, key, true);
    }

    /**
     *
     * @param str - Plaintext
     * @param key - Key string
     * @returns {string} - Decoded string
     */
    this.decode = (str, key) =>
    {
        return this.encodingInternal(str, key, false);
    }

    this.bruteForce = (str) =>
    {
        /** @typedef KeySample {keyLength: number, ioc: number} */
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

            // this check is sorta nonsense rn lol
            if(a.keyLength % b.keyLength === 0 || Math.abs(a.ioc - b.ioc) < ARBITRARY_THRESHOLD / 2) {
                bestKeyLengths.splice(i, 1);
                i--;
            }
        }

        return bestKeyLengths;
    }
}

/**
 *
 * @param key
 * @returns {Generator<*, void, *>}
 */
const createKeyStream = (key) =>
{
    key = key.toUpperCase();
    return (function* () {
        const len = key.length - 1;
        let i = 0;
        while(true)
        {
            if(i > len)
            {
                i = 0;
            }

            yield key.charAt(i++);
        }
    })();
}
