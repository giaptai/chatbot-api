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
  const [isStreaming, setIsStreaming] = useState(false);

  function updateLastMessageContent(content) {
    setMessages((prevMessages) =>
      prevMessages.map((message, index) =>
        index === prevMessages.length - 1
          ? { ...message, content: `${message.content}${content}` }
          : message
      )
    );
  }

  function addMessage(message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  async function handleContentSend(content) {
    addMessage({ content, role: "user" });
    setIsLoading(true);
    //I recommend you for all API requests use try catch
    try {
      // let result = await assistant.chat(content, messages); //openai
      // let result = await assistant.chat(content); //simple text generate gemini
      let result = await assistant.chatStream(content); //stream text generate gemini
      let isFirstChunk = false;

      for await (const chunk of result) {
        if (!isFirstChunk) {
          isFirstChunk = true;
          addMessage({ content: "", role: "Assistant" });
          setIsLoading(false);
          setIsStreaming(true);
        }
        updateLastMessageContent(chunk);
      }
      setIsStreaming(false);
      // addMessage({ content: result, role: "Assistant" });
    } catch (error) {
      addMessage({
        content: "Sorry, I couldn't process your request now !",
        role: "System",
      });
      //Because, um, if you're trying to ask to get the response, it crashed.
      //So we need to disable loading, because at the beginning of the method, we enabled it.
      setIsLoading(false);
      setIsStreaming(false);
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
      <Controls
        isDisable={isLoading || isStreaming}
        onSend={handleContentSend}
      />
    </div>
  );
}

export default App;
