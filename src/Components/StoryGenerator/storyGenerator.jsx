import React, { useEffect, useState } from 'react'
import "./storyGenerator.css"
import {v4 as uuidv4 } from "uuid";
import GptComponent from './Gpt4Component';
uuidv4();

const StoryGenerator = () => {

    //Local Storage Key
    const LOCAL_STORAGE_KEY = "word:savedWords"
    const LOCAL_STORAGE_GENERATED_WORD_KEY = "generated:generatedWord"

    //Local 
    const wordsList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) : []

    const [searchValue, setSearchValue] = useState("")
    //search state
    const [data, setData] = useState([])
    const [generatedWordList, setGeneratedWordList] = useState([]);
    //error state
    const [addWorderror,setAddWordError] = useState("")

    //SaveLocal
    const setGeneratedWordAndSave = (newWord) =>{
        setGeneratedWordList(newWord)
        localStorage.setItem(LOCAL_STORAGE_GENERATED_WORD_KEY, JSON.stringify(newWord))
    }

    //LoadSavedWords
    const loadGeneratedWords = () =>{
        const saved = localStorage.getItem(LOCAL_STORAGE_GENERATED_WORD_KEY)
        
        if(saved){
            setGeneratedWordList(JSON.parse(saved))
        }
    }
  
    //Onchange Search
    const searchOnChange = (e) =>{

      const { value } = e.target;
        if (!value.includes(' ')) {
          setSearchValue(value);
        }
      setData(wordsList ? wordsList : [])
    }
  
    //Onclick Add Generated Word
    const addGeneratedWord = () => {
        if(searchValue === ""){
            setAddWordError("Please enter a word")
        }
        else if(generatedWordList.length === 10){
            setAddWordError("Maximum 10 words")
        }
        else if(generatedWordList.some(e => e.title === searchValue)) {
            setAddWordError('The word already exists');
        }
        else if(wordsList.find(e => e.title === searchValue)) {
            setAddWordError('');
            GeneratedWordSet()
        }
        else{
            setAddWordError("no words found in your list")
        }
        setSearchValue("")
    }

    //Function of setGeneratedWordAndSave
    const GeneratedWordSet= () =>{
        setGeneratedWordAndSave(
            [...generatedWordList, {
                id: uuidv4(),
                title: searchValue
        }]);
    }


    //Remove Last Element from WordList
    const removeLastElement = id => {
        setGeneratedWordAndSave(generatedWordList.filter(word => word.id !== id))
    }
    
    //useEffect
    useEffect(()=>{
        loadGeneratedWords()
    },[])

  return (
    <div className='story-container'>
        {/* Search Bar */}
        <div className='search-word-form'>
            <input maxLength={25} onChange={searchOnChange} className='search-bar' value={searchValue}/>
            <button onClick={addGeneratedWord}>Add</button>
        </div>
        <p className='error-text'>{addWorderror}</p>
        <div className='search-dropdown'>
            {
            searchValue &&
            data.filter(item => item.title.startsWith(searchValue.toLowerCase()) && item.title !== searchValue)
            .slice(0,8)
            .map(item => 
                <div key={item.id} onClick={(e)=> setSearchValue(item.title)} >
                {item.title}
                </div>  
            )}
        </div>

        {/* Selected Words */}
        <div className='select-words'>
            {generatedWordList.map((word)=>
                <button onClick={e => removeLastElement(word.id)} className='word-select-button'>{word.title} <span>x</span></button>
            )}
        </div>
        {/* Generated Story */}
        <div className='generated-story-container'>
            <GptComponent/>
        </div>
    </div>
  )
}

export default StoryGenerator