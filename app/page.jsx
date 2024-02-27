"use client";

import { ChatView, RootContainer } from "./page.styled";
import Chat from "./scenes/chat";

function App() {
  return (
    <RootContainer>
      {/* <NavigatorView>&nbsp;</NavigatorView> */}
      <ChatView>
        <Chat />
      </ChatView>
    </RootContainer>
  );
}

export default App;
