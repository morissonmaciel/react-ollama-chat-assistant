"use client";

import { useChat } from "ai/react";
import { useEffect, useRef } from "react";
import { Markdown } from "../components/markdown";
import { useTranslation } from "../../i18n/client";
import { useMoment } from "../../hooks/useMoment";
import { AiOutlineClockCircle as ClockCircleIcon } from "react-icons/ai";
import { IoStopCircleOutline as StopCircleIcon } from "react-icons/io5";
import { HiOutlinePaperAirplane as StartPaperIcon } from "react-icons/hi2";
import { RiSparkling2Fill as SparklesIcon } from "react-icons/ri";

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
      <div className="chat-root ui-scrollbars-minimal">
        <div className="messages-panel" ref={messagesRef}>
          {messages.map((m) => (
            <div key={m.id} className="message">
              <span
                className={`align-mid child-spacing-min ${
                  m.role === "user" ? "role role-user" : "role"
                }`}
              >
                <span>{t(m.role)}</span>
                {m.role !== "user" && (
                  <SparklesIcon className="anim-pulsing fg-dim-accent-blue" />
                )}
              </span>
              <Markdown>{m.content}</Markdown>
              <div className="toolbar">
                <span className="aligned-mid child-spacing-min color-fg-text-50">
                  <ClockCircleIcon />
                  {moment(m.createdAt).fromNow()}
                </span>
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
          <a className="prompt-submit" type="submit" behaviour="button">
            {isLoading ? (
              <StopCircleIcon className="icon-size-md" title={t("Stop")} />
            ) : (
              <StartPaperIcon className="icon-size-md" title={t("Send")} />
            )}
          </a>
        </form>
      </div>
    </>
  );
}

export default Chat;
