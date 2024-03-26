import React from "react";
import styled, { ThemeConsumer } from "styled-components";

const MessageInputContainer = styled.div`
  .message-input-container {
    font-family: Arial, sans-serif;
    margin: 10px;
    padding: 10px;
    border: 1px solid ${({ theme }) => theme.toggleBorder};
    border-radius: 5px;
    background-color: ${({ theme }) => theme.body};
  }

  label {
    font-weight: bold;
    color: ${({ theme }) => theme.text};
  }

  textarea {
    width: 100%;
    height: 100px; // Made the text input taller
    padding: 5px;
    margin-top: 5px;
    border: 1px solid ${({ theme }) => theme.toggleBorder};
    border-radius: 3px;
  }
`;

function MessageInput({ message, onMessageChange }) {
  return (
    <ThemeConsumer>
      {(theme) => (
        <MessageInputContainer theme={theme}>
          <div className="message-input-container">
            <label htmlFor="messageInput">Your Message:</label>
            <textarea
              id="messageInput"
              value={message}
              onChange={onMessageChange}
              placeholder="Type your message here..."
            />
          </div>
        </MessageInputContainer>
      )}
    </ThemeConsumer>
  );
}

export default MessageInput;
