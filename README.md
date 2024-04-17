# System Prompt Response Generator

This project was developed by Cursor IDE, as part of an experiment to explore the capabilities using AI to write code.

The following README.md was also written by Cursor IDE (with some human changes).

-----------------

This project is a monorepo containing two main components: a React frontend application and a FastAPI backend service. The goal of this project is to provide a user interface where users can select a system prompt, input a message, and generate a response through a RESTful API.

## Structure

The project is organized into two main directories:

- `root`: Contains the React application created with Create React App.
- `backend`: Contains the FastAPI application for handling RESTful API requests.

### Frontend Components

- `src/index.js`: Entry point for the React application.
- `src/App.js`: Main component that orchestrates the UI.
- `src/components/PromptSelector.js`: Component for selecting a system prompt.
- `src/components/MessageInput.js`: Component for inputting a message.
- `src/components/ResponseGeneratorButton.js`: Component for triggering the response generation.

### Backend Files

- `backend/main.py`: Main file for the FastAPI application.
- `backend/prompts.py`: Contains the list of system prompts.
- `backend/models.py`: Defines the data models used in the API.

## Setup

### Prerequisites

- Node.js and npm (for the frontend) (node version < 17)
- Python 3.8 or higher (for the backend)

### Installing Dependencies

For the frontend, run:

```bash
npm install
```

This will install all the necessary dependencies for the React application.

For the Backend, run:

```bash
poetry install
```

This will install FastAPI and Uvicorn, which is needed to run the server.

## Running the Project

### Frontend

In the `frontend` directory, start the React application with:

```bash
npm start
```

This will serve the application on `http://localhost:3000`.

### Backend

In the `backend` directory, start the FastAPI server with:

```bash
uvicorn main:app --reload
```

This will serve the API on `http://localhost:8000`.

## Usage

1. Open the React application in your browser.
2. Select a system prompt from the dropdown menu.
3. Enter your message in the text area provided.
4. Click the "Generate Response" button to receive a response from the system.

## API Endpoints

- `GET api/prompts`: Returns the list of available system prompts.
- `POST api/generate`: Receives a system prompt and a message, and returns a generated response.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any bugs or improvements.

## License

This project is open-sourced under the MIT License. See the [LICENCE](LICENCE) file for more details.

