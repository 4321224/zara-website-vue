##API-DOCS :
server : "https://secret-inlet-82197.herokuapp.com"

## Endpoints :

List of available endpoints :

- `POST /pub/register`
- `POST /pub/login`
- `POST/pub/login-google`
- `GET /pub/products`
- `GET /pub/products/:id`

And routes below need anthorization and authentication :

- `POST/pub/wishlist/:id`
- `GET /pub/wishlist`

## 1. POST /pub/register

Description
register as a new user

Request:

- body:

```json
{
"username":STRING,
"email": STRING,
"password": STRING,
"phoneNumber":INTEGER,
"address":STRING
}
```

_Response(201 - Created)_

```json
{
  "statusCode": "integer",
  "message": "Register success"
}
```

_Response (400 - Bad Request)_

```json
{
"message": "Email is required"
}
OR
{
"message": "Username is required"
}
OR
{
"message": "Invalid email format"
}
OR
{
"message": "Email must be unique"
}
OR
{
"message": "Password is required"
}
```

## 2. POST /pub/register

Description
Sign in as a user
Request:

- body:

```json
{
"email": STRING,
"password": STRING,
}
```

_Response(200 - OK)_

```json
{
"statusCode": INTEGER,
"accessToken": STRING,
"username": STRING,
"email": STRING,
"role": "Customer",
"message": STRING,

}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Email or Password"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "User Not Found"
}
```

## 3 POST /pub/login-google`

Description
Sign in as a user by google
Request:

- headers:

```json
{
"google_token": STRING
}
```

_Response(200 - OK)_

```json
{
"accessToken": STRING,
"user": {
"id": INTEGER,
"username": STRING,
"role": "Customer",
"createdAt": DATE,
"updatedAt": DATE
}
}
```

## 4 GET /pub/products

Description
Get all the data product
_Response(200 - OK)_

```json
{
    "statusCode": Integer,
"data":[
{
"id": Integer,
"name": String,
"description": Text,
"price": Integer,
"stock": Integer,
"imgUrl": String,
"authorId": Integer,
"categoryId": Integer,
"createdAt": Date,
"updatedAt": Date,
"User": Obj,
"Category": Obj
},
...
],
"totalPages":Integer,
}
```

## 5. GET /pub/products/:id

Description
Get one product data
_Response(200 - OK)_

```json
{
"id": Integer,
"name": String,
"description": Text,
"price": Integer,
"stock": Integer,
"imgUrl": String,
"authorId": Integer,
"categoryId": Integer,
"createdAt": Date,
"updatedAt": Date,
"User": Obj,
"Category": Obj

}
```

_401 - Unauthorized_

```json
{
  "message": "Invalid Token"
}
```

_404 - Not Found_

```json
{
  "message": "Product not found"
}
```

## 6. POST /pub/wishlist

Description
Added new data to wishlist
Request:

- headers:

```json
{
"access_token": STRING
}
```

_Response(201 - Created)_

```json
{
    "code": Integer,
        "data": String,
        "dataProduct": object,
"message": "success add to my list"
}
```

_401 - Unauthorized_

```json
{
  "message": "Invalid Token"
}
```

_404 - Not Found_

```json
{
  "message": "Product Not Found"
}
```

## 7. GET /pub/wishlist

Description
Show all data from wishlist user
Request:

- headers:

```json
{
"access_token": STRING
}
```

_Response(200 - OK)_

```json
[
{
"id": Integer,
"productId": Integer,
"authorId": Integer,
"createdAt": Date,
"updatedAt": Date,
"Product": Obj,


},
...
]
```

_401 - Unauthorized_

```json
{
  "message": "Invalid Token"
}
```

## Global Error

_Response 500 - Internal Server Error_

```json
{
  "message": "Internal Server Error"
}
```
