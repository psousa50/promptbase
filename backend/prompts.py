# backend/prompts.py

# This module contains the list of system prompts that can be used in the application.
from models import Prompt
from uuid import UUID, uuid4


def get_prompts():
    """
    Returns a list of system prompts.
    """
    prompts = [
        Prompt(
            id=UUID("f2a1a8e4-9573-4d2a-9f38-9ca5e5b3b4e1"),
            text="Improve this text a bit, if needed. Use British English",
        ),
        Prompt(
            id=UUID("a3b4c5d6-7e8f-9012-3456-7890abcdef12"),
            text="Fix the grammar of this text, using British English. Show the text in markdown format emphasizing the changes:",
        ),
        Prompt(
            id=UUID("b4c5d6e7-8f90-1234-5678-90abcdef1234"),
            text="Fix the grammar of the text at the end of this prompt. Create a bullet list of the changes you did to fix the grammar, in Markdown format\n\n",
        ),
        Prompt(
            id=UUID("c5d6e7f8-9012-3456-7890-abcdef123456"),
            text="Corrige a gramática nesta frase, em português de Portugal.",
        ),
        Prompt(
            id=UUID("d6e7f890-1234-5678-90ab-cdef12345678"),
            text="Melhora ligeiramente este texto, em português de Portugal.",
        ),
        Prompt(
            id=UUID("e7f89012-3456-7890-abcd-ef1234567890"),
            text="Translate this text to Portuguese of Portugal.",
        ),
        Prompt(
            id=UUID("f8901234-5678-90ab-cdef-123456789012"),
            text="Translate this text to British English.",
        ),
    ]
    return prompts
