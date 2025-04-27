import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(question);
    axios.post("https://gemini-api-beta-seven.vercel.app/", {
      question: question
    })
    .then(res=>{
      setResponse(res.data.response);
      setQuestion("");
    })
    .catch(err=>{
      console.log(err);
    })
  }

  const speakHandler = () => {
    const a = new SpeechSynthesisUtterance(response);
    window.speechSynthesis.speak(a);
  }

  return (
    <div className="App">
      <div className='box'>
        <div className='profilePic'>
          <img className='pic' src={require("../src/assets/aqsa.png")} alt='Profile Picture'/>
        </div>
        <p className='label'>Question</p>
        <textarea  value={question} onChange={(e)=>{setQuestion(e.target.value)}}/>
        <button onClick={submitHandler}>Send</button>
      </div> 
      <div className='box'>
        <div className='profilePic'>
            <img className='pic' src={require("../src/assets/gemini-ai.png")} alt='Profile Picture'/>
          </div>
          <p className='label'>Response</p>
          <textarea value={response}/>
          <button onClick={speakHandler}>Speak</button>
        </div> 
    </div>
  );
}

export default App;
