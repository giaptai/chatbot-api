import { useState } from "react";

import { Assistant } from "./assistants/googleapi.js";
// import {Assistant} from "./assistants/openai.js"

import { Chat } from "./components/Chat/Chat.jsx";
import { Controls } from "./components/Controls/Controls.jsx";
import { Loader } from "./components/Loader/Loader.jsx";

import styles from "./App.module.css";

function App() {
  const assistant = new Assistant();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function addMessage(message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  async function handleContentSend(content) {
    addMessage({ content, role: "user" });
    setIsLoading(true);
    //I recommend you for all API requests use try catch
    try {
      let result = await assistant.chat(content, messages);
      addMessage({ content: result, role: "Assistant" });
    } catch (error) {
      addMessage({
        content: "Sorry, I couldn't process your request now !",
        role: "System",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.App}>
      {isLoading && <Loader />}
      <header className={styles.Header}>
        <img
          className={styles.Logo}
          title="img-chatlogo"
          src="/robot-assistant.png"
        />
        <h2 className={styles.Title}>AI Chat bot</h2>
      </header>
      <main className={styles.ChatContainer}>
        <Chat messages={messages} />
      </main>
      <Controls isDisable={isLoading} onSend={handleContentSend} />
    </div>
  );
}

export default App;
