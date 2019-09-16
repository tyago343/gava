import axios from "axios";
import { FETCHLANGUAGES, GETERROR, GETWORD, GETDETAILS } from './types.js';
const APIKEY = 'apiKey=8c79736f393ab6eff4a864fcfa23344c'

export const fetchlanguages = langs => ({
    type: FETCHLANGUAGES,
    langs
});
export const getError = err => ({
    type: GETERROR,
    err 
})
export const getWord = word => ({
    type: GETWORD,
    word
});
export const getDetails = details => ({
    type: GETDETAILS,
    details
})

export const fetchlanguagesUtil = () => dispatch => {
    axios.get(`https://api.gavagai.se/v3/languages?${APIKEY}`)
    .then(({data}) => dispatch(fetchlanguages(data)))
    .catch(err=> dispatch(getError(err)))
}
export const getWordUtil = (lang, word) => dispatch => {
    axios.get(`https://api.gavagai.se/v3/lexicon/${lang}/${word}?additionalFields=SEMANTICALLY_SIMILAR_WORDS&${APIKEY}`)
    .then(({data})=> dispatch(getWord(data)))
    .catch(err => dispatch(getError(err)))
}
export const getDetailsUtil = (lang, word) => dispatch => {
    axios.get(`https://api.gavagai.se/v3/lexicon/${lang}/${word}?additionalFields=SEMANTICALLY_SIMILAR_WORDS&${APIKEY}`)
    .then(({data}) => dispatch(getDetails(data)))
    .catch(err => dispatch(getError(err)))
} 