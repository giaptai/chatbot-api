import { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

import styles from "./Controls.module.css";

export function Controls({ isDisable = false, onSend }) {
  const textareaRef = useRef(null);
  const [content, setContent] = useState("");

  // track isDisable changes I will use use effect.
  useEffect(() => {
    if (!isDisable) {
      textareaRef.current.focus();
    }
  }, [isDisable]);

  function handleContentChange(event) {
    //lay gia tri value o doi tuong hien tai dang nham vao
    //theo toi hieu o day la textarea
    setContent(event.target.value);
  }

  function handleContentSend() {
    if (content.length > 0) {
      onSend(content);
      setContent("");
    }
  }

  function handleEnterPress(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleContentSend();
    }
  }

  return (
    <div className={styles.Controls}>
      <div className={styles.TextAreaContainer}>
        <TextareaAutosize
          ref={textareaRef} ///pass the funciton reference
          minRows={1}
          maxRows={5}
          disabled={isDisable}
          className={styles.TextArea}
          placeholder="Message AI Chat assistant"
          value={content}
          onChange={(event) => handleContentChange(event)} //Pass the arrow function with parentheses
          onKeyDown={function (event) {
            return handleEnterPress(event);
          }}
        />
      </div>
      <button
        title="Title"
        aria-label="sdd"
        aria-labelledby="labeldiv"
        className={styles.Button}
        disabled={isDisable}
        onClick={handleContentSend} //Pass the function reference without parentheses
      >
        <SendIcon />
      </button>
    </div>
  );
}

function SendIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#5f6368"
    >
      <path d="M120-160v-240l320-80-320-80v-240l760 320-760 320Z" />
    </svg>
  );
}
