import os
from pydantic.v1.types import SecretStr
from typing import List
import prompts
from uuid import UUID, uuid4
from fastapi import FastAPI, HTTPException
from langchain.prompts import PromptTemplate
from langchain_groq import ChatGroq
from langchain_openai import ChatOpenAI
from pydantic import BaseModel, Field

app = FastAPI()

temperature = 0.5
open_ai_gpt_4 = ChatOpenAI(model="gpt-4o", temperature=temperature)
groq_mixtral = ChatGroq(model="mixtral-8x7b-32768", temperature=temperature)
openrouter_wizard = ChatOpenAI(
    model="microsoft/wizardlm-2-8x22b",
    base_url="https://openrouter.ai/api/v1",
    api_key=SecretStr(os.getenv("OPENROUTER_API_KEY", "")),
    temperature=temperature,
)


class Prompt(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    text: str


class PromptRequest(BaseModel):
    prompt_id: UUID
    message: str
    llm_model_name: str


class PromptResponse(BaseModel):
    response: str


def generate_response(system_prompt: str, message: str, model_name: str) -> str:
    full_prompt = f"{system_prompt}{{message}}"
    print(f"Full prompt: {full_prompt}{message}")
    prompt = PromptTemplate.from_template(full_prompt)
    if model_name == "openai-gpt4":
        llm_chain = prompt | open_ai_gpt_4
    elif model_name == "groq-mixtral":
        llm_chain = prompt | groq_mixtral
    elif model_name == "openrouter-wizard":
        llm_chain = prompt | openrouter_wizard
    else:
        raise ValueError("Unsupported model name")
    response = llm_chain.invoke(input={"message": message})
    return str(response.content)


@app.get("/api/prompts", response_model=List[Prompt])
async def get_prompts():
    return prompts.get_prompts()


@app.post("/api/generate", response_model=PromptResponse)
async def generate(prompt_request: PromptRequest):
    prompt_list = prompts.get_prompts()
    prompt_dict = {str(prompt.id): prompt for prompt in prompt_list}
    if str(prompt_request.prompt_id) not in prompt_dict:
        raise HTTPException(status_code=404, detail="Prompt not found")
    selected_prompt = prompt_dict[str(prompt_request.prompt_id)].text
    response = generate_response(
        selected_prompt, prompt_request.message, prompt_request.llm_model_name
    )
    return PromptResponse(response=response)


if __name__ == "__main__":
    prompt = "Fix the grammar of this text:"
    message = "Testing Conversational Assistants - The Challenge"
    response = generate_response(prompt, message, "openai-gpt4")
    print(response)
