// Create context menu item
chrome.contextMenus.create({
  id: "saveWord",
  title: "Save Word",
  contexts: ["selection"]
});

// WordsAPI key
const apiKey = 'YOUR_API_KEY';

async function getDefinition(theword) {
  const word = theword.toLowerCase();

  if (word === '') {
    console.log("no words selected")
    return;
  }
  

  const url = `https://wordsapiv1.p.rapidapi.com/words/${word}/definitions`;

  try {
    const response = await fetch(url, {
      headers: {
        'X-RapidAPI-Key': apiKey
      }
    });

    if (!response.ok) {
      console.log('Word not found');
      sendNotification("./icon-red.png", "Word not found")
      return;
    }
    const thedata = await response.json();
    chrome.storage.local.get({ savedWords: [] }, function(data) {
      const savedWords = data.savedWords;
      //is item existing
      const foundItem = savedWords.find(item => item.title === word);
      if(!foundItem){
        savedWords.push({id: (Math.random() * 100000),title:word,definition:thedata.definitions[0].definition});
        chrome.storage.local.set({ savedWords }, function() {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
          } else {
            console.log("Word saved:", word);
            sendNotification("./icon.png", `word saved: ${word}`)
          }
        });
      }
      else{
        console.log("word exists")
        sendNotification("./icon-red.png", "word already exists")
        return
      }
    });


  } catch (error) {
    console.error('Error fetching definition:', error);
  }
}


const sendNotification = (errorIcon, errorMessage) =>{
  chrome.notifications.create(
    {
      title: "Dict.ai",
      message: errorMessage,
      iconUrl: errorIcon,
      type: "basic"
    }
  )
}

// Handle context menu item click
chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "saveWord" && info.selectionText) {

    // Save selected word to local storage
    getDefinition(info.selectionText)
  }
});


// chrome.storage.local.clear(function() {
//   console.log('Chrome storage cleared.');
// });
