import Chat from "./scenes/chat";

async function App({ params: { lang } }) {

  return (
    <div className="root-view">
      {/* <NavigatorView>&nbsp;</NavigatorView> */}
      <div className="chat-view">
        <Chat lang={lang} />
      </div>
    </div>
  );
}

export default App;
