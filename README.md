# Task Manager API

A backend API for a Task Manager application, built with Node.js and Express.js.

## Description

This repository contains the backend service for a simple task management application. It provides RESTful API endpoints to perform CRUD (Create, Read, Update, Delete) operations on tasks.

## Features

- CRUD endpoints for tasks (Create, Read, Update, Delete)  
- Built using Express and JavaScript  
- Modular route structure (e.g., `/routes`, `app.js`)  
- Easy to extend (e.g., add authentication, database)  
- Perfect for building frontend apps on top: React, Vue, Angular, etc.

## Project Setup

### Prerequisites

* [Node.js](https://nodejs.org/) (v14 or newer recommended)
* npm (comes with Node.js)
* A database (e.g., MongoDB, PostgreSQL) and a `.env` file for connection strings (if applicable).

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/Sani-Mohibur/Task-Manager-API.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd Task-Manager-API
    ```
3.  **Install dependencies:**
    ```sh
    npm install
    ```
4.  **Environment Variables:**
    Create a `.env` file in the root of the project and add any necessary environment variables (like database connection strings or port).
    ```
    PORT=3000
    MONGO_URI=your_database_connection_string_here
    ```

### Running the Application

* **Development Mode (with nodemon):**
    ```sh
    npm run dev
    ```
* **Production Mode:**
    ```sh
    npm start
    ```
The server will start running on the port specified in your `.env` file or on a default port (e.g., 3000).
