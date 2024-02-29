# Card-Status
## Overview
This project aims to provide a platform for managing card status information, such as pickup, delivery, exceptions, and returns. It is developed using Node.js and Express.js, interacting with a PostgreSQL database to store and retrieve card status data.
## Approach
## Technology Stack
- Node.js: Used as the runtime environment for server-side code execution.
- Express.js: Chosen as the web application framework for handling HTTP requests.
- PostgreSQL: Used as the database management system for storing card status data.
- Docker: Used for containerization, ensuring consistency across development and deployment environments.
## Key Components
- Express.js Server: Provides RESTful APIs for accessing and manipulating card status information.
- PostgreSQL Database: Stores card status data in a relational database format.
- Docker Containerization: Ensures portability and ease of deployment by packaging the application into a container.
## Why Node.js and Express.js?
## Node.js
- Asynchronous Programming: Node.js enables non-blocking, asynchronous programming, making it suitable for I/O-bound applications like web servers.
- Vibrant Ecosystem: Node.js has a rich ecosystem of packages and libraries available via npm, facilitating rapid development and scalability.
- JavaScript Everywhere: Using JavaScript on both the client and server sides reduces context switching and simplifies code sharing.
## Express.js
- Minimalistic and Flexible: Express.js provides a lightweight framework for building web applications with minimal overhead and maximum flexibility.
- Middleware Support: Express.js middleware allows for modular and extensible request processing, facilitating robust API development.
- Community Adoption: Express.js is widely adopted and well-documented, making it easy to find resources and support.
## PostgreSQL
- Relational Data Model: PostgreSQL offers a robust relational data model, suitable for structured data storage and complex queries.
- ACID Compliance: PostgreSQL ensures data integrity and consistency through ACID (Atomicity, Consistency, Isolation, Durability) compliance.
- Extensibility: PostgreSQL supports various data types, indexing options, and extension mechanisms, allowing for customized data management solutions.
## Possible Improvements
- Authentication and Authorization: Implement user authentication and authorization mechanisms to secure the APIs and restrict access to sensitive data.
- Input Validation: Implement input validation and sanitization to prevent injection attacks and ensure data integrity.
- Error Handling: Enhance error handling mechanisms to provide informative error messages and handle edge cases gracefully.
- Logging and Monitoring: Integrate logging and monitoring solutions to track application performance, identify bottlenecks, and troubleshoot issues.
- Optimization: Optimize database queries, API endpoints, and overall application performance to enhance scalability and responsiveness.
- Testing: Implement automated unit tests, integration tests, and end-to-end tests to ensure code quality, reliability, and maintainability.
## Architectural Decisions
- Monolithic Architecture: The project adopts a monolithic architecture due to its simplicity and ease of development. However, future scalability considerations may lead to the adoption of microservices architecture.
- Containerization with Docker: Docker is chosen for containerization to ensure consistent deployment environments and facilitate scalability and portability.
- Database Schema Design: The database schema is designed to efficiently store and retrieve card status information while ensuring data integrity and relational consistency.
# Getting Started
## Prerequisites
- Node.js and npm installed on your local machine
- Docker installed on your local machine (if running in a Docker container)
- Access to a PostgreSQL database (either locally or through a cloud provider)
## Installation
1. Clone the repository:
```https://github.com/Subhrajit-Dutta/Card-Status.git```
2. Install dependencies:
```npm install```
3. Create a .env file in the root directory and configure the following environment variables:
```
DATABASE_URL=your_postgresql_connection_string
PORT=3000
```
Replace your_postgresql_connection_string with your PostgreSQL database connection string.
## Running the Application
Start the application:
```npm start```
Access the application at [http://localhost:3000/get_card_status](http://localhost:3000/get_card_status).
