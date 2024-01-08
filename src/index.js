/*global chrome*/
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./Main";
import StoryGenerator from "./Components/StoryGenerator/storyGenerator";
import Popup from "./Components/Popup/popup";
import Memorise from "./Components/Memorise/memorise";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Popup />} />
          <Route path="story" element={<StoryGenerator/>} />
          <Route path="memorise" element={<Memorise/>} />
        </Route>
      </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);


// chrome.storage.local.get({ savedWords: [] }, function(data) {
//   root.render(
//     <App {...data} />
//   )
// });