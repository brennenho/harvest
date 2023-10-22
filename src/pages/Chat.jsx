import { useState, useEffect } from 'react'
import lens from "../assets/lens.png";
import loadingGif from "../assets/lame-loading.gif";
import './Chat.css'

const API_URL = 'http://146.190.129.193:5000'

export default function Chat() {
  const [loading, setLoading] = useState(false);
  const [prompt, updatePrompt] = useState(undefined);
  const [responses, setResponses] = useState([]);
  const [references, setReferences] = useState([]);

  useEffect(() => {
    if (prompt != null && prompt.trim() === "") {
      setAnswer(undefined);
    }
  }, [prompt]);

  const sendPrompt = async (event) => {
    if (event.key !== "Enter") {
      return;
    }

    setLoading(true);
    event.currentTarget.value = "";
    let requestOptions = {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        "text": prompt
      }),
    }
    
    let res = await fetch(`${API_URL}/add_prompt`, requestOptions);

    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    console.log(await res.text());

    res = await fetch(`${API_URL}/response`);

    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    const json = await res.json();

    console.log(json);

    setResponses([...responses, json.text]);
    setReferences([...references, json.documents]);
    setLoading(false)
  }

  const renderChat = () => {
    let chats = [];

    for (let i = 0; i < responses.length; i++) {
      chats.push(
        <div className="chat" key={i}>
          <div className="chat-message">{responses[i]}</div>
        </div>
      );
    }

    return (
      <div className="chat-container">
        <div className="chat-wrapper">
          <div className="chat">{chats}</div>
        </div>
      </div>
    );
  }

  const renderReferences = () => {
    let references = [];

    for (let i = 0; i < references.length; i++) {
      references.push(
        <div className="reference" key={i}>
          <div className="reference-message">{references[i]}</div>
        </div>
      );
    }

    return (
      <div className="reference-container">
        <div className="reference-wrapper">
          <div className="reference">{references}</div>
        </div>
      </div>
    )
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
          <div>{renderChat()}</div>
        }</div>
      </div>

      <div className="right-wrapper">
        <div className="references-wrapper">
          <div className="references">{references && <div>{renderReferences()}</div>}</div>
        </div>
        <button className="right-button">Map Me</button>
      </div>
    </div>
  );
}