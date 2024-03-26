import React from "react";
import styled, { ThemeConsumer } from "styled-components";

const ButtonContainer = styled.div`
  .response-generator-button-container {
    text-align: center;
  }

  button {
    padding: 10px 20px;
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text};
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: ${({ theme }) => theme.background};
  }
`;

function ResponseGeneratorButton({ onGenerate }) {
  return (
    <ThemeConsumer>
      {(theme) => (
        <ButtonContainer theme={theme}>
          <div className="response-generator-button-container">
            <button onClick={onGenerate}>Generate Response</button>
          </div>
        </ButtonContainer>
      )}
    </ThemeConsumer>
  );
}

export default ResponseGeneratorButton;
