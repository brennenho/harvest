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
  
      console.log(await res.text());

      res = await fetch(`${API_URL}/response`);
  
      if (!res.ok) {
        throw new Error("Something went wrong");
      }
      
      const json = await res.json();
      
      setResponses([...responses, { author: "user", text: prompt }, { author: "farmerai", text: json.text }]);
  
      let new_references = json.documents.map((doc) => { return { title: doc.title, url: doc.url } })

      setReferences(new_references);

      console.log(json)
    } finally {
      setLoading(false)
    }
  }

  const renderChat = () => {
    let chats = [];

    for (let i = 0; i < responses.length; i++) {
      let icon = responses[i].author === "user" ? "src/assets/sprout-logo-svgrepo-com.svg" : "src/assets/farmer-svgrepo-com.svg";

      chats.push(
        <div className="chat" key={i}>
          <div className="chat-message" 
          // style={{
          //   backgroundImage: `url(${icon})`,
          // }}
          >{responses[i].text}</div>
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
    let referenceList = [];

    console.log('references: ' , references)

    for (let i = 0; i < references.length; i++) {
      console.log(references[i].url)
      console.log(references[i].title)

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
            backgroundImage: loading ? `url(${loadingGif})` : `url(${lens})`,
          }}
        />
        <div className="horiz-line"></div>

        <div className="spotlight-responses">
          {loading && <img src="src/assets/loading.gif" alt="logo" className="loading"/>}
          <div>{renderChat()}</div>
        </div>
      </div>

      <div className="references-wrapper">
        <div className="references">{renderReferences()}</div>
      </div>
    </div>
  );
}