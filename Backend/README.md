# Users API Documentation

## Endpoint
**POST** `/users/register`

## Description
Registers a new user account by validating input data, hashing the password, and creating a new user document in the database.

## HTTP Method
`POST`

## Required Data
- `fullname`: Object containing:
  - `firstname`: String (minimum 3 characters, required)
  - `lastname`: String (optional, minimum 3 characters if provided)
- `email`: String (must be a valid email and at least 5 characters)
- `password`: String (minimum 6 characters)

## Response Status Codes
- **201 Created:** Registration successful. Returns a JSON object with a token and user details.
- **400 Bad Request:** Validation errors. Returns an array of error messages.
- **500 Internal Server Error:** Registration failed due to a server error.

## Example Response (201 Created)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "6456d0f7c0a4b248e8b3a9d1",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

---

## /users/login Endpoint

### Endpoint
**POST** `/users/login`

### Description
Authenticates an existing user by validating credentials. If the credentials are correct, a JSON Web Token and user details are returned.

### HTTP Method
`POST`

### Required Data
- `email`: String (must be a valid email)
- `password`: String (minimum 6 characters)

### Response Status Codes
- **200 OK:** Login successful. Returns a JSON object with a token and user details.
- **400 Bad Request:** Validation errors in the input data.
- **401 Unauthorized:** Invalid email or password.

### Example Response (200 OK)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "6456d0f7c0a4b248e8b3a9d1",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```