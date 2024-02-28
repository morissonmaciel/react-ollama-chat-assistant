"use client";

import { useChat } from "ai/react";
import { useEffect, useRef } from "react";
import { Markdown } from "../components/markdown";
import { useTranslation } from "../../i18n/client";
import { useMoment } from "../../hooks/useMoment";

function Chat({ lang }) {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat();
  const messagesRef = useRef();
  const { t } = useTranslation(lang, "translation");
  const [moment] = useMoment(lang);

  const parseIntervalFromNow = (createdAt) => {
    moment.locale(lang);
    return moment(createdAt).fromNow();
  };

  useEffect(() => {
    messagesRef.current.scrollIntoView({
      behaviour: "smooth",
      block: "end",
    });
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
                  {t(m.role)}
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
            placeholder={t("Say something")}
            value={input}
            onInput={handleInputChange}
            disabled={isLoading}
          />
          <input
            className="prompt-submit"
            type={t("submit")}
            value={isLoading ? t("Stop") : t("Send")}
            onClick={() => isLoading && stop()}
          />
        </form>
      </div>
    </>
  );
}

export default Chat;
