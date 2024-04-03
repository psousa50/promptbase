# backend/prompts.py

# This module contains the list of system prompts that can be used in the application.


def get_prompts():
    """
    Returns a list of system prompts.
    """
    prompts = [
        """
Improve this text a bit, if needed. 
Don't change the meaning, just make it sound better. 
Use British English
        """,
        """
Fix the grammar of this text, using British English. Show the text in markdown format emphasizing the changes:
        """,
        """
Fix the grammar of the text at the end of this prompt. Create a bullet list of the changes you did to fix the grammar, in Markdown format\n\n
        """,
        """
Corrige a gramática nesta frase, em português de Portugal.
        """,
        """
Melhora ligeiramente este texto, em português de Portugal.
        """,
    ]
    return prompts
