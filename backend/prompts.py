# backend/prompts.py

# This module contains the list of system prompts that can be used in the application.


def get_prompts():
    """
    Returns a list of system prompts.
    """
    prompts = [
        "Fix the grammar of this text:",
        "Fix the grammar of the text at the end of this prompt. Create a bullet list of the changes you did to fix the grammaer, in Markdown format\n\n",  # noqa E501
        "Corrige a gramática nesta frase, em português de Portugal.",
        """
Improve this text a bit, not too much. 
Don't change the meaning, just make it sound better. Try to avoid fancy words. The tone should be semi-profissional, with a personal touch. Use British English
        """,
    ]
    return prompts
