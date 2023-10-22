import { useState, useEffect } from 'react'
import lens from "../assets/lens.png";
import lameLoadingGif from "../assets/lame-loading.gif";
import loadingGif from "../assets/loading.gif";
import sproutLogo from "../assets/sprout-logo-svgrepo-com.svg";
import farmerLogo from "../assets/farmer-svgrepo-com.svg";

import './Chat.css'

const API_URL = 'https://harvest.couriersix.xyz'

export default function Chat() {
  const [loading, setLoading] = useState(false);
  const [prompt, updatePrompt] = useState(undefined);
  const [responses, setResponses] = useState([]);
  const [references, setReferences] = useState([]);

  useEffect(() => {
    setResponses([...responses, { author: "farmerai", text: "" }]);
  }, []);

  useEffect(() => {
    if (prompt != null && prompt.trim() === "") {
      updatePrompt(undefined);
    }
  }, [prompt]);

  const sendPrompt = async (event) => {
    if (event.key !== "Enter") {
      return;
    }

    setResponses([...responses, { author: "user", text: prompt }]);

    try {
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
  
      res = await fetch(`${API_URL}/response`);
  
      if (!res.ok) {
        throw new Error("Something went wrong");
      }
      
      const json = await res.json();
      
      setResponses([...responses, { author: "user", text: prompt }, { author: "farmerai", text: json.text }]);
  
      let new_references = json.documents.map((doc) => { return { title: doc.title, url: doc.url } })

      setReferences([...references, ...new_references]);
    } finally {
      setLoading(false)
    }
  }

  const renderChat = () => {
    let chats = [];

    for (let i = 0; i < responses.length; i++) {
      let classNam = responses[i].author === "user" ? "chat-message" : "chat-message-alt";

      chats.push(
        <div className="chat" key={i}>
          <div className={classNam}
          >{responses[i].text}</div>
        </div>
      );
    }

    chats.reverse();

    return (
      <div className="chat-container">
        <div className="chat-wrapper">
          <div className="chat">{chats}</div>
        </div>
      </div>
    );
  }

  const renderReferences = () => {
    let referenceList = [];

    for (let i = 0; i < references.length; i++) {
      referenceList.push(
        <div className="reference" key={i}>
          <div className="reference-message">
            <a href={references[i].url} target="_blank">{references[i].title}</a>
          </div>
        </div>
      );
    }

    return (
      <div className="reference-container">
        <div className="reference-wrapper">
          <div className="reference">{referenceList}</div>
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
            backgroundImage: loading ? `url(${lameLoadingGif})` : `url(${lens})`,
          }}
        />
        <div className="horiz-line"></div>

        <div className="spotlight-responses">
          {loading && <img src={loadingGif} alt="logo" className="loading"/>}
          <div>{renderChat()}</div>
        </div>
      </div>

      <div className="references-wrapper">
        <div className="references">{renderReferences()}</div>
      </div>
    </div>
  );
}