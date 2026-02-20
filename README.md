# Simple Twitter Clone

A full-stack Twitter clone application built using the MERN stack (MongoDB, Express, React, Node.js). This project demonstrates a basic implementation of a social media feed where users can post tweets and view them in real-time.

## Features

- **Post Tweets:** Users can write and post tweets (up to 280 characters).
- **View Feed:** A real-time feed of tweets from all users.
- **Responsive Design:** Works on desktop and mobile devices.
- **Dockerized:** Easily deployable using Docker and Docker Compose.

## Tech Stack

- **Frontend:**
  - React (created with Vite)
  - Axios for API requests
  - CSS for styling

- **Backend:**
  - Node.js
  - Express.js
  - Mongoose (ODM for MongoDB)
  - CORS for cross-origin resource sharing

- **Database:**
  - MongoDB

- **DevOps:**
  - Docker
  - Docker Compose

## Prerequisites

- [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/) (Recommended)
- [Node.js](https://nodejs.org/) (for local development without Docker)
- [MongoDB](https://www.mongodb.com/try/download/community) (for local development without Docker)

## Getting Started

### Using Docker (Recommended)

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Run with Docker Compose:**

    ```bash
    docker-compose up --build
    ```

    This command will build the images and start the containers for the frontend, backend, and database.

3.  **Access the Application:**

    - **Frontend:** Open your browser and go to [http://localhost:5173](http://localhost:5173).
    - **Backend API:** The API is available at [http://localhost:5000](http://localhost:5000).

4.  **Stop the Application:**

    Press `Ctrl+C` in the terminal or run:

    ```bash
    docker-compose down
    ```

### Local Development

If you prefer to run the application locally without Docker:

#### Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Ensure MongoDB is running locally.

4.  Start the server:
    ```bash
    npm start
    ```
    The server will run on [http://localhost:5000](http://localhost:5000).

#### Frontend Setup

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```
    The frontend will be available at [http://localhost:5173](http://localhost:5173).

## Environment Variables

### Backend

- `PORT`: The port the server runs on (default: `5000`).
- `MONGO_URI`: The MongoDB connection string (default: `mongodb://mongo:27017/twitter-clone` in Docker, you might need `mongodb://localhost:27017/twitter-clone` for local).

### Frontend

- `VITE_API_URL`: The URL of the backend API (default: `http://localhost:5000/api/tweets`).

## Continuous Integration

To set up Continuous Integration (CI) using GitHub Actions, create a file named `.github/workflows/ci.yml` in your repository with the following content:

```yaml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Use Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18.x'

    - name: Install Dependencies (Backend)
      run: |
        cd backend
        npm install

    - name: Run Tests (Backend)
      run: |
        cd backend
        npm test

    - name: Install Dependencies (Frontend)
      run: |
        cd frontend
        npm install

    - name: Build (Frontend)
      run: |
        cd frontend
        npm run build

    - name: Build Docker Images
      run: docker-compose build
```

This workflow will run on every push and pull request to the `main` branch. It installs dependencies, runs backend tests, builds the frontend, and builds the Docker images to ensure everything is working correctly.

## Project Structure

```
.
├── backend/            # Backend Node.js/Express application
│   ├── models/         # Mongoose models
│   ├── server.js       # Entry point for the backend
│   └── ...
├── frontend/           # Frontend React application
│   ├── src/            # Source code
│   ├── vite.config.js  # Vite configuration
│   └── ...
├── docker-compose.yml  # Docker Compose configuration
└── README.md           # Project documentation
```

## API Endpoints

- **GET /api/tweets**: Fetch all tweets.
- **POST /api/tweets**: Create a new tweet.
  - Body: `{ "content": "Your tweet content" }`
