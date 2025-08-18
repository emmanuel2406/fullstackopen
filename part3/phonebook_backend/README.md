# Phonebook Backend

A simple Express.js backend for the Phonebook application.

## Features

- CRUD operations for phonebook entries
- CORS enabled for cross-origin requests
- Morgan logging middleware
- JSON API endpoints

## API Endpoints

- `GET /api/persons` - Get all persons
- `GET /api/persons/:id` - Get person by ID
- `POST /api/persons` - Create new person
- `DELETE /api/persons/:id` - Delete person by ID
- `GET /info` - Get phonebook info

## Local Development

```bash
npm install
npm run dev
```

## Deployment

This app is configured to use the PORT environment variable for deployment platforms like Render, Railway, or Heroku.

For deployment:
1. Push to GitHub
2. Connect to your hosting platform
3. Set build command: `npm install`
4. Set start command: `npm start`
