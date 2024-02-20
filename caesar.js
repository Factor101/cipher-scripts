import { LOWERCASE_INDEX, UPPERCASE_INDEX } from "./constants.js";

/**
 *
 * @param {string} str
 * @param key {string|number}
 * @returns {string}
 */
export function caesarCipher(str, key)
{
    if(typeof key === "string") {
        key = key.toUpperCase().charCodeAt() - LOWERCASE_INDEX - 1;
    }

    return str.split('').map(e => {
        if(/[^a-z]/i.test(e)) {
            return e;
        }

        const charCode = e.charCodeAt();
        const baseIndex = e === e.toUpperCase() ? LOWERCASE_INDEX : UPPERCASE_INDEX;

        return String.fromCharCode((charCode + key - baseIndex) % 26 + baseIndex);
    }).join('');
}