# Backend - MERN E-commerce API

This is the backend server for the MERN E-commerce application.  
It provides REST APIs for authentication, product management, cart, and orders.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Multer (for image upload)

## Project Structure

backend
│
├── db/models
├── middleware
├── public/img
├── routes
├── utils
└── server.js

## Installation

1. Install dependencies

npm install

2. Create .env file

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

3. Start server

npm start

Server runs at:

http://localhost:5000