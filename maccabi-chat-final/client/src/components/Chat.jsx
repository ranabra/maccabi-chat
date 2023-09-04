import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { usePageVisibility } from "./visibility";
import { Client, Account } from "appwrite";
import { nanoid } from "nanoid";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [isCurrentAuthorAsRead, setIsCurrentAuthorAsRead] = useState(false);
  const isVisible = usePageVisibility();

  // Using 'Page Visibility API', to check page visibility / focus
  // needed for the Whatsapp style double blue check-marks feature
  const currentDate = new Date();
  const timestamp = currentDate.toLocaleTimeString();

  // Identify when the current user using the chat window/tab, is active / in-focus
  const sendIsCurrentUserActive = async () => {
    const messageData = {
      room: room,
      author: username,
    };
    await socket.emit("send_isCurrentUserActive", messageData);
  };

  if (isVisible) {
    sendIsCurrentUserActive();
  }

  const getClientAuth = async () => {
    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1") // API Endpoint
      .setProject("64f1c9b7005f587b3dd6"); // Project ID

    const account = new Account(client);
    const user = await account.createJWT();

    const jwtToken = user.jwt == null ? "" : user.jwt;
    return jwtToken;
  };

  const sendMessage = async () => {
    let clientAuthToken;

    try {
      const jwtToken = await getClientAuth()
      clientAuthToken = jwtToken
    } catch (error) {
      console.error(error)
    }

    if (currentMessage && clientAuthToken ) {
        const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).toLocaleString(),
        setAsRead: false,
        clientAuthToken: clientAuthToken,
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);

      // Clear token
      clientAuthToken = "";

      // Clear chat input field
      setCurrentMessage("");
    }
  };

  const defineCurrentAuthorMessagesAsRead = () => {
    if (isCurrentAuthorAsRead && username && messageList.length > 0) {
      // Update current author's Message List's 'setAsRead' to: true
      const updatedMessageList = messageList.map((message) => ({
        ...message,
        setAsRead: message.author === username ? true : message.setAsRead,
      }));

      // Set state to updated Message List
      setMessageList(updatedMessageList);

      // Reset boolean, so we can still have 'un-read' messages later
      setIsCurrentAuthorAsRead(false);
    }
  };

  useEffect(() => {
    socket.on("receive_isOtherUserActive", (data) => {
      // Other chat participant is active, so set current author's messages as 'Read'
      if (data.author) {
        setIsCurrentAuthorAsRead(true);
      }
    });

    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });

    // To avoid messages being sent twice
    return () => socket.on("receive_message");
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {isCurrentAuthorAsRead && defineCurrentAuthorMessagesAsRead()}

          {messageList.map((messageContent) => {
            return (
              <div
                key={nanoid()}
                className="message"
                id={username === messageContent.author ? "self" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  {/* Only show the double check-mark icons for self created messages */}
                  {
                    // Show the 'is-read' Whatsapp icon
                    messageContent.setAsRead && (
                      <img
                        src="images/whatsapp-double-check-mark-read.png"
                        className="double--check--mark"
                      />
                    )
                  }
                  {
                    // Show the 'un-read' Whatsapp icon
                    !messageContent.setAsRead &&
                      username === messageContent.author && (
                        <img
                          src="images/whatsapp-double-check-mark-unread.png"
                          className="double--check--mark"
                        />
                      )
                  }
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Write something..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyUp={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />

        <div className="send--btn--wrapper">
          <input
            className="btn btn--main"
            type="button"
            value="send"
            onClick={sendMessage}
          />
        </div>
      </div>
    </div>
  );
}

export default Chat;
