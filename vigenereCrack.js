export function indexOfCoincidence(str)
{
    str = str.replace(/\s/g, '').toUpperCase();
    const len = str.length;
    if(len <= 0) {
        throw new Error(`String length must be greater than 0 (Given: ${len})`);
    }

    // occurrences of each letter in
    const frequencies = charFrequencies(str);

    // average probability that 2 chars chosen are equal
    // P(probability for each char) = (occurrences / str length) * [(occurrences - 1) / (str length - 1)]
    return Object.keys(frequencies).reduce((a, b, c, d) => {
        return a + Math.abs((frequencies[b] / len) * ((frequencies[b] - 1) / (len - 1)));
    }, 0);
}

export function charFrequencies(str)
{
    str = str.replace(/\s/g, '').toUpperCase();
    const len = str.length;
    if(len <= 0) {
        throw new Error(`String length must be greater than 0 (Given: ${len})`);
    }

    return str.split('').reduce((a, b) => {
        a[b] ? a[b]++ : a[b] = 1;
        return a;
    }, {});
    
}

export function englishFrequency(str)
{
    str = str.replace(/\s/g, '').toUpperCase();
    const len = str.length;
    if(len <= 0) {
        throw new Error(`String length must be greater than 0 (Given: ${len})`);
    }
}

export function buildCosets(str, l)
{
    const cosets = [];

    // build array of cosets of length l, such that for each coset S_i,
    // S_i = { C_i, C_i+l, C_i+2l, ... C_N }
    for(let i = 0; i < l; i++)
    {
        cosets.push(str.split('').filter((e, j) => j % l === i).join(''));
    }

    return cosets;
}