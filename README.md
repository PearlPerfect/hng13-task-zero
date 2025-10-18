# Profile API with Cat Facts

A simple RESTful API that returns profile information along with dynamic cat facts from an external API.

## Features

- GET `/me` endpoint returns profile information
- Dynamic cat facts from [Cat Facts API](https://catfact.ninja/)
- Real-time UTC timestamp in ISO 8601 format
- Proper error handling and fallback mechanisms
- CORS enabled
- Health check endpoint

## Tech Stack
- Node.js
- Express.js
- Axios for HTTP requests
- CORS for cross-origin requests
- Jest for testing

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd profile-api
Install dependencies:

bash
npm install
Create environment file:

bash
cp .env.example .env
Update .env with your information:

env
PORT=8080
USER_EMAIL=your.email@example.com
USER_NAME=Your Full Name
USER_STACK=Node.js/Express
Running Locally
Development mode (with auto-reload):

bash
npm run dev
Production mode:

bash
npm start
The API will be available at http://localhost:8080

API Endpoints
GET /me
Returns profile information with a cat fact.

Response:

json
{
  "status": "success",
  "user": {
    "email": "your.email@example.com",
    "name": "Your Full Name",
    "stack": "Node.js/Express",
        },
  "timestamp": "2024-01-15T10:30:00.000Z",
  "fact": "Cats can jump up to 6 times their length."
  }

GET /health
Health check endpoint.

Testing
Run tests:

bash
npm test

Project Structure
text
profile-api/
├── server.js          # Main application file
├── package.json       # Dependencies and scripts
├── .env              # Environment variables
├── tests/            # Test files
└── README.md         # Project documentation