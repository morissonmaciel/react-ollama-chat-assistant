"use client";

import Chat from "./scenes/chat";

function App() {
  return (
    <div className="root-view">
      {/* <NavigatorView>&nbsp;</NavigatorView> */}
      <div className="chat-view">
        <Chat />
      </div>
    </div>
  );
}

export default App;
