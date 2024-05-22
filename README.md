# Voting Backend System

## Description
This project is a voting backend system built with Node.js and Express.js. It features two types of users: voters and admins, and allows for the creation of candidates for voting.

## Features

### Voter
- Voters can register with their unique Aadhar card number.
- Voters can log in using their Aadhar card number and password.
- Voters can vote for any candidate present in the database.
- Once a vote has been cast, the voter cannot vote again.

### Admin
- Admins cannot vote.
- Admins can add, delete, and modify candidate details.

## Security
- Passwords are hashed using bcrypt before being stored in the database.
- JWT tokens are used for secure login.

## Database
- MongoDB is used for data storage.

## Installation
Follow these steps to install and run the project locally:

1. Clone the repository:
    ```bash
    https://github.com/jhantu626/Voting-Application-Node.js.git
    ```
2. Navigate to the project directory:
    ```bash
    cd Voting-Application-Node.js
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Create a `.env` file in the root directory and add the following environment variables:
    ```makefile
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    PORT=your_port_number
    ```
5. Start the server:
    ```bash
    node server.js
    ```
