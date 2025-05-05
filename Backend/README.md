# Users API Documentation

## /users/register Endpoint

### Endpoint
**POST** `/users/register`

### Description
Registers a new user account by validating input data, hashing the password, and creating a new user document in the database.

### HTTP Method
`POST`

### Required Data
- `fullname`: Object containing:
  - `firstname`: String (minimum 3 characters, required)
  - `lastname`: String (optional, minimum 3 characters if provided)
- `email`: String (must be a valid email and at least 5 characters)
- `password`: String (minimum 6 characters)

### Response Status Codes
- **201 Created:** Registration successful. Returns a JSON object with a token and user details.
- **400 Bad Request:** Validation errors. Returns an array of error messages.
- **500 Internal Server Error:** Registration failed due to a server error.

### Example Response (201 Created)
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

---

## /users/profile Endpoint

### Endpoint
**GET** `/users/profile`

### Description
Returns the authenticated user's profile details. A valid authentication token must be provided either as a cookie or via the Authorization header.

### HTTP Method
`GET`

### Required Data
- Valid authentication token (cookie or header)

### Response Status Codes
- **200 OK:** Profile data is returned.
- **401 Unauthorized:** When the authentication token is missing or invalid.

### Example Response (200 OK)
```json
{
  "_id": "6456d0f7c0a4b248e8b3a9d1",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
}
```

---

## /users/logout Endpoint

### Endpoint
**GET** `/users/logout`

### Description
Logs out the user by clearing the authentication token cookie and blacklisting the token to prevent further use.

### HTTP Method
`GET`

### Required Data
- The user's authentication token should be provided via cookie or header.

### Response Status Codes
- **200 OK:** Returns a message confirming logout.
- **400 Bad Request:** If no token is provided.
- **500 Internal Server Error:** On server error.

### Example Response (200 OK)
```json
{
  "message": "Logged out successfully"
}
```

---

# Captains API Documentation

## /captain/register Endpoint

### Endpoint
**POST** `/captains/register`

### Description
Registers a new captain account by validating input data, hashing the password, and creating a new captain document in the database with associated vehicle details.

### HTTP Method
`POST`

### Required Data
- `fullname`: Object containing:
  - `firstname`: String (minimum 3 characters, required)
  - `lastname`: String (optional, minimum 3 characters if provided)
- `email`: String (must be a valid email)
- `password`: String (minimum 6 characters)
- `vehicle`: Object containing:
  - `color`: String (minimum 3 characters, required)
  - `plate`: String (minimum 3 characters, required)
  - `capacity`: Number (required)
  - `vehicleType`: String (must be one of the following: `car`, `motorcycle`, `auto`)

### Response Status Codes
- **201 Created:** Registration successful. Returns a JSON object with a token and captain details.
- **400 Bad Request:** Validation errors in the input data or missing required fields.
- **500 Internal Server Error:** Registration failed due to a server error.

### Example Response (201 Created)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "6456d0f7c0a4b248e8b3a9d1",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```