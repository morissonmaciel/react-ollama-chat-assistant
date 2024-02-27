import { createGlobalStyle } from "styled-components";
import { useChat } from "ai/react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useEffect, useRef } from "react";
import moment from "moment";

const ChatStyles = createGlobalStyle`
  .chat-root {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  .messages-panel {
    display: flex;
    flex-direction: column;
    flex: 1;
    font-size: 10pt;
    padding: 24px
    overflow-y: auto;
    overflow-x: hidden;
  }

  .message {
    padding: 8px;
    border-bottom: 1px solid silver;
  }

  .message * {
    margin: 4px 0;
    color: white;
  }

  .message .role {
    background-color: rgba(0,0,0,35%);
    padding: 4px 8px;
    border-radius: 0.3em;
    font-family: 'Monospace', monospace, Consolas, 'Courier New';
    font-size: 9pt;
    line-height: 1.5;
  }

  .message .role-user {
    color: gold;
  }

  .message .response {
    padding: 4px;
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow-x: auto;
    overflow-y: hidden;
    font-family: 'Monospace', monospace, Consolas, 'Courier New';
    font-size: 9pt;
    line-height: 1.5;
  }

  .message .toolbar {
    display: flex;
    flex-direction: row;
    align-items: center;

    padding: 0 4px;
    font-size: 8pt;
    font-family: sans-serif;
  }

  .message .toolbar :first-child {
    flex: 1;
    color: rgba(255,255,255,45%);
  }

  .message .toolbar a {
    display: flex;
    flex-direction: row;
    align-items: center;

    text-transform: lowercase;
    background: rgba(0,0,0,25%);
    padding: 4px 6px;
    border-radius: 4px;
    color: rgba(255,255,255,45%);
    cursor: pointer;
  }

  .prompt-form {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 12px 6px;
    background-color: black;
  }

  .prompt {
    outline: none;
    appearance: none;
    border: 0px;
    background-color: black;
    color: white;
    flex: 1;
    font-size: 10pt;
  }

  .prompt-submit {
    background-color: black;
    appearance: 0px;
    border: 0px;
    font-weight: 400;
    font-size: 10pt;
    color: rgba(255,255,255,55%);
  }
`;

function Chat() {
  const {
    messages,
    setMessages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
  } = useChat();
  const [stored, setStored] = useLocalStorage("main.chat.history");
  const messagesRef = useRef();

  useEffect(() => {
    if (!stored) return;
    setMessages(stored);
  }, []);

  useEffect(() => {
    messagesRef.current.scrollIntoView({
      behaviour: "smooth",
      block: "end",
    });

    setStored(messages);
  }, [messages]);

  return (
    <>
      <ChatStyles />
      {/* Contents */}
      <div className="chat-root">
        <div className="messages-panel" ref={messagesRef}>
          {messages.map((m) => (
            <div key={m.id} className="message">
              <div>
                <span
                  className={`role ${m.role === "user" ? "role-user" : ""}`}
                >
                  {m.role}
                </span>
              </div>
              <pre className="response">{m.content}</pre>
              <div className="toolbar">
                <span>{moment(m.createdAt).fromNow()}</span>
                <a role="button">Copy</a>
              </div>
            </div>
          ))}
        </div>

        <form className="prompt-form" onSubmit={handleSubmit}>
          <input
            className="prompt"
            type="text"
            placeholder="Say something..."
            value={input}
            onInput={handleInputChange}
            disabled={isLoading}
          />
          <input
            className="prompt-submit"
            type="submit"
            value={isLoading ? "Stop" : "Send"}
            onClick={() => isLoading && stop()}
          />
        </form>
      </div>
    </>
  );
}

export default Chat;
