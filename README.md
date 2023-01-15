# Assignment: CRUD API

## Description
Implemented simple CRUD API using in-memory database underneath.

## Getting started
- Install 18 LTS version of [Node.js](https://nodejs.org/en/)
- Clone the repository
  ```
      HTTPS:
      git clone https://github.com/rybakN/CRUD_API.git
      
      or SSH:
      git clone git@github.com:rybakN/CRUD_API.git
  ```

- Install dependencies from the folder CRUD_API
  ```
      npm install
  ```

- Starting the application
  - Development mode:
  ```
      npm run start:dev
  ```
  - Production mode:
  ```
      npm run start:prod
  ```
  - Multi core mode (horizontal scaling for application):
  ```
      npm run start:multi
  ```
- Default port for server **3000**. You can change the port in the **.env** file.

## Requests to CRUD_API

- **GET.** Get all users:
  ```
      URL: http://localhost:3000/api/users
  ```

- **GET.** Get user by ID:
  ```
      URL: http://localhost:3000/api/users/{userId}
  ```

- **POST.** Create new user:
  ```
      URL: http://localhost:3000/api/users
      Request body: 
      {
          id: string;
          username: string;
          age: number;
          hobbies: string[]
      }
  ```

- **PUT.** Upgrade new user:
  ```
      URL: http://localhost:3000/api/users/{userId}
      Request body: 
      {
          id: string;
          username: string;
          age: number;
          hobbies: string[]
      }
  ```

- **DELETE.** Delete user:
  ```
      URL: http://localhost:3000/api/users/{userId}
  ```

## Test Application
-Running tests:
  ```
      npm run test
  ```
