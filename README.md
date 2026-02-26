# Personal Site API

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="NestJS Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master?os=linux
[linux-url]: https://travis-ci.org/nestjs/nest

  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsors)-->

  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://nestjs.com" target="_blank"><img src="https://img.shields.io/badge/Built%20with-NestJS-%23FA7343.svg" alt="Built with NestJS"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsors)-->

 <p align="center">Personal Site API - Built with NestJS</p>
    <p align="center">
<a href="https://任任你我.github.io" target="_blank">Website</a>
</p>

## Table of Contents

- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
  - [Authentication](#authentication)
  - [Users](#users)
  - [Blogs](#blogs)
  - [Portfolios](#portfolios)
  - [Experiences](#experiences)
  - [Tags](#tags)
  - [Tech Stacks](#tech-stacks)
  - [Home](#home)

## Getting Started

See [docs/installing-and-running.md](docs/installing-and-running.md) for a quick start guide.

## API Documentation

Base URL: `https://api.yourdomain.com/v1`

> **Note**: Endpoints marked with 🔒 require authentication (Bearer Token).

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/auth/email/login` | Login with email and password | No |
| POST | `/auth/email/register` | Register a new user | No |
| POST | `/auth/email/confirm` | Confirm email address | No |
| POST | `/auth/email/confirm/new` | Resend confirmation email | No |
| POST | `/auth/forgot/password` | Request password reset | No |
| POST | `/auth/reset/password` | Reset password | No |
| GET | `/auth/me` | Get current user info | 🔒 |
| POST | `/auth/refresh` | Refresh access token | 🔒 |
| POST | `/auth/logout` | Logout user | 🔒 |
| PATCH | `/auth/me` | Update current user | 🔒 |
| DELETE | `/auth/me` | Delete current user | 🔒 |

#### Google Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/auth/google/login` | Login with Google | No |

#### Login Request Example

```json
POST /auth/email/login
{
  "email": "user@example.com",
  "password": "your-password"
}
```

#### Register Request Example

```json
POST /auth/email/register
{
  "email": "user@example.com",
  "password": "your-password",
  "firstName": "John",
  "lastName": "Doe"
}
```

---

### Users

> **Note**: User endpoints require **Admin** role.

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/users` | Create a new user | 🔒 (Admin) |
| GET | `/users` | Get all users (paginated) | 🔒 (Admin) |
| GET | `/users/:id` | Get user by ID | 🔒 (Admin) |
| PATCH | `/users/:id` | Update user | 🔒 (Admin) |
| DELETE | `/users/:id` | Delete user | 🔒 (Admin) |

#### Query Parameters (GET /users)

| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 10, max: 50) |
| filters | object | Filter options |
| sort | object | Sort options |

---

### Blogs

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/blogs` | Create a new blog | 🔒 |
| GET | `/blogs` | Get all blogs (paginated) | No |
| GET | `/blogs/:id` | Get blog by ID | No |
| PATCH | `/blogs/:id` | Update blog | 🔒 |
| DELETE | `/blogs/:id` | Delete blog | 🔒 |

#### Query Parameters (GET /blogs)

| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 10, max: 50) |

---

### Portfolios

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/portfolios` | Create a new portfolio | 🔒 |
| GET | `/portfolios` | Get all portfolios (paginated) | No |
| GET | `/portfolios/:id` | Get portfolio by ID | No |
| PATCH | `/portfolios/:id` | Update portfolio | 🔒 |
| DELETE | `/portfolios/:id` | Delete portfolio | 🔒 |

#### Query Parameters (GET /portfolios)

| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 10, max: 50) |

---

### Experiences

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/experiences` | Create a new experience | 🔒 |
| GET | `/experiences` | Get all experiences (paginated) | No |
| GET | `/experiences/:id` | Get experience by ID | No |
| PATCH | `/experiences/:id` | Update experience | 🔒 |
| DELETE | `/experiences/:id` | Delete experience | 🔒 |

#### Query Parameters (GET /experiences)

| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 10, max: 50) |

---

### Tags

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/tags` | Create a new tag | 🔒 |
| GET | `/tags` | Get all tags (paginated) | No |
| GET | `/tags/:id` | Get tag by ID | No |
| PATCH | `/tags/:id` | Update tag | 🔒 |
| DELETE | `/tags/:id` | Delete tag | 🔒 |

#### Query Parameters (GET /tags)

| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 10, max: 50) |

---

### Tech Stacks

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/tech-stacks` | Create a new tech stack | 🔒 |
| GET | `/tech-stacks` | Get all tech stacks (paginated) | No |
| GET | `/tech-stacks/:id` | Get tech stack by ID | No |
| PATCH | `/tech-stacks/:id` | Update tech stack | 🔒 |
| DELETE | `/tech-stacks/:id` | Delete tech stack | 🔒 |

#### Query Parameters (GET /tech-stacks)

| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 10, max: 50) |

---

### Home

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | Get application info | No |

---

## Authentication

This API uses JWT (JSON Web Token) for authentication. To access protected endpoints:

1. Login to get access and refresh tokens
2. Include the access token in the Authorization header:

```
Authorization: Bearer <your-access-token>
```

### Token Response Example

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenExpires": "2024-01-01T00:00:00.000Z",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

---

## Pagination

All list endpoints support pagination with the following response format:

```json
{
  "data": [...],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

---

## Error Responses

| Status Code | Description |
|-------------|-------------|
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid or missing token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error |

---
