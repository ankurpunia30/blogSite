Here's a sample `README.md` for your project. You can modify any sections as needed.

```markdown
# Blog API Project

## Table of Contents
- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [License](#license)

## Introduction
This project is a Blog API that allows users to register, log in, and manage blog posts. It features user authentication using JSON Web Tokens (JWT) and password hashing with bcrypt. The API provides a simple way to create, read, update, and delete blog content.

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs
- jsonwebtoken
- dotenv

## Features
- User registration and login
- Secure password storage (using bcrypt)
- JWT-based authentication
- CRUD operations for blog posts
- Middleware for protecting routes

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd blog-api
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add the following:
   ```
   TOKEN_KEY=your_secret_key
   ```
5. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### User Registration
- **POST** `/api/register`
  - Request Body:
    ```json
    {
      "username": "your_username",
      "email": "your_email@example.com",
      "password": "your_password"
    }
    ```

### User Login
- **POST** `/api/login`
  - Request Body:
    ```json
    {
      "email": "your_email@example.com",
      "password": "your_password"
    }
    ```

### Create Blog Post
- **POST** `/api/posts`
  - Request Body:
    ```json
    {
      "title": "Blog Post Title",
      "content": "Content of the blog post"
    }
    ```

### Get All Blog Posts
- **GET** `/api/posts`

### Update Blog Post
- **PUT** `/api/posts/:id`
  - Request Body:
    ```json
    {
      "title": "Updated Blog Post Title",
      "content": "Updated content of the blog post"
    }
    ```

### Delete Blog Post
- **DELETE** `/api/posts/:id`

## Testing
You can test the API using Postman or any other API testing tool. Ensure to include the `x-auth-token` header with the token received upon user login for protected routes.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

Feel free to adjust any sections, add more details about your project, or include specific instructions related to your implementation!