# BantuCerdas-API
 

# How To Use
Follow the instructions below to use the API effectively.

- Local Host: Run with Postman, local IP and Port:3000 `http://127.0.0.1:5000` or `http://localhost:5000`
- Online Domain (testing) : not deployed yet

# API Endpoint
## Auth

### [POST] Sign Up
- URL: `http://localhost:5000/api/v1/app/register`

Request Body: 
```
curl --location 'http://localhost:5000/api/v1/app/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": {{name}},
    "phoneNumber": {{phoneNumber}},
    "email": {{email}},
    "password": {{password}},

}'
```

Response Success:
```
{
    "code": 200,
    "error": false,
    "message": "Register success, you can login now",
    "data": {
        "uid": "O0vCqcqXXXXXXXtkHrR4aT2",
        "email": "zeenXXX@gmail.com",
        "name": "Muhammad Razin Syakib",
        "phoneNumber": "+628163XXXXXXX",
    }
}
```

Response Error if email already exist:
```
{
    "code": 400,
    "error": true,
    "message": "The email address is already in use by another account."
}
```

Response Error if phone number already use:
```
{
    "code": 400,
    "error": true,
    "message": "The user with the provided phone number already exists."
}
```

### [POST] Sign In and Get Id Token
- URL: `http://localhost:5000/api/v1/app/login`

Request Body: 
```
curl --location 'http://localhost:5000/api/v1/app/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": {{email}},
    "password": {{password}}
}'
```

Response Success:
```
{
    "code": 200,
    "error": false,
    "message": "Login success",
    "data": {
        "uid": "O0vCqcqXXXXXXXtkHrR4aT2",
        "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImQxNjg5N......PIB4uXejJP929ttJowCJAEExQvs4u88BJUO-BeVPAAv2U-tRxFLMI6RFA",
        "email": "zeen@gmail.com"
    }
}
```

## User
### [GET] Get User Data
- URL: `http://localhost:5000/api/v1/app/user/account/:id`

Request Body: 
```
curl --location 'http://localhost:5000/api/v1/app/user/account/{{uid}}'
```

Response Success:
```
{
    "code": 200,
    "error": false,
    "message": "Success get user data",
    "data": {
        "id": "O0vCqcqXXXXXXXtkHrR4aT2",
        "name": "Muhammad Razin Syakib",
        "email": "zeenXXX@gmail.com",
        "phoneNumber": "+628163XXXXXXX",
        "photoProfile": "https://firebasestorage.googleapis.com/v0/b/bantucerdasxxx.appspot.com/o/170261XXXXXXX.jpg",
        "gender": "MALE",
        "birthDate": "2001-12-02T00:00:00.000Z",
        "status": "REGISTERED",
        "createdAt": "2024-01-08T03:55:55.000Z",
        "updatedAt": "2024-01-08T03:56:21.000Z"
    }
}
```

Response Error if user not found:
```
{
    "code": 404,
    "error": true,
    "message": "User not found"
}
```

### [PUT] Update User Data for User Profile after Login
- URL: `http://localhost:5000/api/v1/app/user/account/:id`

Request Body: 
``` 
curl --location --request PUT 'http://localhost:5000/api/v1/app/user/account/{{uid}}' \
--header 'Content-Type: application/json' \
--data '{
    "name": {{name}},
    "phoneNumber": {{phoneNumber}},
    "photoProfile": {{photoURL}},
    "gender": {{MALE/FEMALE}},
    "birthDate": {{birthDate}}
}'
```

Response Success:
```
{
    "code": 200,
    "error": false,
    "message": "Success update user data"
}
```

### [DEL] Delete User Account and The Data
- URL: `http://localhost:5000/api/v1/app/user/account/:id`

Request Body: 
```
curl --location --request DELETE 'http://localhost:5000/api/v1/app/user/account/{{uid}}'
```

Response Success:
```
{
    "code": 200,
    "error": false,
    "message": "Success delete user account and data"
}
```

[**@2024 BantuCerdas**]