import React, { useEffect, useState } from "react"
import { FaMoon, FaSpinner, FaSun } from "react-icons/fa"
import ReactMarkdown from "react-markdown"
import styled, { ThemeProvider, keyframes } from "styled-components"
import MessageInput from "./components/MessageInput"
import PromptSelector from "./components/PromptSelector"
import ResponseGeneratorButton from "./components/ResponseGeneratorButton"
import { GlobalStyles, darkTheme, lightTheme } from "./components/themes"

const StyledApp = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 20px;
`

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 20px;
`

const MessageContainer = styled.div`
  width: 48%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
`

const ResponseContainer = styled.div`
  width: 50%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  overflow: auto;
  max-height: 600px;
`

const ThemeToggleIcon = styled.div`
  cursor: pointer;
  font-size: 24px;
  position: absolute;
  top: 20px;
  right: 20px;
`

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const SpinnerIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${spin} 2s linear infinite;
  width: 50%;
  height: 600px;
`

const ModelSelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`

const ModelLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`

function App() {
  const [theme, setTheme] = useState("light")
  const [prompts, setPrompts] = useState([])
  const [selectedPrompt, setSelectedPrompt] = useState({})
  const [message, setMessage] = useState("")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedModel, setSelectedModel] = useState("openai-gpt4")

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light")
  }

  useEffect(() => {
    fetch("/api/prompts")
      .then(res => res.json())
      .then(data => {
        setPrompts(data)
        if (data.length > 0) {
          setSelectedPrompt(data[0])
        }
      })
      .catch(error => console.error("Failed to fetch prompts:", error))
  }, [])

  const handlePromptChange = prompt => {
    setSelectedPrompt(prompt)
    setResponse("")
  }

  const handleMessageChange = e => {
    setMessage(e.target.value)
    setResponse("")
  }

  const handleGenerateResponse = () => {
    setIsLoading(true)
    const body = {
      prompt_id: selectedPrompt.id,
      message: message,
      llm_model_name: selectedModel,
    }
    fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then(res => res.json())
      .then(data => {
        setResponse(data.response)
        setIsLoading(false)
      })
      .catch(error => {
        console.error("Failed to generate response:", error)
        setIsLoading(false)
      })
  }

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
              onChange={e => setSelectedModel(e.target.value)}
            />
            OpenAI GPT-4
          </ModelLabel>
          <ModelLabel>
            <input
              type="radio"
              value="groq-mixtral"
              checked={selectedModel === "groq-mixtral"}
              onChange={e => setSelectedModel(e.target.value)}
            />
            Groq Mixtral
          </ModelLabel>
          <ModelLabel>
            <input
              type="radio"
              value="openrouter-wizard"
              checked={selectedModel === "openrouter-wizard"}
              onChange={e => setSelectedModel(e.target.value)}
            />
            OpenRouter Wizard
          </ModelLabel>
        </ModelSelectorContainer>
        <ResponseGeneratorButton onGenerate={handleGenerateResponse} />
        <ContentContainer>
          <MessageContainer>
            <MessageInput
              message={message}
              onMessageChange={handleMessageChange}
              onGenerateResponse={handleGenerateResponse}
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
      </StyledApp>
    </ThemeProvider>
  )
}

export default App
