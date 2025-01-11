import { useEffect, useRef, useMemo } from "react";
import Markdown from "react-markdown";
import styles from "./Chat.module.css";

const WELCOME_MESSAGE_GROUP = [
  { role: "Assistant", content: "Hello, How can I assist you right now ?" },
];

export function Chat({ messages }) {
  const messagesEndRef = useRef(null);

  //memorize uh memory this value and not calculate it on every
  //react update and only calculate recalculate it when the when we really need
  // when the messages will updated
  const messagesGroups = useMemo(
    () =>
      messages.reduce((groups, message) => {
        if (message.role === "user") {
          groups.push([]);
        }
        groups[groups.length - 1].push(message);
        return groups;
      }, []),
    [messages]
  );

  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);
  useEffect(() => {
    let lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === "user") {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  
  return (
    <div className={styles.Chat}>
      {[WELCOME_MESSAGE_GROUP, ...messagesGroups].map(
        (messages, groupIndex) => (
          // Group
          <div key={groupIndex} className={styles.Group}>
            {messages.map(({ role, content }, index) => (
              // Message
              <div key={index} className={styles.Message} data-role={role}>
                <Markdown>{content}</Markdown>
              </div>
            ))}
          </div>
        )
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
