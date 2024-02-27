import React, { useEffect, useRef, useState } from "react";
import {
  ChatContainer,
  ChatForm,
  MessagesContainer,
  PromptWrapper,
  Prompt,
} from "./ChatScene.styled";
import LoadingButton from "../components/LoadingButton";
import { useChat } from "ai/react";

export const ChatScene = () => {
  const {
    input,
    setInput,
    messages,
    setMessages,
    handleSubmit,
    stop,
    isLoading,
  } = useChat();

  const formRef = useRef(null);

  const onSubmitEventHandler = (e) => {
    e.preventDefault();

    if (isLoading) {
      stop();
    } else {
      handleSubmit(e);
    }
  };

  const onInputEventHandler = (e) => {
    e.target.parentNode.dataset.replicatedValue = e.target.value;
    setInput(e.target.value);
  };

  const onKeyPressEventHandler = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formRef.current.submit();
    }
  };

  return (
    <ChatContainer>
      <MessagesContainer>
        {messages.map((message) => (
          <span key={message.id}>{message.content}</span>
        ))}
      </MessagesContainer>
      <ChatForm ref={formRef} onSubmit={onSubmitEventHandler}>
        <PromptWrapper>
          <Prompt
            rows={1}
            placeholder="Ask something..."
            onInput={onInputEventHandler}
            onKeyDown={onKeyPressEventHandler}
          />
        </PromptWrapper>

        <LoadingButton loading={isLoading} value={input} />
      </ChatForm>
    </ChatContainer>
  );
};
