# BantuCerdas-API
 

# How To Use
Follow the instructions below to use the API effectively.

- Local Host: Run with Postman, local IP and Port:3000 `http://127.0.0.1:5000` or `http://localhost:5000`
- Online Domain (testing) : not deployed yet

# API Endpoint
## Auth

### [POST] Sign Up
- URL: `http://localhost:5000/api/v1/auth/app/register`

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
- URL: `http://localhost:5000/api/v1/auth/app/login`

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
### [GET] Get User Data (by User Id from decoded Id Token)
- URL: `http://localhost:5000/api/v1/user/app/account`

Request Body: 
```
curl --location 'http://localhost:5000/api/v1/user/app/account' \
--header 'Authorization: Bearer {{idToken}}'
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

### [PUT] Update User Data for User Profile after Login (by User Id from decoded Id Token)
- URL: `http://localhost:5000/api/v1/user/app/account`

Request Body: 
``` 
curl --location --request PUT 'http://localhost:5000/api/v1/user/app/account' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{idToken}}' \
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

### [DEL] Delete User Account and The Data (by User Id from decoded Id Token)
- URL: `http://localhost:5000/api/v1/user/app/account/`

Request Body: 
```
curl --location --request DELETE 'http://localhost:5000/api/v1/user/app/account/' \
--header 'Authorization: Bearer {{idToken}}'
```

Response Success:
```
{
    "code": 200,
    "error": false,
    "message": "Success delete user account and data"
}
```

## Campaign
### [POST] Create a new Campaign
- URL: `http://localhost:5000/api/v1/campaign/app/create`

Request Body: 
```
curl --location 'http://localhost:5000/api/v1/campaign/app/create' \
--header 'Content-Type: application/json' \
--data-raw '{
  "id_user": "3cVy77uErNWvPlmGf88gg12ASWU2",
  "title": "Bantu Sekolah SD Negeri XYZ",
  "description": "Kampanye untuk mengumpulkan donasi seragam sekolah bagi murid-murid SD Negeri XYZ.",
  "champaign_photo": "https://storage.googleapis.com/campaign.jpg",
  "target_items": 300,
  "target_money": 1,
  "current_items": 40,
  "current_money": 1,
  "start_date": "2024-01-01",
  "end_date": "2024-02-01",
  "donation_type": "ITEM",
  "permission_letter": "https://storage.googleapis.com/permission.pdf",
  "inisiator_name": "Muhammad Sumbul",
  "inisiator_phone": "08123456789",
  "inisiator_job": "Guru",
  "inisiator_workplace": "SD Negeri XYZ",
  "inisiator_sosmed": "https://twitter.com/sumbul",
  "receiver_name": "SD Negeri XYZ",
  "receiver_address": "Jl. Pendidikan No. 123, Kota ABC",
  "receiver_photo": "https://storage.googleapis.com/school.jpg",
  "receiver_phone": "087654321",
  "receiver_email": "info@sdnxyz.com",
  "receiver_people_count": 300
}
```

Response Success:
```
{
    "code": 200,
    "error": false,
    "message": "Your campaign created successfully, we will review it. Please wait"
}
```

### [GET] Get All Campaign Data by User ID
- URL: `http://localhost:5000/api/v1/campaign/app/all-data/:userId`

Request Body: 
```
curl --location 'http://localhost:5000/api/v1/campaign/app/all-data/mGf88gg123cVy77uErNWvPlASWU2'
```

Response Success:
```
{
    "code": 200,
    "error": false,
    "message": "Success get campaign data",
    "data": [
        {
            "id_champaign": "5a223deb-47dc-4a3c-afb1-10acbaeb6a41",
            "id_user": "mGf88gg123cVy77uErNWvPlASWU2",
            "title": "Donasi Seragam Sekolah SD Negeri XYZ",
            "description": "Kampanye untuk mengumpulkan donasi seragam sekolah bagi murid-murid SD Negeri XYZ.",
            .....
            "validation_status": "PENDING",
            "createdAt": "2024-01-08T20:54:40.000Z",
            "updatedAt": "2024-01-08T20:54:40.000Z"
        },
        {
            "id_champaign": "5d8f155b-9d8c-4a10-8b23-ba921d483d64",
            "id_user": "mGf88gg123cVy77uErNWvPlASWU2",
            "title": "Donasi Seragam Sekolah SD Negeri ABC",
            "description": "Kampanye untuk mengumpulkan donasi seragam sekolah bagi murid-murid SD Negeri ABC.",
            .....
            "validation_status": "PENDING",
            "createdAt": "2024-01-08T20:29:51.000Z",
            "updatedAt": "2024-01-08T20:51:29.000Z"
        },
        {
            "id_champaign": "ece6b635-9b29-44d4-a3d5-1ce078be211c",
            "id_user": "mGf88gg123cVy77uErNWvPlASWU2",
            "title": "Bantu Sekolah SD Negeri XYZ",
            "description": "Kampanye untuk mengumpulkan donasi seragam sekolah bagi murid-murid SD Negeri XYZ.",
            .....
            "validation_status": "PENDING",
            "createdAt": "2024-01-08T20:58:42.000Z",
            "updatedAt": "2024-01-08T20:58:42.000Z"
        }
    ]
}
```

### [GET] Get Campaign Data by Campaign ID
- URL: `http://localhost:5000/api/v1/campaign/app/detail/:campaignId`

Request Body: 
```
curl --location 'http://localhost:5000/api/v1/campaign/app/detail/ece6b635-9b29-44d4-a3d5-1ce078be211c'
```

Response Success:
```
{
    "code": 200,
    "error": false,
    "message": "Success get campaign data",
    "data": {
        "id_champaign": "ece6b635-9b29-44d4-a3d5-1ce078be211c",
        "id_user": "mGf88gg123cVy77uErNWvPlASWU2",
        "title": "Donasi Seragam Sekolah SD Negeri ABC",
        ...
        "status": "INACTIVE",
        "validation_status": "PENDING",
        "createdAt": "2024-01-08T20:58:42.000Z",
        "updatedAt": "2024-01-08T20:59:32.000Z"
    }
}
```

### [PUT] Update Campaign Data by Campaign ID
- URL: `http://localhost:5000/api/v1/campaign/app/update/:campaignId`

Request Body: 
```
curl --location --request PUT 'http://localhost:5000/api/v1/campaign/app/update/ece6b635-9b29-44d4-a3d5-1ce078be211c' \
--header 'Content-Type: application/json' \
--data-raw '{
  "id_user": "mGf88gg123cVy77uErNWvPlASWU2",
  "title": "Donasi Seragam Sekolah SD Negeri ABC",
    ...
  "target_items": 300,
  "target_money": 3000000,
  "current_items": 40,
  "current_money": 1000000,
    ...
  "receiver_email": "info@sdnabc.com",
  "receiver_people_count": 300
}
'
```

Response Success:
```
{
    "code": 200,
    "error": false,
    "message": "Success update campaign data"
}
```

[**@2024 BantuCerdas**]