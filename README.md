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
    "name": "Muhammad Razin Syakib",
    "phoneNumber": "+6281638279493",
    "email": "zeen@gmail.com",
    "password": "akuganteng"

}'
```

Response Success:
```
{
    "code": 200,
    "error": false,
    "message": "Register success, you can login now",
    "data": {
        "uid": "b2FaDw2dAuJ3zHVxwM2nvp7hed9S",
        "email": "zeen@gmail.com",
        "name": "Muhammad Razin Syakib",
        "phoneNumber": "+6281638279493"
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
    "email": "zeen@gmail.com",
    "password": "akuganteng"
}'
```

Response Success:
```
{
    "code": 200,
    "error": false,
    "message": "Login success",
    "data": {
        "uid": "b2Fnvp7hzHVxwM2ed9SaDw2dAuJ3",
        "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImQxNjg5N......PIB4uXejJP929ttJowCJAEExQvs4u88BJUO-BeVPAAv2U-tRxFLMI6RFA",
        "email": "zeen@gmail.com"
    }
}
```