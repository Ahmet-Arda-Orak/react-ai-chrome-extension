/*global chrome*/
import "./popup.css"

import { useEffect, useState } from "react";
import Word from "./word";
import {v4 as uuidv4 } from "uuid";
import axios from 'axios';
uuidv4();

const Popup = (props) =>{

    const [words,setWords] = useState([]);
    const [wordTitle,setWordTitle] = useState("");
    const [newWordError,setNewWordError] = useState("")

    const API_KEY = '881c863eaemsh21534f10c861d82p18c82bjsna7906c6048f3';
    const API_ENDPOINT = `https://wordsapiv1.p.rapidapi.com/words/${wordTitle}`;

    const LOCAL_STORAGE_KEY = "word:savedWords"
    //GET LOCAL DATA
    const wordsList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) : []

    //SaveLocal
    const setWordAndSave = (newWord) =>{
        console.log(newWord)
        setWords(newWord.reverse())
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newWord))
    }

    //LoadSavedWords
    const loadSavedWords = () =>{
        const saved = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if(saved){
            setWords(saved)
        }
    }
    
    useEffect(()=>{
        chrome.storage.local.get({ savedWords: [] }, function(data) {
             const chromeSavedWords = data.savedWords
                setWordAndSave(chromeSavedWords)
             });

        loadSavedWords()
    },[])


    // OnChange Function
    function changeWord(e) {
        const { value } = e.target;
        if (!value.includes(' ')) {
          setWordTitle(value)
        }
    }

   //SetWord

   const wordSet = (word,meaning) =>{
    setWordAndSave([
        ...words,{
            id: uuidv4(),
            title: word.trim().toLowerCase(),
            definition: meaning
        }   
    ])
}

    // Onsubmit Function
    const addWord = async e => {
        e.preventDefault()
        try {
            const response = await axios.get(API_ENDPOINT, {
              headers: {
                'X-RapidAPI-Key': API_KEY,
              },
            });
      
            const data = response.data;
      
            if (data && data.results && data.results.length > 0) {
              const wordDefinition = data.results[0].definition || 'No definition found.';
              const foundItem = wordsList.find(item => item.title === wordTitle)
              if(!foundItem){
              setNewWordError("")
              wordSet(wordTitle, wordDefinition)

                chrome.storage.local.get({ savedWords: [] }, function(data) {
                    const savedWords = data.savedWords;
                    //is item existing
                    savedWords.push({id: (Math.random() * 100000),title:wordTitle,definition:wordDefinition});
                    chrome.storage.local.set({ savedWords }, function() {
                        if (chrome.runtime.lastError) {
                        console.error(chrome.runtime.lastError.message);
                        } else {
                        console.log("Word saved:", wordTitle);
                        console.log(savedWords);
                        }
                    });
                });
              }else{
                setNewWordError("Word already exists")
              }
      
            } else {
              if(wordTitle === ""){
                setNewWordError("Please enter a word")
              }
              else{
              setNewWordError("This is not a proper word")
              }
            }
          } catch (error) {
            if(wordTitle === ""){
                setNewWordError("Please enter a word")
              }
              else{
              setNewWordError("This is not a proper word")
              }
          }

        setWordTitle("")
    }
    

    // Delete Word
    const deleteWord = (id) =>{
           chrome.storage.local.get({ savedWords: [] }, function(result) {
            const yourData = result.savedWords || []; // Retrieve the stored data or use an empty array if it's not set
          
            const updatedData = yourData.filter(item => item.id !== id);
          
            // Save the updated data back to Chrome storage
            chrome.storage.local.set({ 'savedWords': updatedData }, function() {
              console.log('Data updated. Item removed.');
            });
        });
        setWordAndSave(words.filter(word => word.id !== id))
    }

    return(
        <div className="popup-main">
            {/* Form */}
            <form className="add-word-form" onSubmit={addWord}>
                <input maxLength={25} value={wordTitle} onChange={changeWord} type="text" placeholder="Add new word"/>
                <button>Create</button>
            </form>
            <p className='error-text-popup'>{newWordError}</p>
            {/* Bar */}
            <header>
                <div>
                    <p className="updates">Updates</p>
                </div>
                <div>
                    <p>Word Count <span>{words.length}</span> </p>
                </div>
            </header>
            {/* Word List */}
            <div className={wordsList.length === 0 ? "word-list-empty" : "word-list"}>
                {words.map(word => 
                    <Word id={word.id} word={word} deleteWord={deleteWord}/>
                )} 
            </div>
        </div>
    )
}

export default Popup;