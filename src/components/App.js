import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchlanguagesUtil, getWordUtil, getDetailsUtil } from '../redux/actions';

const App = props => {
    const [ selectedLang, setSelectedLang ] = useState('')
    const [ selectedWord, setSelectedWord ] = useState('')
    useEffect(() => {
        props.getLanguages();
        setSelectedLang(props.langs[0]);
    }, [props.langs[0]]);
    const handleClick = evt => {
        evt.preventDefault();
        if(evt.target.name === 'language'){
            setSelectedLang(evt.target.value);
        }else{
            props.fetchWord(selectedLang, selectedWord)
        }
    }
    const handleChange = evt => {
        evt.preventDefault();
        let word = evt.target.value;
        setSelectedWord(word)
    }
    const handleClickOnWord = evt => {
        evt.preventDefault();
        let word = evt.target.id;
        props.getWordDetails(selectedLang, word);
    }
    return(
        <div>
            <header>
                <div className="logo"></div>
                <div className="actions">
                    <select name ="language" onClick={handleClick}>
                    {props.langs && props.langs.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                    </select>
                    <input type="text" onChange={handleChange} value={selectedWord} />
                    <button onClick={handleClick}>Submit</button>
                    <p>Ingrese una palabra y seleccione un idioma para ver palabras similares.</p>
                </div>
            </header>
            { props.word.semanticallySimilarWords && 
            <div className="information">
                <p>Your word: <span>{selectedWord}</span>.</p>
                <p>Palabras sintacticamente similares (click para ver sus detalles): </p>
                <ul> {props.word.semanticallySimilarWords.map(elem => {
                    return (
                        <li key={elem.word} onClick={handleClickOnWord} id={elem.word} >{elem.word}</li>
                    )
                })}
                </ul>
            </div>
            }
            { props.word.details && 
                <div className="details">
                    <ul>
                        <li>Word: <span>{props.word.details.wordInformation.word}</span></li>
                        <li>Frequency: <span>{props.word.details.wordInformation.frequency}</span></li>
                        <li>Document frequency: <span>{props.word.details.wordInformation.documentFrequency}</span></li>
                        <li>Absolute Rank: <span>{props.word.details.wordInformation.absoluteRank}</span></li>
                        <li>Relative Rank: <span>{props.word.details.wordInformation.relativeRank}</span></li>

                    </ul>
                </div>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    langs: state.langs,
    word: state.word
});
const mapDispatchToProps = dispatch => ({
    getLanguages: () => dispatch(fetchlanguagesUtil()),
    fetchWord: (lang, word) => dispatch(getWordUtil(lang,word)),
    getWordDetails: (lang, word) => dispatch(getDetailsUtil(lang, word))
});
export default connect(mapStateToProps, mapDispatchToProps)(App);