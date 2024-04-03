from typing import List

import prompts
from fastapi import FastAPI, HTTPException
from langchain.prompts import PromptTemplate
from langchain_openai import ChatOpenAI
from pydantic import BaseModel

app = FastAPI()

llm = ChatOpenAI(model="gpt-4-turbo-preview", temperature=0.5)


class PromptRequest(BaseModel):
    prompt: str
    message: str


class PromptResponse(BaseModel):
    response: str


# Function to generate response using Langchain's model
def generate_response(system_prompt: str, message: str) -> str:
    full_prompt = f"{system_prompt}{{message}}"
    print(f"Full prompt: {full_prompt}{message}")
    prompt = PromptTemplate.from_template(full_prompt)
    llm_chain = prompt | llm
    response = llm_chain.invoke(input={"message": message})
    return response.content


@app.get("/api/prompts", response_model=List[str])
async def get_prompts():
    return prompts.get_prompts()


@app.post("/api/generate", response_model=PromptResponse)
async def generate(prompt_request: PromptRequest):
    if prompt_request.prompt not in prompts.get_prompts():
        raise HTTPException(status_code=404, detail="Prompt not found")
    response = generate_response(prompt_request.prompt, prompt_request.message)
    return PromptResponse(response=response)


if __name__ == "__main__":
    prompt = "Fix the grammar of this text:"
    message = "Testing Conversational Assistants - The Challenge"
    response = generate_response(prompt, message)
    print(response)
