# Todo Summary Assistant

A full-stack application for managing todos, generating summaries with AI, and sending them to Slack.

## Features

- Add, view, and delete todos
- Generate meaningful summaries of pending todos using OpenAI
- Send summaries to Slack channel

## Tech Stack

- Frontend: React
- Backend: Node.js/Express
- Database: Supabase (PostgreSQL)
- AI: OpenAI API
- Notifications: Slack Webhooks

## Setup

### Prerequisites

- Node.js
- npm/yarn
- Supabase account
- OpenAI API key
- Slack workspace with webhook permissions

 ### Installation

1. Clone the repository
2. Set up backend:
   - `cd backend`
   - `npm install`
   - Create `.env` file based on `.env.example`
3. Set up frontend:
   - `cd frontend`
   - `npm install`
   - Create `.env` file based on `.env.example`
4. Start backend: `npm start`
5. Start frontend: `npm start`

### Configuration

#### OpenAI
1. Get API key from https://platform.openai.com/
2. Add to backend `.env` as `OPENAI_API_KEY`

#### Slack
1. Create incoming webhook at https://api.slack.com/apps
2. Add webhook URL to backend `.env` as `SLACK_WEBHOOK_URL`

#### Supabase
1. Create new project in Supabase
2. Create `todos` table with required columns
3. Add connection string to backend `.env` as `MONGODB_URI`

## Deployment

Backend:
Deploy to Heroku, Render, or similar service
Set environment variables in the hosting platform

Frontend:
Deploy to Vercel, Netlify, or Firebase Hosting
Set the REACT_APP_API_URL to your deployed backend URL
Update the connection string in your backend .env

Database:

Use Supabase's free tier for PostgreSQL
This solution provides a complete implementation of the Todo Summary Assistant with all required features. The architecture is clean and modular, making it easy to maintain and extend. The application handles all the core requirements:

Todo management (CRUD operations)
OpenAI integration for meaningful summarization
Slack notifications
Proper error handling and user feedback
Environment configuration for security
