import React, { useState } from 'react';
import axios from 'axios';
import "./gpt.css"

const GptComponent = () => {
  const [story, setStory] = useState('');
  const [gptError, setGptError] = useState('')

  const LOCAL_STORAGE_GENERATED_WORD_KEY = "generated:generatedWord"

  //Local 
  const generatedWordsList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_GENERATED_WORD_KEY)) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_GENERATED_WORD_KEY)) : []

  //generate Story
  const generateStory = async () => {
    //No word error
    if(generatedWordsList.length === 0){
      setGptError("First save some words")
      return
    }
    setGptError("")
    const preList = []
    
    for (let index = 0; index < generatedWordsList.length; index++) {
      preList.push(generatedWordsList[index].title)
      preList.toString()
    }

    try {
      const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_KEY'
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo-instruct',
            prompt: `write a 50-100 word story using these words: ${preList}`,
            max_tokens: 250,
            n: 1,
            stop: null,
            temperature: 1.0,
        }),
    });

    const data = await response.json();
    if (data.choices && data.choices.length > 0) {
        setStory(data.choices[0].text) ;
    } else {
        // Return a default message or an error message to the user
        console.log('An error occurred while generating the story. Please try again.');
    }

    } catch (error) {
      setGptError("Can't generate story")
      console.error('Error generating story:', error);
    }
  };

  //highlight Text
  const highlightText = () => {
    const preList = []
    for (let index = 0; index < generatedWordsList.length; index++) {
      preList.push(generatedWordsList[index].title)
      preList.toString()
    }
    let newText = story;

    preList.forEach((word) => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      newText = newText.replace(regex, `<strong style="color: #33b650d0;">${word}</strong>`);
    });

    return { __html: newText };
  };

  return (
    <div>
      <div className='generated-story-text-box'>
      {story ? (<><h2>Let's Go!</h2><p dangerouslySetInnerHTML={highlightText()}/> </>): 
        (<><h2>Learn with Stories</h2><p>Create stories using the words you saved to your dictionary and have fun while you try to learn the meanings of the words you have saved</p></>)
      }
      </div>
      <button className='generate-story-button' onClick={generateStory}>Generate Story</button>
      <p className='gpt-error-text'>{gptError}</p>
    </div>
  );
};

export default GptComponent;
