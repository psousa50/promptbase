import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import styled, { ThemeProvider } from "styled-components";
import MessageInput from "./components/MessageInput";
import PromptSelector from "./components/PromptSelector";
import ResponseGeneratorButton from "./components/ResponseGeneratorButton";
import { FaMoon, FaSun } from "react-icons/fa"; // Importing icons for theme toggling
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

function App() {
  const [theme, setTheme] = useState("light");
  const [prompts, setPrompts] = useState([]);
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

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
    // Send the selected prompt and message to the backend to generate a response
    fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: selectedPrompt, message: message }),
    })
      .then((res) => res.json())
      .then((data) => {
        setResponse(data.response);
      })
      .catch((error) => console.error("Failed to generate response:", error));
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
        <ContentContainer>
          <MessageContainer>
            <MessageInput
              message={message}
              onMessageChange={handleMessageChange}
            />
          </MessageContainer>
          {response && (
            <ResponseContainer>
              <ReactMarkdown>{response}</ReactMarkdown>
            </ResponseContainer>
          )}
        </ContentContainer>
        <ResponseGeneratorButton onGenerate={handleGenerateResponse} />
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;
