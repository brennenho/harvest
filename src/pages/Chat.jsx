import { useState, useEffect } from 'react'
import lens from "../assets/lens.png";
import loadingGif from "../assets/loading.gif";
import './Chat.css'

export default function Chat() {
  const [prompt, updatePrompt] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState(undefined);

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
      /*const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      };
  
      const res = await fetch("/api/ask", requestOptions);
  
      if (!res.ok) {
        throw new Error("Something went wrong");
      }
  
      const { message } = await res.json();
      setAnswer(message);*/
      setAnswer("TESTING")
    } catch (err) {
      console.error(err, "err");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="chat">
      <div className="chat-container">
        <div className="spotlight__wrapper">
          <input
            type="text"
            className="spotlight__input"
            placeholder="Ask me anything..."
            onChange={(e) => updatePrompt(e.target.value)}
            onKeyUp={(e) => sendPrompt(e)}
            style={{
              backgroundImage: loading ? `url(${loadingGif})` : `url(${lens})`,
            }}
          />
          <div className="horiz_line"></div>
          <div className="spotlight__answer">{answer && <p>{answer}</p>}</div>
        </div>
      </div>
    </div>
  );
}