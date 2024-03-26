import React from "react";
import styled, { ThemeConsumer } from "styled-components";
import { lighten } from "polished";

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
          {prompts.map((prompt, index) => {
            const isSelected = prompt === selectedPrompt;
            console.log(isSelected);
            return (
              <PromptCard
                key={index}
                theme={theme}
                $isSelected={isSelected} // Corrected prop passing
                onClick={() => onPromptChange(prompt)}
              >
                {prompt}
              </PromptCard>
            );
          })}
        </PromptSelectorContainer>
      )}
    </ThemeConsumer>
  );
}

export default PromptSelector;
