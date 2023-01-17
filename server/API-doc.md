##API-DOCS :
server : "https://secret-inlet-82197.herokuapp.com"

## Endpoints :

List of available endpoints :

- `POST /register`
- `POST /login`
- `POST/login-google`

And routes below need authentication :

- `GET /products`
- `POST/products`
- `GET /products/:id`
- `GET /categories`
- `POST/categories`
- `GET /categories/:id`
- `GET /history`

Routes below need authentication & authorization :

- `DELETE /products/:id`
- `DELETE /categories/:id`
- `PUT/products/:id`
- `PATCH/products/:id`

## 1. POST /register

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "string",
  "phoneNumber": "string",
  "address": "string"
}
```

_Response (201 - Created)_

```json
{
  "code": "integer",
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
  "message": "Invalid email format"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Password min 5"
}
```

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "code": "integer",
  "access_token": "string",
  "username": "string",
  "message": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

## 3. POST /login-google

Request:

- body:

```json
{
  "email": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "username": "string",
  "id": "integer",
  "role": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
```

_Response (404 - User not found)_

```json
{
  "message": "User not found"
}
```

## 4. GET /products

Description:

- Get all products from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    {
        "id": 10,
        "name": "LEATHER HEELED OVER-THE-KNEE BOOTS",
        "description": "Over-the-knee leather boots. Block heel. Square toe. Side zip fastening.AIRFIT®. Flexible technical latex foam insole, designed to offer greater comfort.",
        "price": 2999900,
        "stock": 10,
        "imgUrl": "https://static.zara.net/photos///2022/I/1/1/p/2007/010/700/2/w/750/2007010700_2_3_1.jpg?ts=1663762594615",
        "categoryId": 1,
        "authorId": 2,
        "createdAt": "2022-10-19T23:33:39.662Z",
        "updatedAt": "2022-10-19T23:33:39.662Z",
        "User": {
            "id": 2,
            "username": "airen",
            "email": "airen@gmail.com",
            "password": "$2a$06$jfvjv.PLatSAOMQkLJqCPudBP.Ee37AxjKP1Y3xqH/f6NswXjvZa6",
            "role": "user",
            "phoneNumber": "0827511531718",
            "address": "jakarta",
            "createdAt": "2022-10-19T23:33:39.637Z",
            "updatedAt": "2022-10-19T23:33:39.637Z"
        },
        "Category": {
            "id": 1,
            "name": "women",
            "createdAt": "2022-10-19T23:33:39.651Z",
            "updatedAt": "2022-10-19T23:33:39.651Z"
        }
    }
  },
  ...
]
```

## 5. POST/products

Description:

- Add to products to database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "name": "string",
  "description": "text",
  "price": "integer",
  "stock": "integer",
  "imgUrl": "text",
  "categoryId": "integer"
}
```

_Response (201 - Created)_

```json
{
  " message": "product name successfull added"
}
```

## 6. GET /products/:id

Description:

- Show current product by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 3,
    "name": "OTTOMAN BUTTON-UP DRESS",
    "description": "Dress with a round neck and long sleeves. Metallic button details on the front.",
    "price": 629900,
    "stock": 100,
    "imgUrl": "https://static.zara.net/photos///2022/I/0/1/p/0085/497/800/2/w/750/0085497800_1_1_1.jpg?ts=1665678157521",
    "categoryId": 1,
    "authorId": 1,
    "createdAt": "2022-10-19T23:33:39.662Z",
    "updatedAt": "2022-10-19T23:33:39.662Z",
    "User": {
      "id": 1,
      "username": "kareen",
      "email": "kareen@gmail.com",
      "password": "$2a$06$HTt1oeporbhr0XqfUW9aLOaQt9LgIdT4vtBL6ClQt/V6zIpbZkYIy",
      "role": "admin",
      "phoneNumber": "081436214326",
      "address": "jakarta",
      "createdAt": "2022-10-19T23:33:39.632Z",
      "updatedAt": "2022-10-19T23:33:39.632Z"
    },
    "Category": {
      "id": 1,
      "name": "women",
      "createdAt": "2022-10-19T23:33:39.651Z",
      "updatedAt": "2022-10-19T23:33:39.651Z"
    }
  }
]
```

## 7. GET /categories

Description:

- Get all categories from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[

    {
        "id": 1,
        "name": "women",
        "createdAt": "2022-10-19T23:33:39.651Z",
        "updatedAt": "2022-10-19T23:33:39.651Z"
    },
  ...
]
```

## 8. POST/categories

Description:

- Add to categories to database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "name": "string"
}
```

_Response (201 - Created)_

```json
{
  " message": "category created successfully"
}
```

## 9. GET /categories/:id

Description:

- Show current product by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "name": "women",
    "createdAt": "2022-10-19T23:33:39.651Z",
    "updatedAt": "2022-10-19T23:33:39.651Z"
  }
]
```

## 10. DELETE /products/:id

Description:

- Delete user products list by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "Product name successfull to delete"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Cannot delete this product"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

## 11. DELETE /categories/:id

Description:

- Delete user categories list by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "Product name successfull to delete"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Cannot delete this product"
}
```

## 12. PATCH / products/:id

Description:

- updated status product by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "product status"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
},
{
  "message": "id not found"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Unauthorized"
}
```

## 13. PUT/products/:id

Description:

- edit product by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "name": "string",
  "description": "text",
  "price": "integer",
  "stock": "integer",
  "imgUrl": "string",
  "categoryId": "string",
  "status": "string",
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "product with id ${req.params.id} can edited"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
},
{
  "message": "id not found"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Unauthorized"
}
```

## 14 GET/history
Description:

- Get all history from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[

    {
        "id": 30,
        "name": "test nih",
        "description": "product with id 14 inactive",
        "updateBy": "kareen",
        "createdAt": "2022-10-28T10:42:31.257Z",
        "updatedAt": "2022-10-28T10:42:31.257Z"
    },
  ...
]
```

## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
