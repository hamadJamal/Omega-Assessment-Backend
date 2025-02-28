# Grammar Correction Backend

## Overview

This is the **Node.js + Express** backend for a minimal grammar-correction app.  
It provides:

1. **User Authentication** (login, logout) via JWT.
2. **Grammar Check** endpoint that uses OpenAI GPT to find incorrect words in the user’s text.
3. A well-structured, modular codebase (routes, controllers, services, utils, etc.).

## Key Features

- **JWT-based Authentication**
  - `POST /api/auth/login` – Expects `{ username, password }`, returns a JWT.
  - `POST /api/auth/logout` – Logs out the user (front-end typically just clears the token).
- **Grammar Check**
  - `POST /api/grammar/check` – Protected endpoint.
    - Request body: `{ "text": "<user text>" }`
    - Returns JSON:
      ```json
      {
        "success": true,
        "data": {
          "incorrectTokens": [
            {
              "index": 3,
              "original": "firt",
              "suggestion": "first"
            }
          ]
        },
        "error": null
      }
      ```

## Prerequisites

- **Node.js** (v14+ recommended)
- **npm** (or yarn)
- **OpenAI API key** (set in the environment variable `OPENAI_API_KEY`)

## Setup & Installation

1. **Clone** this repository (the backend) from your version control system.
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Create a `.env` file** with environment variables:
   ```bash
   OPENAI_API_KEY=your-openai-api-key
   JWT_SECRET=your-jwt-secret
   PORT=4000
   ```
   `PORT` is optional. If not specified, defaults to 4000.
4. **Start the server**:
   ```bash
   npm start
   ```
   The server will listen on `http://localhost:4000` (or the port you configured).

## High-Level Flow

### Authentication:

1. A user logs in via `POST /api/auth/login`, providing credentials (e.g., `{ username, password }`).
2. The server returns a JWT if valid.

### Grammar Check:

1. The client sends a request to `POST /api/grammar/check` with the JWT in the header (`Authorization: Bearer <JWT>`).
2. The server:
   - Calls OpenAI GPT to identify incorrect words.
   - Maps them to the correct indexes in the user’s text.
   - Returns an array of `{ index, original, suggestion }`.

### Logout:

1. `POST /api/auth/logout`. The server responds with success, and the client can remove the token from local storage.

## Usage

### Login:

#### Request:

```json
POST /api/auth/login
{
  "username": "admin",
  "password": "1234"
}
```

#### Response:

```json
{
  "success": true,
  "data": {
    "token": "JWT_TOKEN_HERE"
  },
  "error": null
}
```

### Check Grammar (requires JWT):

#### Request:

```json
POST /api/grammar/check
Authorization: Bearer JWT_TOKEN_HERE
{
  "text": "This is the firt time I am visiting Lahore"
}
```

#### Response:

```json
{
  "success": true,
  "data": {
    "incorrectTokens": [
      {
        "index": 3,
        "original": "firt",
        "suggestion": "first"
      }
    ]
  },
  "error": null
}
```

## Deployment

You can deploy to any Node-friendly service (Render, Railway, AWS, etc.).
Make sure environment variables (`OPENAI_API_KEY`, `JWT_SECRET`, `PORT`) are set in your hosting platform’s configuration.
