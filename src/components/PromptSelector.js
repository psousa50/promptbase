import { lighten } from "polished";
import React from "react";
import styled, { ThemeConsumer } from "styled-components";

const PromptSelectorContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
  margin: 10px;
  padding: 10px;
`;

const PromptCard = styled.div`
  font-family: Arial, sans-serif;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.toggleBorder};
  border-radius: 5px;
  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.toggleBorder : theme.body};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => lighten(0.2, theme.toggleBorder)};
  }
`;

function PromptSelector({ prompts, onPromptChange, selectedPrompt }) {
  return (
    <ThemeConsumer>
      {(theme) => (
        <PromptSelectorContainer theme={theme}>
          {prompts.map((prompt) => {
            const isSelected = prompt.id === selectedPrompt.id;
            return (
              <PromptCard
                key={prompt.id}
                theme={theme}
                $isSelected={isSelected}
                onClick={() => onPromptChange(prompt)}
              >
                {prompt.text}
              </PromptCard>
            );
          })}
        </PromptSelectorContainer>
      )}
    </ThemeConsumer>
  );
}

export default PromptSelector;
