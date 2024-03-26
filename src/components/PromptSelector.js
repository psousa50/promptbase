import React from "react";
import styled, { ThemeConsumer } from "styled-components";

const PromptSelectorContainer = styled.div`
  .prompt-selector {
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

  select {
    width: 100%;
    padding: 5px;
    margin-top: 5px;
    border: 1px solid ${({ theme }) => theme.toggleBorder};
    border-radius: 3px;
  }
`;

function PromptSelector({ prompts, onPromptChange }) {
  return (
    <ThemeConsumer>
      {(theme) => (
        <PromptSelectorContainer theme={theme}>
          <div className="prompt-selector">
            <label htmlFor="prompt-select">Choose a prompt:</label>
            <select
              id="prompt-select"
              onChange={(e) => onPromptChange(e.target.value)}
            >
              {prompts.map((prompt, index) => (
                <option key={index} value={prompt}>
                  {prompt}
                </option>
              ))}
            </select>
          </div>
        </PromptSelectorContainer>
      )}
    </ThemeConsumer>
  );
}

export default PromptSelector;
