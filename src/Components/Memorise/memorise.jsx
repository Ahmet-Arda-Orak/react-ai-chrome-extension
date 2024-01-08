import React, { useState } from 'react'
import "./memorise.css"
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

const Memorise = () => {
  const [randomWordTitle, setRandomWordTitle] = useState("")
  const [randomWordDef, setRandomWordDef] = useState("")
  const [randomWordError,setRandomWordError] = useState("")

  //TTS
  const synth = window.speechSynthesis;

  const ttsWord = () =>{
    const utterance = new SpeechSynthesisUtterance(randomWordTitle);
    synth.speak(utterance);
  }

  //Local Storage Key
  const LOCAL_STORAGE_KEY = "word:savedWords"

  //GET LOCAL DATA
  const wordsList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) : [] 

  //Generate Word
  const generateRandomWord = () =>{
    if(!wordsList || wordsList.length === 0){
      setRandomWordError("First save some words to your list")
    }
    else{
      setRandomWordError("")
      const randomIndex = Math.round(Math.random()*(wordsList.length-1))
      setRandomWordTitle(wordsList[randomIndex].title)
      setRandomWordDef(wordsList[randomIndex].definition)
    }
  }

  return (
    <div className='memorise-container'>
        <br/><br/><br/>
        <p className='memory-section-title'>Let's Go! </p>
      <div className='memory-card'>
           <h1>{randomWordTitle ? <>{randomWordTitle} <span className='random-speak' onClick={ttsWord}><VolumeUpIcon/></span></> : "Memorise Words"} </h1>
           <p>{randomWordDef ? randomWordDef : "try to guess the definitions of the words you previously saved by this random word generator game"}</p>
      </div>
      <p className='error-text-memorise'>{randomWordError}</p>
      <button className='memory-card-button' onClick={generateRandomWord}>
        New Word
      </button>

    </div>
  )
}

export default Memorise