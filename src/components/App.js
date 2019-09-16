import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchlanguagesUtil, getWordUtil } from '../redux/actions';

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
            <section>
                    <table>
                        <thead>
                        <tr>
                            <th>Your word</th>
                            <th>{selectedWord}</th>
                        </tr>
                        </thead>
                        <tbody>
            { props.word.semanticallySimilarWords.map(elem => {
                return (
                    <tr key={elem.word}>
                        <td cellspacing="2">{elem.word}</td>
                    </tr>
                )
            })}
            </tbody>
                 </table>
                </section>
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
    fetchWord: (lang, word) => dispatch(getWordUtil(lang,word))
});
export default connect(mapStateToProps, mapDispatchToProps)(App);