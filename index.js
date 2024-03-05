import { caesarCipher } from './caesar.js';
import { Vigenere } from "./Vigenere.js";

// length = 28
// key length = 3
//const plaintext = "TOBEORNOTTOTHATISTHEQUESTION";
//const key = "YES";
const key = "PZAKZNVQSQIIS";

(() => {
    // ic = 0.03991
    // pK = 13
    // pK = 26

    const plaintext = "IhadseenlittleofHolmeslatelyMymarriagehaddriftedusawayfromeachotherMyowncompletehappinessandthehomecentredinterestswhichriseuparoundthemanwhofirstfindshimselfmasterofhisownestablishmentweresufficienttoabsorballmyattentionwhileHolmeswholoathedeveryformofsocietywithhiswholeBohemiansoulremainedinourlodgingsinBakerStreetburiedamonghisoldbooksandalternatingfromweektoweekbetweencocaineandambitionthedrowsinessofthedrugandthefierceenergyofhisownkeennatureHewasstillaseverdeeplyattractedbythestudyofcrimeandoccupiedhisimmensefacultiesandextraordinarypowersofobservationinfollowingoutthosecluesandclearingupthosemysterieswhichhadbeenabandonedashopelessbytheofficialpoliceFromtimetotimeIheardsomevagueaccountofhisdoingsofhissummonstoOdessainthecaseoftheTrepoffmurderofhisclearingupofthesingulartragedyoftheAtkinsonbrothersatTrincomaleeandfinallyofthemissionwhichhehadaccomplishedsodelicatelyandsuccessfullyforthereigningfamilyofHollandBeyondthesesignsofhisactivityhoweverwhichImerelysharedwithallthereadersofthedailypressIknewlittleofmyformerfriendandcompanion";
    const vigenere = new Vigenere();
    const ciphertext = vigenere.encode(plaintext, key).toUpperCase();
    //const str = "JWcowQrroryGdqwetXuvujiehOiafJixiDnvwgtZoEbiEkdumpIjLjeEjrbx";
    console.log(vigenere.bruteForce(ciphertext));
})();