import { caesarCipher } from './caesar.js';
import { Vigenere } from "./Vigenere.js";

const key = "PZAKZNVQSQIIS";

(() => {
    const plaintext = "IhadseenlittleofHolmeslatelyMymarriagehaddriftedusawayfromeachotherMyowncompletehappinessandthehomecentredinterestswhichriseuparoundthemanwhofirstfindshimselfmasterofhisownestablishmentweresufficienttoabsorballmyattentionwhileHolmeswholoathedeveryformofsocietywithhiswholeBohemiansoulremainedinourlodgingsinBakerStreetburiedamonghisoldbooksandalternatingfromweektoweekbetweencocaineandambitionthedrowsinessofthedrugandthefierceenergyofhisownkeennatureHewasstillaseverdeeplyattractedbythestudyofcrimeandoccupiedhisimmensefacultiesandextraordinarypowersofobservationinfollowingoutthosecluesandclearingupthosemysterieswhichhadbeenabandonedashopelessbytheofficialpoliceFromtimetotimeIheardsomevagueaccountofhisdoingsofhissummonstoOdessainthecaseoftheTrepoffmurderofhisclearingupofthesingulartragedyoftheAtkinsonbrothersatTrincomaleeandfinallyofthemissionwhichhehadaccomplishedsodelicatelyandsuccessfullyforthereigningfamilyofHollandBeyondthesesignsofhisactivityhoweverwhichImerelysharedwithallthereadersofthedailypressIknewlittleofmyformerfriendandcompanion";
    const vigenere = new Vigenere();
    const ciphertext = vigenere.encode(plaintext, key);

    //const str = "JWcowQrroryGdqwetXuvujiehOiafJixiDnvwgtZoEbiEkdumpIjLjeEjrbx";
    console.log(vigenere.bruteForce(ciphertext));
})();