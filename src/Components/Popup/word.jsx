import "./word.css"
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

const Word = ({word, deleteWord}) => {

  const synth = window.speechSynthesis;

  const ttsWord = () =>{
    const utterance = new SpeechSynthesisUtterance(word.title);
    synth.speak(utterance);
  }

  return (
    <div className="new-word">
      <div className="word-section">
        <div> 
              <p>{word.title}</p>
        </div>
        <div>
        <button onClick={ttsWord}>
              <p style={{ color: "#e9e9e980", fontSize:19 }}><VolumeUpIcon style={{fontSize:17}} /></p>
        </button>
        <button onClick={()=> deleteWord(word.id)}>
              <p style={{ color: "rgb(189, 55, 31)", fontSize:19 }}> <DeleteOutlineRoundedIcon style={{fontSize:17}}/> </p>
        </button>
        </div>
      </div>
      <div className="definition">
      <p>{word.definition}</p>
      </div>
    </div>
  )
}

export default Word;