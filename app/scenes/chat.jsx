import { useChat } from "ai/react";
import { useEffect, useRef } from "react";
import moment from "moment";
import { Markdown } from "../components/markdown";

function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat();
  // const [stored, setStored] = useLocalStorage("main.chat.history");
  const messagesRef = useRef();

  // useEffect(() => {
  //   if (!stored) return;
  //   setMessages(stored);
  // }, []);

  useEffect(() => {
    messagesRef.current.scrollIntoView({
      behaviour: "smooth",
      block: "end",
    });

    // setStored(messages);
  }, [messages]);

  return (
    <>
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
              <Markdown>{m.content}</Markdown>
              <div className="toolbar">
                <span>{moment(m.createdAt).fromNow()}</span>
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
