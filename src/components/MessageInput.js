import React from "react";
import styled, { ThemeConsumer } from "styled-components";

const MessageInputContainer = styled.div`
  .message-input-container {
    width: 50%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
  }

  label {
    font-weight: bold;
    color: ${({ theme }) => theme.text};
  }

  textarea {
    width: 100%;
    height: 600px;
    border: 1px solid ${({ theme }) => theme.toggleBorder};
    border-radius: 3px;
  }
`;

function MessageInput({ message, onMessageChange }) {
  return (
    <ThemeConsumer>
      {(theme) => (
        <MessageInputContainer theme={theme}>
          <textarea
            id="messageInput"
            value={message}
            onChange={onMessageChange}
            placeholder="Type your message here..."
          />
        </MessageInputContainer>
      )}
    </ThemeConsumer>
  );
}

export default MessageInput;
