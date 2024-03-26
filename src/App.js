import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import MessageInput from "./components/MessageInput";
import PromptSelector from "./components/PromptSelector";
import ResponseGeneratorButton from "./components/ResponseGeneratorButton";
import ThemeToggler from "./components/ThemeToggler";
import { GlobalStyles, darkTheme, lightTheme } from "./components/themes";

const StyledApp = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const ResponseContainer = styled.div`
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
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
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
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
        <ThemeToggler theme={theme} toggleTheme={themeToggler} />
        <h1>System Prompt Generator</h1>
        <PromptSelector prompts={prompts} onPromptChange={handlePromptChange} />
        <MessageInput message={message} onMessageChange={handleMessageChange} />
        <ResponseGeneratorButton onGenerate={handleGenerateResponse} />
        {response && <ResponseContainer>{response}</ResponseContainer>}
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;
