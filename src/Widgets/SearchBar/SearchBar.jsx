import React, { useState } from 'react'
import "./searchBar.css"

const SearchBar = () => {

  const [searchValue, setSearchValue] = useState("")
  const [data, setData] = useState([])

  //Local Storage Key
  const LOCAL_STORAGE_KEY = "word:savedWords"

  //Onchange Search
  const searchOnChange = (e) =>{
    setSearchValue(e.target.value)
    //Local 
    const wordsList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    setData(wordsList)
    console.log(data)
  }


  const generatedWordList = []

  //Onclick Add Generated Word
  const addGeneratedWord = () => {
    generatedWordList.push(searchValue)
    console.log(generatedWordList)
  }

  return (
    <>
    <div className='search-word-form'>
      <input onChange={searchOnChange} className='search-bar' value={searchValue}/>
      <button onClick={addGeneratedWord}>Add </button>
    </div>
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
    </>
  )
}

export default SearchBar