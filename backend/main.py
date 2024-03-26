from typing import List

import prompts
from fastapi import FastAPI, HTTPException
from langchain.prompts import PromptTemplate
from langchain_openai import OpenAI
from pydantic import BaseModel

app = FastAPI()

llm = OpenAI(
    model="gpt-3.5-turbo-instruct",
    temperature=0.0
)


class PromptRequest(BaseModel):
    prompt: str
    message: str


class PromptResponse(BaseModel):
    response: str


# Function to generate response using Langchain's model
def generate_response(system_prompt: str, message: str) -> str:
    full_prompt = f"{system_prompt}\n{{message}}"
    prompt = PromptTemplate.from_template(full_prompt)
    llm_chain = prompt | llm
    # Using Langchain's model to generate response
    response = llm_chain.invoke(input={"message": message})
    return response


@app.get("/api/prompts", response_model=List[str])
async def get_prompts():
    return prompts.get_prompts()


@app.post("/api/generate", response_model=PromptResponse)
async def generate(prompt_request: PromptRequest):
    if prompt_request.prompt not in prompts.get_prompts():
        raise HTTPException(status_code=404, detail="Prompt not found")
    response = generate_response(prompt_request.prompt, prompt_request.message)
    return PromptResponse(response=response)

