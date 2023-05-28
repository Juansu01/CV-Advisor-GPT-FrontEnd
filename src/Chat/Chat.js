import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput
} from "@chatscope/chat-ui-kit-react";
import { useState } from "react";

import Card from "../UI/Card";
import classes from "./Chat.module.css"


const Chat = (props) => {
  const [messageList, setMessageList] = useState([
    { message: props.initialMessage, sender: 'assistant', sentTime: 'just now' },
  ]);
  const [isGPTThinking, setIsGPTThinking] = useState(false)

  const sendMessageToGPT = async (message) => {
    console.log(message)
    setIsGPTThinking(true);
    const response = await fetch("http://34.125.52.24:3000/send-message-to-gpt", {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (response.ok) {
      const json = await response.json()
      setMessageList(prev => {
        return [...prev, {
          message: json.response,
          sender: 'assistant',
          sentTime: 'just now'
        }]
      });
    }
    setIsGPTThinking(false);
  }

  const sendHandler = async (value) => {
    setMessageList(prev => {
      return [...prev, {
        message: value,
        sender: 'user',
        sentTime: 'just now'
      }]
    });
    await sendMessageToGPT(value);
  }

  return (
    <Card>
      <div>
        <MainContainer>
          <ChatContainer className={classes.container}>
            <MessageList>
              {messageList.map((message, index) => (
                <Message
                  className={classes['right-message']}
                  key={index}
                  model={{
                    message: message.message,
                    sentTime: message.sentTime,
                    sender: message.sender,
                    direction: message.sender === 'assistant' ? 'incoming' : 'outgoing'
                  }}
                />
              ))}
            </MessageList>
            <MessageInput
              placeholder={isGPTThinking ? "Give Advisor a moment" : "Type your message."}
              onSend={sendHandler}
              disabled={isGPTThinking}
            />
          </ChatContainer>
        </MainContainer>
      </div>
      <p className="text-center">Response times may vary depending on the model's availability.</p>
    </Card>
  )
}

export default Chat;