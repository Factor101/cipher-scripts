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
            while(true)
            {
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
            return String.fromCharCode( ((e.toUpperCase().charCodeAt() + keystream.next().value.charCodeAt()) % 26) + baseIndex );
        }).join('');
    }

    this.bruteForce = (str) =>
    {
        const values = {};
        let max = 0;
        for(let i = str.length; i > 1; i--)
        {
            const ioc = indexOfCoincidence(str.slice(0, i));
            if(ioc > max || true) {
                values[i] = ioc;
                max = ioc;
            }
        }

        return values
    }
}

function indexOfCoincidence(str)
{
    str = str.replace(/\s/g, '').toUpperCase();
    const len = str.length;

    // occurrences of each letter in
    const frequencies = str.split('').reduce((a, b) => {
        a[b] ? a[b]++ : a[b] = 1;
        return a;
    }, {});

    // average probability that 2 chars chosen are equal
    // P(probability for each char) = (occurrences / str length) * [(occurrences - 1) / (str length - 1)]
    return Object.keys(frequencies).reduce((a, b) => {
        return a + Math.abs((frequencies[b] / len) * ((frequencies[b] - 1) / (len - 1)));
    }, 0);
}