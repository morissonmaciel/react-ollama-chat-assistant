import styled from "styled-components";

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: rgb(232, 230, 227);
  overflow: hidden;
  height: 100%;
`;

export const MessagesContainer = styled.div`
  display: flex;
  flex: 1;

  overflow-y: auto;
  overflow-x: hidden;
`;

export const ChatForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: rgb(23, 23, 23);
  border-radius: 0.2rem;
  border: 1px solid black;
  padding: 6px 12px;
  margin: 12px;
`;

export const PromptWrapper = styled.div`
  display: grid;
  flex: 1;

  &::after {
    content: attr(data-replicated-value) " ";
    white-space: pre-wrap;
    visibility: hidden;

    /* Identical styling required!! */
    padding: 0.5rem;
    font: inherit;

    /* Place on top of each other */
    grid-area: 1 / 1 / 2 / 2;
  }
`;

export const Prompt = styled.textarea`
  display: flex;
  resize: none;
  overflow: hidden;
  background: transparent;
  border: 0;
  flex: 1;
  font-size: 10pt;
  outline: none;
  color: rgb(255, 255, 255);

  /* Identical styling required!! */
  padding: 0.5rem;
  font: inherit;

  /* Place on top of each other */
  grid-area: 1 / 1 / 2 / 2;

  &::placeholder {
    color: rgb(255, 255, 255, 50%);
  }
`;
