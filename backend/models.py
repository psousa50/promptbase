# backend/models.py

from pydantic import BaseModel

# Since the backend is primarily using FastAPI and Pydantic for data validation,
# and there's no mention of a database or ORM, we'll define the models needed for the API interactions.

# This file will define the Pydantic models that are used for request validation and response serialization.


class PromptRequest(BaseModel):
    prompt: str
    message: str


class PromptResponse(BaseModel):
    response: str


# Note: The PromptRequest and PromptResponse classes are already defined in main.py for the API endpoints.
# If you plan to use these models across different files or modules,
# it's a good practice to define them in a models.py file,
# and then import them in your main.py or wherever else they're needed.
# This helps in keeping your code organized and DRY (Don't Repeat Yourself).
# However, since they are already defined in main.py in the provided code snippets,
# ensure not to duplicate these definitions in your actual project without refactoring.
