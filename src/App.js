import React, { useEffect, useState } from "react";
import { FaMoon, FaSpinner, FaSun } from "react-icons/fa"; // Importing icons for theme toggling and adding spinner icon
import ReactMarkdown from "react-markdown";
import styled, { ThemeProvider, keyframes } from "styled-components";
import MessageInput from "./components/MessageInput";
import PromptSelector from "./components/PromptSelector";
import ResponseGeneratorButton from "./components/ResponseGeneratorButton";
import { GlobalStyles, darkTheme, lightTheme } from "./components/themes";

const StyledApp = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 20px;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 20px; /* Added space between message and response */
`;

const MessageContainer = styled.div`
  width: 48%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const ResponseContainer = styled.div`
  width: 50%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  overflow: auto; /* Allows scrolling for long responses */
  max-height: 600px; /* Sets a maximum height to maintain layout */
`;

const ThemeToggleIcon = styled.div`
  cursor: pointer;
  font-size: 24px;
  position: absolute;
  top: 20px;
  right: 20px;
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${spin} 2s linear infinite;
  width: 50%; /* Ensure it takes the full width of its container */
  height: 600px; /* Match the height of the message input for alignment */
`;

const ModelSelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const ModelLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

function App() {
  const [theme, setTheme] = useState("light");
  const [prompts, setPrompts] = useState([]);
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State to manage loading state
  const [selectedModel, setSelectedModel] = useState("openai-gpt4"); // Default model

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  useEffect(() => {
    // Fetch the list of prompts from the backend
    fetch("/api/prompts")
      .then((res) => res.json())
      .then((data) => {
        setPrompts(data);
        if (data.length > 0) {
          setSelectedPrompt(data[0]);
        }
      })
      .catch((error) => console.error("Failed to fetch prompts:", error));
  }, []);

  const handlePromptChange = (prompt) => {
    setSelectedPrompt(prompt);
    setResponse(""); // Clear the response when a new prompt is selected
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    setResponse(""); // Clear the response when the message is changed
  };

  const handleGenerateResponse = () => {
    setIsLoading(true); // Set loading to true when generating response
    // Send the selected prompt and message to the backend to generate a response
    fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: selectedPrompt,
        message: message,
        llm_model_name: selectedModel,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setResponse(data.response);
        setIsLoading(false); // Set loading to false after receiving response
      })
      .catch((error) => {
        console.error("Failed to generate response:", error);
        setIsLoading(false); // Ensure loading is set to false even if there's an error
      });
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <StyledApp>
        <ThemeToggleIcon onClick={themeToggler}>
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </ThemeToggleIcon>
        <h1>System Prompt Generator</h1>
        <PromptSelector
          prompts={prompts}
          onPromptChange={handlePromptChange}
          selectedPrompt={selectedPrompt}
        />
        <ModelSelectorContainer>
          <ModelLabel>
            <input
              type="radio"
              value="openai-gpt4"
              checked={selectedModel === "openai-gpt4"}
              onChange={(e) => setSelectedModel(e.target.value)}
            />
            OpenAI GPT-4
          </ModelLabel>
          <ModelLabel>
            <input
              type="radio"
              value="groq-mixtral"
              checked={selectedModel === "groq-mixtral"}
              onChange={(e) => setSelectedModel(e.target.value)}
            />
            Groq Mixtral
          </ModelLabel>
        </ModelSelectorContainer>
        <ContentContainer>
          <MessageContainer>
            <MessageInput
              message={message}
              onMessageChange={handleMessageChange}
              onGenerateResponse={handleGenerateResponse} // Using onGenerateResponse prop
            />
          </MessageContainer>
          {isLoading ? (
            <SpinnerIcon>
              <FaSpinner />
            </SpinnerIcon>
          ) : (
            response && (
              <ResponseContainer>
                <ReactMarkdown>{response}</ReactMarkdown>
              </ResponseContainer>
            )
          )}
        </ContentContainer>
        <ResponseGeneratorButton onGenerate={handleGenerateResponse} />
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;
