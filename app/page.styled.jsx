import styled from "styled-components";

export const RootContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  background: rgb(23, 23, 23);
`;

export const NavigatorView = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 280px;
`;

export const ChatView = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: rgb(50, 62, 68);
`;
