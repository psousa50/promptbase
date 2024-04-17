from typing import List

import prompts
from fastapi import FastAPI, HTTPException
from langchain.prompts import PromptTemplate
from langchain_groq import ChatGroq
from langchain_openai import ChatOpenAI
from pydantic import BaseModel

app = FastAPI()

temperature = 0.5
open_ai_gpt_4 = ChatOpenAI(model="gpt-4-turbo-preview", temperature=temperature)
groq_mixtral = ChatGroq(model="mixtral-8x7b-32768", temperature=temperature)


class PromptRequest(BaseModel):
    prompt: str
    message: str
    llm_model_name: str  # New field added


class PromptResponse(BaseModel):
    response: str


# Function to generate response using the specified model
def generate_response(system_prompt: str, message: str, model_name: str) -> str:
    full_prompt = f"{system_prompt}{{message}}"
    print(f"Full prompt: {full_prompt}{message}")
    prompt = PromptTemplate.from_template(full_prompt)
    if model_name == "openai-gpt4":
        llm_chain = (
            prompt | open_ai_gpt_4
        )  # Assuming llm is your ChatOpenAI instance for GPT-4
    elif model_name == "groq-mixtral":
        llm_chain = (
            prompt | groq_mixtral
        )  # You need to define groq_mixtral similar to llm for this to work
    else:
        raise ValueError("Unsupported model name")
    response = llm_chain.invoke(input={"message": message})
    return str(response.content)


@app.get("/api/prompts", response_model=List[str])
async def get_prompts():
    return prompts.get_prompts()


@app.post("/api/generate", response_model=PromptResponse)
async def generate(prompt_request: PromptRequest):
    if prompt_request.prompt not in prompts.get_prompts():
        raise HTTPException(status_code=404, detail="Prompt not found")
    response = generate_response(
        prompt_request.prompt, prompt_request.message, prompt_request.llm_model_name
    )  # Pass model_name
    return PromptResponse(response=response)


if __name__ == "__main__":
    prompt = "Fix the grammar of this text:"
    message = "Testing Conversational Assistants - The Challenge"
    response = generate_response(
        prompt, message, "openai-gpt4"
    )  # Example model_name usage
    print(response)
