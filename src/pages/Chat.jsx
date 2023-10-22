import { useState, useEffect } from 'react'
import lens from "../assets/lens.png";
import loadingGif from "../assets/lame-loading.gif";
import './Chat.css'

export default function Chat() {
  const [loading, setLoading] = useState(false);
  const [prompt, updatePrompt] = useState(undefined);
  const [responses, setResponses] = useState(undefined);
  const [references, setReferences] = useState(undefined);

  // useEffect(() => {
  //   fetch("/todos").then((response) => {
  //     response.json().then((data) => {
  //       setResponses(data.resposne);
  //     });
  //   });
  // }, [])

  useEffect(() => {
    if (prompt != null && prompt.trim() === "") {
      setAnswer(undefined);
    }
  }, [prompt]);

  const sendPrompt = async (event) => {
    if (event.key !== "Enter") {
      return;
    }
    try {
      setLoading(true);
      event.currentTarget.value = "";
      const requestOptions = {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          "text": prompt
        }),
      }
      
      setLoading(true);
      const res = await fetch("/api/ask", requestOptions);
  
      if (!res.ok) {
        throw new Error("Something went wrong");
      }
      } catch (err) {
      console.error(err, "err");
    }
  }

  return (
    <div className="chat-container">
      <div className="spotlight-wrapper">
        <input
          type="text"
          className="spotlight-input"
          placeholder="Ask me anything..."
          onChange={(e) => updatePrompt(e.target.value)}
          onKeyUp={(e) => sendPrompt(e)}
          style={{
            backgroundImage: loading ? `url(${loadingGif})` : `url(${lens})`,
          }}
        />
        <div className="horiz-line"></div>

        <div className="spotlight-responses">{
          loading ? <img src="src/assets/loading.gif" alt="logo" className="loading"/> :
          <p>{responses}</p>
        }</div>
      </div>

      <div className="references-wrapper">
        <div className="references">{references && <p>{references}</p>}</div>
      </div>
    </div>
  );
}