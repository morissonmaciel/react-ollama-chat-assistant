"use client";

import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import { Markdown } from "../components/markdown";
import { useTranslation } from "../../i18n/client";
import { useMoment } from "../../hooks/useMoment";
import { AiOutlineClockCircle as ClockCircleIcon } from "react-icons/ai";
import { IoStopCircleOutline as StopCircleIcon } from "react-icons/io5";
import { HiOutlinePaperAirplane as StartPaperIcon } from "react-icons/hi2";
import { RiSparkling2Fill as SparklesIcon } from "react-icons/ri";
import Modal from "./modal";

function Chat({ lang }) {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat();
  const messagesRef = useRef();
  const promptRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation(lang, "translation");
  const [moment] = useMoment(lang);

  const parseIntervalFromNow = (createdAt) => {
    moment.locale(lang);
    return moment(createdAt).fromNow();
  };

  const handleTextAreaInputChange = (event) => {
    event.target.parentNode.dataset.replicatedValue = event.target.value
    handleInputChange(event);
  }

  const handleTextAreaKeyDown = (event) => {
    if (event.key === 'Enter' && event.shiftKey) {
      handleFormSubmit(event);
    }
  };

  const handleFormSubmit = (event) => {
    handleSubmit(event);
    promptRef.current.value = "";
    promptRef.current.parentNode.dataset.replicatedValue = promptRef.current.value;
  }

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
              {m.role !== "user" && (
                <>
                  <a
                    className="aligned-mid color-fg-text-50 font-footnote hyperlink-onhover"
                    onClick={() => setIsModalOpen(true)}
                  >
                    {t("Results may contain errors or misinformation")}
                  </a>
                  <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                  >
                    <Markdown>{t("ai disclaimer notes")}</Markdown>
                  </Modal>
                </>
              )}
              <div className="toolbar">
                <span className="aligned-mid child-spacing-min color-fg-text-50">
                  <ClockCircleIcon />
                  {moment(m.createdAt).fromNow()}
                </span>
              </div>
            </div>
          ))}
        </div>

        <form className="prompt-form" onSubmit={handleFormSubmit}>
          <div className="prompt-wrap">
            <textarea 
              ref={promptRef}
              className="prompt"
              placeholder={t("Say something")}
              value={input}
              onInput={handleTextAreaInputChange}
              onKeyDown={handleTextAreaKeyDown}
              disabled={isLoading}
            />
          </div>
          <a 
            className="prompt-submit" 
            type="submit" 
            behaviour="button" 
            onClick={(e) => isLoading ? stop(e) : handleFormSubmit(e)}>
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
