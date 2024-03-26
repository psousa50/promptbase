# backend/prompts.py

# This module contains the list of system prompts that can be used in the application.

def get_prompts():
    """
    Returns a list of system prompts.
    """
    prompts = [
        "Fix the grammar in this sentence.",
        "Fix the grammar in this sentence. At the end create a bullet list of the changes. Use Markdown format",
        "Corrige a gramática nesta frase, em português de Portugal.",
    ]
    return prompts
