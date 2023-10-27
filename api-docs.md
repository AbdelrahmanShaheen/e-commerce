<details>
<summary>Table of content</summary>

- [API Endpoints](#api-endpoints)
  - [for category](#for-category)
  - [for subCategories](#for-subcategories)
  - [for brand](#for-brand)
  - [for product](#for-product)
  - [for user](#for-user)
  - [for logged users](#for-logged-users)
  - [for Authentication](#for-authentication)
- [API Documentation](#api-documentation)
  - [Category Resource](#category-resource)
  - [SubCategory Resource](#subcategory-resource)
  - [Brand Resource](#brand-resource)
  - [Product Resource](#product-resource)
  - [User Resource](#user-resource)
  - [Auth Resource](#auth-resource)
  </details>

## API Endpoints

#### for category

| Methods  | Endpoints                | Access                   | Description               |
| :------- | :----------------------- | :----------------------- | :------------------------ |
| `POST`   | `/api/v1/categories`     | `Private[Admin-Manager]` | `Create category`         |
| `GET`    | `/api/v1/categories`     | `public`                 | `Get list of categories`  |
| `GET`    | `/api/v1/categories/:id` | `Public`                 | `Get a specific category` |
| `PUT`    | `/api/v1/categories/:id` | `private[Admin-Manager]` | `Update category`         |
| `DELETE` | `/api/v1/categories/:id` | `Private[Admin]`         | `Delete category`         |

#### for subCategories

| Methods  | Endpoints                                      | Access                   | Description                                               |
| :------- | :--------------------------------------------- | :----------------------- | :-------------------------------------------------------- |
| `POST`   | `/api/v1/categories/:categoryId/subCategories` | `Private[Admin-Manager]` | `Create subCategory for specific category`                |
| `GET`    | `/api/v1/subCategories`                        | `public`                 | `Get list of subCategories`                               |
| `GET`    | `/api/v1/categories/:categoryId/subCategories` | `Public`                 | `Get list of subCategories belong to a specific category` |
| `GET`    | `/api/v1/subCategories/:id`                    | `Public`                 | `Get a specific subCategory`                              |
| `PUT`    | `/api/v1/subCategories/:id`                    | `private[Admin-Manager]` | `Update a specific subCategory`                           |
| `DELETE` | `/api/v1/subCategories/:id`                    | `Private[Admin]`         | `Delete a specific subCategory`                           |

#### for brand

| Methods  | Endpoints            | Access                   | Description            |
| :------- | :------------------- | :----------------------- | :--------------------- |
| `POST`   | `/api/v1/brands`     | `Private[Admin-Manager]` | `Create brand`         |
| `GET`    | `/api/v1/brands`     | `public`                 | `Get list of brands`   |
| `GET`    | `/api/v1/brands/:id` | `Public`                 | `Get a specific brand` |
| `PUT`    | `/api/v1/brands/:id` | `private[Admin-Manager]` | `Update brand`         |
| `DELETE` | `/api/v1/brands/:id` | `Private[Admin]`         | `Delete brand`         |

#### for product

| Methods  | Endpoints              | Access                   | Description              |
| :------- | :--------------------- | :----------------------- | :----------------------- |
| `POST`   | `/api/v1/products`     | `Private[Admin-Manager]` | `Create product`         |
| `GET`    | `/api/v1/products`     | `public`                 | `Get list of products`   |
| `GET`    | `/api/v1/products/:id` | `Public`                 | `Get a specific product` |
| `PUT`    | `/api/v1/products/:id` | `private[Admin-Manager]` | `Update product`         |
| `DELETE` | `/api/v1/products/:id` | `Private[Admin]`         | `Delete product`         |

#### for user

| Methods  | Endpoints                          | Access                   | Description            |
| :------- | :--------------------------------- | :----------------------- | :--------------------- |
| `POST`   | `/api/v1/users`                    | `Private[Admin]`         | `Create user`          |
| `GET`    | `/api/v1/users`                    | `private[Admin-Manager]` | `Get list of users`    |
| `GET`    | `/api/v1/users/:id`                | `Private[Admin]`         | `Get a specific user`  |
| `PUT`    | `/api/v1/users/:id`                | `private[Admin-Manager]` | `Update user`          |
| `PUT`    | `/api/v1/users/changePassword/:id` | `private[Admin]`         | `Update user password` |
| `DELETE` | `/api/v1/users/:id`                | `Private[Admin]`         | `Delete user`          |

#### for logged users

| Methods  | Endpoints                        | Access                  | Description                                    |
| :------- | :------------------------------- | :---------------------- | :--------------------------------------------- |
| `GET`    | `/api/v1/users/getMe`            | `Private&Authenticated` | `Get Logged user data`                         |
| `PUT`    | `/api/v1/users/updateMe`         | `Private&Authenticated` | `Update logged user data (name, email, phone)` |
| `PUT`    | `/api/v1/users/changeMyPassword` | `Private&Authenticated` | `Update logged user password`                  |
| `DELETE` | `/api/v1/users/deleteMe`         | `Private&Authenticated` | `Deactivate logged user`                       |

#### for Authentication

| Methods | Endpoints                   | Access   | Description                  |
| :------ | :-------------------------- | :------- | :--------------------------- |
| `POST`  | `/api/auth/signup`          | `Public` | `User signup`                |
| `POST`  | `/api/auth/login`           | `Public` | `User login`                 |
| `POST`  | `/api/auth/forgotPassword`  | `Public` | `Forgot password`            |
| `POST`  | `/api/auth/verifyResetCode` | `Public` | `Verify password reset code` |
| `PUT`   | `/api/auth/resetPassword`   | `Public` | `Reset password`             |

## API Documentation

Server URL

```
https://e-shop-lwy3.onrender.com
```

Note: put the server url before each route.
ex:

```http
https://e-shop-lwy3.onrender.com/api/auth/login
```

### Category Resource

<details>
<summary>
Create category
</summary>

```http
  POST /api/v1/categories
```

Note: when you send the body to the server convert it to JSON format.
| Body | Type | Description | Constraint |
| :--------- | :------- | :--------------------------------- |:--------- |
| `name` | `string` | name of the category |**Required** & **Unique** & **minLength:3** & **maxLength:32** |
| `image` | `buffer` | category image | **Not Required**|

| Headers           | Type           | Description                            |
| :---------------- | :------------- | :------------------------------------- |
| `"Authorization"` | `Bearer Token` | **Required**.Bearer token of auth user |

- Responses :

1- status code `201` with these data

```json
{
  "data": {
    "name": "clothes",
    "slug": "clothes",
    "_id": "653ad9555e643cbba89bb9ea",
    "image": "https://e-shop-lwy3.onrender.com/categories/category-718171ac-f3de-47e0-b6ee-c46c138f75f7-1698361700650.jpeg",
    "createdAt": "2023-10-26T21:25:41.391Z",
    "updatedAt": "2023-10-26T21:25:41.391Z",
    "__v": 0
  }
}
```

2- If you enter invalid data in the body or in the header ,a descriptive error message will be sent.

</details>

<details>
<summary>
Get list of categories
</summary>

```http
  GET /api/v1/categories
```

| Query                       | Endpoint                                        | Description                                                                        |
| :-------------------------- | :---------------------------------------------- | :--------------------------------------------------------------------------------- |
| ``                          | `/api/v1/categories`                            | get all categories with default 50 categories in each page                         |
| `limit & page (pagination)` | `/api/v1/categories?limit=3&page=2`             | get the second page ,each page with 3 categories                                   |
| `fields`                    | `/api/v1/categories?fields=name,-_id,createdAt` | limit fields in the response (put '-' before a field to exclude it)                |
| `keyword`                   | `/api/v1/categories?keyword=clothes`            | search for categories that their name contains 'clothes' keyword                   |
| `sortBy`                    | `/api/v1/categories?sortBy=-createdAt`          | sort the response by createdAt field in desc order (for asc remove '-' or add '+') |

- note: you can make your combination of these queryString

- Responses :

1- status code `200` with these data

```json
{
  "results": 4,
  "paginationResult": {
    "currentPage": 1,
    "limit": 4,
    "numberOfPages": 6,
    "next": 2
  },
  "data": [
    {
      "_id": "653afc3b0209d76634e49210",
      "name": "food",
      "slug": "food",
      "image": "https://e-shop-lwy3.onrender.com/categories/category-033f4960-1dbe-448d-858f-e55883ff2be7-1698364474956.jpeg",
      "createdAt": "2023-10-26T23:54:35.338Z",
      "updatedAt": "2023-10-26T23:54:35.338Z"
    },
    {
      "_id": "653afbc10209d76634e4920d",
      "name": "Drinks",
      "slug": "drinks",
      "image": "https://e-shop-lwy3.onrender.com/categories/category-d886db87-d722-444c-946d-752e28f5825c-1698364352833.jpeg",
      "createdAt": "2023-10-26T23:52:33.507Z",
      "updatedAt": "2023-10-26T23:52:33.507Z"
    },
    {
      "_id": "653af16964e5db146a63f9a0",
      "name": "sprots",
      "slug": "sprots",
      "image": "https://e-shop-lwy3.onrender.com/categories/category-718171ac-f3de-47e0-b6ee-c46c138f75f7-1698361700650.jpeg",
      "createdAt": "2023-10-26T23:08:26.028Z",
      "updatedAt": "2023-10-26T23:08:26.028Z"
    },
    {
      "_id": "653ad9555e643cbba89bb9ea",
      "name": "clothes",
      "slug": "clothes",
      "createdAt": "2023-10-26T21:25:41.391Z",
      "updatedAt": "2023-10-26T21:25:41.391Z"
    }
  ]
}
```

2- If you enter invalid data in the body or in the header ,a descriptive error message will be sent.

</details>

<details>
<summary>
Get a specific category
</summary>

```http
  GET /api/v1/categories/:id
```

| Params | Endpoint                 | Description               |
| :----- | :----------------------- | :------------------------ |
| `id`   | `/api/v1/categories/:id` | id of a specific category |

- Responses :

1- status code `200` with the category data

```json
{
  "data": {
    "_id": "653ad9555e643cbba89bb9ea",
    "name": "clothes",
    "slug": "clothes",
    "createdAt": "2023-10-26T21:25:41.391Z",
    "updatedAt": "2023-10-26T21:25:41.391Z",
    "__v": 0
  }
}
```

2- If you enter invalid data in the body or in the header ,a descriptive error message will be sent.

</details>

<details>
<summary>
Update a category
</summary>

```http
  PUT /api/v1/categories/:id
```

Note: when you send the body to the server convert it to JSON format.
| Body | Type | Description | Constraint |
| :--------- | :------- | :--------------------------------- |:--------- |
| `name` | `string` | name of the category |**Optional** & **Unique** & **minLength:3** & **maxLength:32** |
| `image` | `buffer` | category image | **Optional**|

| Params | Endpoint                 | Description               |
| :----- | :----------------------- | :------------------------ |
| `id`   | `/api/v1/categories/:id` | id of a specific category |

choose the fields you want to update

| Headers           | Type           | Description                            |
| :---------------- | :------------- | :------------------------------------- |
| `"Authorization"` | `Bearer Token` | **Required**.Bearer token of auth user |

- Responses :

1- status code `200` with these data

```json
{
  "data": {
    "_id": "653ad9555e643cbba89bb9ea",
    "name": "Big Clothes",
    "slug": "big-clothes",
    "createdAt": "2023-10-26T21:25:41.391Z",
    "updatedAt": "2023-10-27T00:22:29.654Z",
    "__v": 0
  }
}
```

2- If you enter invalid data in the body or in the header ,a descriptive error message will be sent.

</details>

<details>
<summary>
Delete a category
</summary>

```http
  DELETE /api/v1/categories/:id
```

| Params | Endpoint                 | Description               |
| :----- | :----------------------- | :------------------------ |
| `id`   | `/api/v1/categories/:id` | id of a specific category |

| Headers           | Type           | Description                            |
| :---------------- | :------------- | :------------------------------------- |
| `"Authorization"` | `Bearer Token` | **Required**.Bearer token of auth user |

- Responses :

1- status code `204` with no json data

2- If you enter invalid id in the body or in the header ,a descriptive error message will be sent.

</details>

### SubCategory Resource

<details>
<summary>
Create subCategory for specific category
</summary>

```http
  POST /api/v1/categories/:categoryId/subCategories
```

Note: when you send the body to the server convert it to JSON format.
| Body | Type | Description | Constraint |
| :--------- | :------- | :--------------------------------- |:--------- |
| `name` | `string` | name of the category |**Required** & **Unique** & **minLength:2** & **maxLength:32** |
| `category` | `ObjectId` | category id | **Required** & **Valid mongoose ObjectId** & **Category with this id exists**|

| Params       | Endpoint                                            | Description               |
| :----------- | :-------------------------------------------------- | :------------------------ |
| `categoryId` | `POST /api/v1/categories/:categoryId/subCategories` | id of a specific category |
|              |

| Headers           | Type           | Description                            |
| :---------------- | :------------- | :------------------------------------- |
| `"Authorization"` | `Bearer Token` | **Required**.Bearer token of auth user |

- Responses :

1- status code `201` with these data

```json
{
  "data": {
    "name": "women clothes",
    "slug": "women-clothes",
    "category": "653ad9555e643cbba89bb9ea",
    "_id": "653b0539acfa4a3b1057647f",
    "createdAt": "2023-10-27T00:32:57.329Z",
    "updatedAt": "2023-10-27T00:32:57.329Z",
    "__v": 0
  }
}
```

2- If you enter invalid data in the body or in the header ,a descriptive error message will be sent.

</details>

<details>
<summary>
  Get list of subCategories
</summary>

```http
  GET /api/v1/subCategories
```

| Query                       | Endpoint                                           | Description                                                                        |
| :-------------------------- | :------------------------------------------------- | :--------------------------------------------------------------------------------- |
| ``                          | `/api/v1/subCategories`                            | get all subCategories with default 50 subCategories in each page                   |
| `limit & page (pagination)` | `/api/v1/subCategories?limit=3&page=2`             | get the second page ,each page with 3 subCategories                                |
| `fields`                    | `/api/v1/subCategories?fields=name,-_id,createdAt` | limit fields in the response (put '-' before a field to exclude it)                |
| `keyword`                   | `/api/v1/subCategories?keyword=men clothes`        | search for subCategories that their name contains 'men clothes' keyword            |
| `sortBy`                    | `/api/v1/subCategories?sortBy=-createdAt`          | sort the response by createdAt field in desc order (for asc remove '-' or add '+') |

- note: you can make your combination of these queryString

- Responses :

1- status code `200` with these data

```json
{
  "results": 3,
  "paginationResult": {
    "currentPage": 1,
    "limit": 3,
    "numberOfPages": 4,
    "next": 2
  },
  "data": [
    {
      "_id": "652d99238047f4095f4980ba",
      "name": "tables",
      "slug": "tables",
      "category": {
        "name": "wood"
      },
      "createdAt": "2023-10-16T20:12:19.706Z",
      "updatedAt": "2023-10-17T17:52:01.366Z"
    },
    {
      "_id": "652ec376603a31c8ce5f6e43",
      "name": "chairs",
      "slug": "chairs",
      "category": {
        "name": "wood"
      },
      "createdAt": "2023-10-17T17:25:10.149Z",
      "updatedAt": "2023-10-17T17:25:10.149Z"
    },
    {
      "_id": "652ec39b603a31c8ce5f6e48",
      "name": "hd",
      "slug": "hd",
      "category": {
        "name": "electronics"
      },
      "createdAt": "2023-10-17T17:25:47.428Z",
      "updatedAt": "2023-10-17T17:25:47.428Z"
    }
  ]
}
```

2- If you enter invalid data in the body or in the header ,a descriptive error message will be sent.

</details>

<details>
<summary>
  Get list of subCategories belong to a specific category
</summary>

```http
  GET /api/v1/categories/:categoryId/subCategories
```

| Query                       | Endpoint                                                                  | Description                                                                        |
| :-------------------------- | :------------------------------------------------------------------------ | :--------------------------------------------------------------------------------- |
| ``                          | `/api/v1/categories/:categoryId/subCategories`                            | get all subCategories with default 50 subCategories in each page                   |
| `limit & page (pagination)` | `/api/v1/categories/:categoryId/subCategories?limit=3&page=2`             | get the second page ,each page with 3 subCategories                                |
| `fields`                    | `/api/v1/categories/:categoryId/subCategories?fields=name,-_id,createdAt` | limit fields in the response (put '-' before a field to exclude it)                |
| `keyword`                   | `/api/v1/categories/:categoryId/subCategories?keyword=men clothes`        | search for subCategories that their name contains 'men clothes' keyword            |
| `sortBy`                    | `/api/v1/categories/:categoryId/subCategories?sortBy=-createdAt`          | sort the response by createdAt field in desc order (for asc remove '-' or add '+') |

- note: you can make your combination of these queryString

| Params       | Endpoint                                           | Description               |
| :----------- | :------------------------------------------------- | :------------------------ |
| `categoryId` | `GET /api/v1/categories/:categoryId/subCategories` | id of a specific category |
|              |

- Responses :

1- status code `200` with these data

```json
{
  "results": 2,
  "paginationResult": {
    "currentPage": 1,
    "limit": 50,
    "numberOfPages": 1
  },
  "data": [
    {
      "_id": "653b04f3acfa4a3b10576477",
      "name": "men clothes",
      "slug": "men-clothes",
      "category": {
        "name": "Big Clothes"
      },
      "createdAt": "2023-10-27T00:31:47.447Z",
      "updatedAt": "2023-10-27T00:31:47.447Z"
    },
    {
      "_id": "653b0539acfa4a3b1057647f",
      "name": "women clothes",
      "slug": "women-clothes",
      "category": {
        "name": "Big Clothes"
      },
      "createdAt": "2023-10-27T00:32:57.329Z",
      "updatedAt": "2023-10-27T00:32:57.329Z"
    }
  ]
}
```

2- If you enter invalid data in the body or in the header ,a descriptive error message will be sent.

</details>

<details>
<summary>
Get a specific subCategory
</summary>

```http
  GET /api/v1/subCategories/:id
```

| Params | Endpoint                    | Description    |
| :----- | :-------------------------- | :------------- |
| `id`   | `/api/v1/subCategories/:id` | subCategory id |

- Responses :

1- status code `200` with the these data

```json
{
  "data": {
    "_id": "653b04f3acfa4a3b10576477",
    "name": "men clothes",
    "slug": "men-clothes",
    "category": {
      "name": "Big Clothes"
    },
    "createdAt": "2023-10-27T00:31:47.447Z",
    "updatedAt": "2023-10-27T00:31:47.447Z",
    "__v": 0
  }
}
```

2- If you enter invalid data in the body or in the header ,a descriptive error message will be sent.

</details>

<details>
<summary>
Update a subCategory
</summary>

```http
  PUT /api/v1/subCategories/:id
```

Note: when you send the body to the server convert it to JSON format.
| Body | Type | Description | Constraint |
| :--------- | :------- | :--------------------------------- |:--------- |
| `name` | `string` | name of the category |**Optional** & **Unique** & **minLength:3** & **maxLength:32** |
| `category` | `ObjectId` | subCategory id | **Optional** & **Valid mongoose ObjectId** & **Category with this id exists**|

choose the fields you want to update

| Params | Endpoint                    | Description    |
| :----- | :-------------------------- | :------------- |
| `id`   | `/api/v1/subCategories/:id` | subCategory id |

| Headers           | Type           | Description                            |
| :---------------- | :------------- | :------------------------------------- |
| `"Authorization"` | `Bearer Token` | **Required**.Bearer token of auth user |

- Responses :

1- status code `200` with these data

```json
{
  "data": {
    "_id": "653b04f3acfa4a3b10576477",
    "name": "mens cloth",
    "slug": "mens-cloth",
    "category": "653ad9555e643cbba89bb9ea",
    "createdAt": "2023-10-27T00:31:47.447Z",
    "updatedAt": "2023-10-27T01:35:37.105Z",
    "__v": 0
  }
}
```

2- If you enter invalid id in the body or in the header ,a descriptive error message will be sent.

</details>

<details>
<summary>
Delete a subCategory
</summary>

```http
  DELETE /api/v1/subCategories/:id
```

| Params | Endpoint                    | Description    |
| :----- | :-------------------------- | :------------- |
| `id`   | `/api/v1/subCategories/:id` | subCategory id |

| Headers           | Type           | Description                            |
| :---------------- | :------------- | :------------------------------------- |
| `"Authorization"` | `Bearer Token` | **Required**.Bearer token of auth user |

- Responses :

1- status code `204` with no json data

2- If you enter invalid id in the body or in the header ,a descriptive error message will be sent.

</details>

</details>

### Brand Resource

<details>
<summary>
Create brand
</summary>

```http
  POST /api/v1/brands
```

Note: when you send the body to the server convert it to JSON format.
| Body | Type | Description | Constraint |
| :--------- | :------- | :--------------------------------- |:--------- |
| `name` | `string` | name of the brand |**Required** & **Unique** & **minLength:3** & **maxLength:32** |
| `image` | `buffer` | brand image | **Not Required**|

| Headers           | Type           | Description                            |
| :---------------- | :------------- | :------------------------------------- |
| `"Authorization"` | `Bearer Token` | **Required**.Bearer token of auth user |

- Responses :

1- status code `201` with these data

```json
{
  "data": {
    "name": "Egypt foods",
    "slug": "egypt-foods",
    "image": "http://localhost:8000/brands/brand-a56a538a-cc04-4965-8186-c89b9617987c-1698372401264.jpeg",
    "_id": "653b1b31b7c6681407b5909b",
    "createdAt": "2023-10-27T02:06:41.302Z",
    "updatedAt": "2023-10-27T02:06:41.302Z",
    "__v": 0
  }
}
```

2- If you enter invalid data in the body or in the header ,a descriptive error message will be sent.

</details>

<details>
<summary>
Get list of brands
</summary>

```http
  GET /api/v1/brands
```

| Query                       | Endpoint                                    | Description                                                                        |
| :-------------------------- | :------------------------------------------ | :--------------------------------------------------------------------------------- |
| ``                          | `/api/v1/brands`                            | get all brands with default 50 brands in each page                                 |
| `limit & page (pagination)` | `/api/v1/brands?limit=3&page=2`             | get the second page ,each page with 3 brands                                       |
| `fields`                    | `/api/v1/brands?fields=name,-_id,createdAt` | limit fields in the response (put '-' before a field to exclude it)                |
| `keyword`                   | `/api/v1/brands?keyword=clothes`            | search for brands that their name contains 'clothes' keyword                       |
| `sortBy`                    | `/api/v1/brands?sortBy=-createdAt`          | sort the response by createdAt field in desc order (for asc remove '-' or add '+') |

- note: you can make your combination of these queryString

- Responses :

1- status code `200` with these data

```json
{
  "results": 3,
  "paginationResult": {
    "currentPage": 1,
    "limit": 3,
    "numberOfPages": 4,
    "next": 2
  },
  "data": [
    {
      "_id": "652edb520d26581bede3fb1f",
      "name": "IKEA",
      "slug": "ikea",
      "createdAt": "2023-10-17T19:06:58.822Z",
      "updatedAt": "2023-10-21T20:34:48.127Z"
    },
    {
      "_id": "6533e2fa8c2df46d2ec42b37",
      "name": "Niki",
      "slug": "niki",
      "createdAt": "2023-10-21T14:40:58.453Z",
      "updatedAt": "2023-10-21T14:40:58.453Z"
    },
    {
      "_id": "653454b68ccb0974e4b082d8",
      "name": "CR7",
      "slug": "cr7",
      "createdAt": "2023-10-21T22:46:14.550Z",
      "updatedAt": "2023-10-21T22:46:14.550Z"
    }
  ]
}
```

2- If you enter invalid data in the body or in the header ,a descriptive error message will be sent.

</details>

<details>
<summary>
Get a specific brand
</summary>

```http
  GET /api/v1/brands/:id
```

| Params | Endpoint             | Description            |
| :----- | :------------------- | :--------------------- |
| `id`   | `/api/v1/brands/:id` | id of a specific brand |

- Responses :

1- status code `200` with these data

```json
{
  "data": {
    "_id": "652edb520d26581bede3fb1f",
    "name": "IKEA",
    "slug": "ikea",
    "createdAt": "2023-10-17T19:06:58.822Z",
    "updatedAt": "2023-10-21T20:34:48.127Z",
    "__v": 0
  }
}
```

2- If you enter invalid data in the body or in the header ,a descriptive error message will be sent.

</details>

<details>
<summary>
Update a brand
</summary>

```http
  PUT /api/v1/brands/:id
```

Note: when you send the body to the server convert it to JSON format.
| Body | Type | Description | Constraint |
| :--------- | :------- | :--------------------------------- |:--------- |
| `name` | `string` | name of the brand |**Optional** & **Unique** & **minLength:3** & **maxLength:32** |
| `image` | `buffer` | brand image | **Optional**|

| Params | Endpoint             | Description            |
| :----- | :------------------- | :--------------------- |
| `id`   | `/api/v1/brands/:id` | id of a specific brand |

choose the fields you want to update

| Headers           | Type           | Description                            |
| :---------------- | :------------- | :------------------------------------- |
| `"Authorization"` | `Bearer Token` | **Required**.Bearer token of auth user |

- Responses :

1- status code `200` with these data

```json
{
  "data": {
    "_id": "652edb520d26581bede3fb1f",
    "name": "IKEA",
    "slug": "ikea",
    "createdAt": "2023-10-17T19:06:58.822Z",
    "updatedAt": "2023-10-21T20:34:48.127Z",
    "__v": 0
  }
}
```

2- If you enter invalid data in the body or in the header ,a descriptive error message will be sent.

</details>

<details>
<summary>
Delete a brand
</summary>

```http
  DELETE /api/v1/brands/:id
```

| Params | Endpoint             | Description            |
| :----- | :------------------- | :--------------------- |
| `id`   | `/api/v1/brands/:id` | id of a specific brand |

| Headers           | Type           | Description                            |
| :---------------- | :------------- | :------------------------------------- |
| `"Authorization"` | `Bearer Token` | **Required**.Bearer token of auth user |

- Responses :

1- status code `204` with no json data

2- If you enter invalid id in the body or in the header ,a descriptive error message will be sent.

</details>

### Product Resource

<details>
<summary>
Create Product
</summary>

```http
  POST /api/v1/products
```

Note: when you send the body to the server convert it to JSON format.
| Body | Type | Description | Constraint |
| :--------- | :------- | :--------------------------------- |:--------- |
| `title` | `string` | title of the product |**Required** & **Unique** & **minLength:3** & **maxLength:100** |
| `description` | `string` | product description | **Required** & **minLength:20**|
| `quantity` | `Number` | product quantity |**Required**|
| `sold` | `Number` | no sold products |**Not Required**|
| `price` | `Number` | product price |**Required** & **max:200000** |
| `priceAfterDiscount` | `Number` | product price after discount |**Not Required**|
| `colors` | `string[]` | product colors |**Not Required**|
| `imageCover` | `buffer` | product image cover |**Required**|
| `images`|`buffer[]` | product images |**Not Required**|
| `category` |`ObjectId` | category id of the product |**Required**|
| `subcategories` |`ObjectId[]` | subCategory ids of the product |**Not Required**|
| `brand`|`ObjectId` | brand id of the product |**Not Required**|
| `ratingsAverage`|`Number` | rating avg of the product |**Not Required** & **min:1** & **max:5**|
| `ratingsQuantity`|`Number` | number of people who rate |**Not Required**|

| Headers           | Type           | Description                            |
| :---------------- | :------------- | :------------------------------------- |
| `"Authorization"` | `Bearer Token` | **Required**.Bearer token of auth user |

- Responses :

1- status code `201` with these data

```json
{
  "data": {
    "_id": "6534654b104831c9487a8f18",
    "title": "Mens Casual Slim Fit",
    "slug": "mens-casual-slim-fit",
    "description": "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
    "quantity": 100,
    "sold": 101,
    "price": 15.99,
    "colors": [],
    "imageCover": "https://e-shop-lwy3.onrender.com/products/https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    "images": [],
    "category": {
      "name": "electronics"
    },
    "subcategories": [],
    "ratingsAverage": 4.9,
    "ratingsQuantity": 98,
    "createdAt": "2023-10-21T23:56:59.262Z",
    "updatedAt": "2023-10-21T23:56:59.262Z"
  }
}
```

2- If you enter invalid data in the body or in the header ,a descriptive error message will be sent.

</details>

<details>
<summary>
Get list of products
</summary>

```http
  GET /api/v1/products
```

| Query                       | Endpoint                                         | Description                                                                        |
| :-------------------------- | :----------------------------------------------- | :--------------------------------------------------------------------------------- |
| ``                          | `/api/v1/products`                               | get all products with default 50 products in each page                             |
| `limit & page (pagination)` | `/api/v1/products?limit=3&page=2`                | get the second page ,each page with 3 products                                     |
| `fields`                    | `/api/v1/products?fields=title,-_id,description` | limit fields in the response (put '-' before a field to exclude it)                |
| `keyword`                   | `/api/v1/products?keyword=Slim Fit`              | search for products that their (title or description) contains 'Slim Fit' keyword  |
| `sortBy`                    | `/api/v1/products?sortBy=-createdAt`             | sort the response by createdAt field in desc order (for asc remove '-' or add '+') |

- note: you can make your combination of these queryString

- Responses :

1- status code `200` with these data

```json
{
  "results": 2,
  "paginationResult": {
    "currentPage": 1,
    "limit": 2,
    "numberOfPages": 7,
    "next": 2
  },
  "data": [
    {
      "_id": "6536e390c543c9b63c297ee3",
      "title": "nickles",
      "slug": "nickles",
      "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
      "quantity": 9,
      "sold": 0,
      "price": 1000,
      "colors": [],
      "imageCover": "https://e-shop-lwy3.onrender.com/products/product-f8045f51-4764-4ea3-8d9c-2711e0a36387-1698096566849.jpeg",
      "images": [
        "https://e-shop-lwy3.onrender.com/products/product-95b797b7-036c-4af9-8fbe-7d02b215eb26-1698096016510-2.jpeg",
        "https://e-shop-lwy3.onrender.com/products/product-76ec26d6-3803-4b1d-b3c8-fa2b678bf68b-1698096016509-1.jpeg"
      ],
      "category": {
        "name": "jewelry"
      },
      "subcategories": [],
      "ratingsQuantity": 0,
      "createdAt": "2023-10-23T21:20:16.887Z",
      "updatedAt": "2023-10-23T21:29:26.976Z"
    },
    {
      "_id": "6536e2ea23d47b204e1dd733",
      "title": "Mens Cotton Jacket",
      "slug": "mens-cotton-jacket",
      "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
      "quantity": 9,
      "sold": 0,
      "price": 1000,
      "colors": [],
      "imageCover": "https://e-shop-lwy3.onrender.com/products/product-f9da52b2-516a-4f4a-95dc-9982da1ceba2-1698095849619.jpeg",
      "images": [
        "https://e-shop-lwy3.onrender.com/products/product-3828c3d6-bd04-4ca5-b4e3-8af859009a3a-1698095849801-2.jpeg",
        "https://e-shop-lwy3.onrender.com/products/product-e9470e36-68d2-4cff-b7b8-54945f45d10a-1698095849800-1.jpeg"
      ],
      "category": {
        "name": "clothes"
      },
      "subcategories": [],
      "ratingsQuantity": 0,
      "createdAt": "2023-10-23T21:17:30.829Z",
      "updatedAt": "2023-10-23T21:17:30.829Z"
    }
  ]
}
```

2- If you enter invalid data in the body or in the header ,a descriptive error message will be sent.

</details>

<details>
<summary>
Get a specific product
</summary>

```http
  GET /api/v1/products/:id
```

| Params | Endpoint               | Description              |
| :----- | :--------------------- | :----------------------- |
| `id`   | `/api/v1/products/:id` | id of a specific product |

- Responses :

1- status code `200` with these data

```json
{
  "data": {
    "_id": "6534654b104831c9487a8f1d",
    "title": "WD 2TB Elements Portable External Hard Drive - USB 3.0",
    "slug": "wd-2tb-elements-portable-external-hard-drive-usb-3.0",
    "description": "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
    "quantity": 102,
    "sold": 51,
    "price": 64,
    "colors": [],
    "imageCover": "https://e-shop-lwy3.onrender.com/products/https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    "images": [],
    "category": {
      "name": "electronics"
    },
    "subcategories": [],
    "ratingsAverage": 4.8,
    "ratingsQuantity": 42,
    "createdAt": "2023-10-21T23:56:59.262Z",
    "updatedAt": "2023-10-21T23:56:59.262Z",
    "__v": 0
  }
}
```

2- If you enter invalid data in the body or in the header ,a descriptive error message will be sent.

</details>

<details>
<summary>
Update a product
</summary>

```http
  PUT /api/v1/products/:id
```

Note: when you send the body to the server convert it to JSON format.
| Body | Type | Description | Constraint |
| :--------- | :------- | :--------------------------------- |:--------- |
| `title` | `string` | title of the product |**Optional** & **Unique** & **minLength:3** & **maxLength:100** |
| `description` | `string` | product description | **Optional** & **minLength:20**|
| `quantity` | `Number` | product quantity |**Optional**|
| `sold` | `Number` | no sold products |**Optional**|
| `price` | `Number` | product price |**Optional** & **max:200000** |
| `priceAfterDiscount` | `Number` | product price after discount |**Optional**|
| `colors` | `string[]` | product colors |**Optional**|
| `imageCover` | `buffer` | product image cover |**Optional**|
| `images`|`buffer[]` | product images |**Optional**|
| `category` |`ObjectId` | category id of the product |**Optional**|
| `subcategories` |`ObjectId[]` | subCategory ids of the product |**Optional**|
| `brand`|`ObjectId` | brand id of the product |**Optional**|
| `ratingsAverage`|`Number` | rating avg of the product |**Optional** & **min:1** & **max:5**|
| `ratingsQuantity`|`Number` | number of people who rate |**Optional**|

| Params | Endpoint               | Description              |
| :----- | :--------------------- | :----------------------- |
| `id`   | `/api/v1/products/:id` | id of a specific product |

choose the fields you want to update

| Headers           | Type           | Description                            |
| :---------------- | :------------- | :------------------------------------- |
| `"Authorization"` | `Bearer Token` | **Required**.Bearer token of auth user |

- Responses :

1- status code `200` with these data

```json
{
  "data": {
    "_id": "6534654b104831c9487a8f1d",
    "title": "WD 2TB Elements Portable External Hard Drive - USB 3.0",
    "slug": "wd-2tb-elements-portable-external-hard-drive-usb-3.0",
    "description": "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
    "quantity": 102,
    "sold": 51,
    "price": 64,
    "colors": [],
    "imageCover": "https://e-shop-lwy3.onrender.com/products/https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    "images": [],
    "category": {
      "name": "electronics"
    },
    "subcategories": [],
    "ratingsAverage": 4.8,
    "ratingsQuantity": 42,
    "createdAt": "2023-10-21T23:56:59.262Z",
    "updatedAt": "2023-10-21T23:56:59.262Z",
    "__v": 0
  }
}
```

2- If you enter invalid data in the body or in the header ,a descriptive error message will be sent.

</details>

<details>
<summary>
Delete a product
</summary>

```http
  DELETE /api/v1/products/:id
```

| Params | Endpoint               | Description              |
| :----- | :--------------------- | :----------------------- |
| `id`   | `/api/v1/products/:id` | id of a specific product |

| Headers           | Type           | Description                            |
| :---------------- | :------------- | :------------------------------------- |
| `"Authorization"` | `Bearer Token` | **Required**.Bearer token of auth user |

- Responses :

1- status code `204` with no json data

2- If you enter invalid id in the body or in the header ,a descriptive error message will be sent.

</details>

### User Resource

<details>
<summary>
Create User
</summary>

```http
  POST /api/v1/users
```

Note: when you send the body to the server convert it to JSON format.
Note: only `admin` who can use this route
| Body | Type | Description | Constraint |
| :--------- | :------- | :--------------------------------- |:--------- |
| `name` | `String` | name of the user |**Required** & **minLength:3** |
| `email` | `String` | user email address | **Required** & **Unique**|
| `password` | `String` | user password | **Required** & **minLength:6**|
| `passConfirmation` | `String` | user password | **Required**|
| `role` | `String` | account role | **Not Required** & valid values: **["user", "admin", "manager"]** |
| `phone` | `String` | user phone |**Not Required** & **["ar-EG", "ar-SA"]**|
| `profileImg` | `buffer` | user profileImage |**Not Required**|

| Headers           | Type           | Description                            |
| :---------------- | :------------- | :------------------------------------- |
| `"Authorization"` | `Bearer Token` | **Required**.Bearer token of auth user |

- Responses :

1- status code `201` with these data

```json
{
  "data": {
    "name": "mohamed ahmed",
    "slug": "mohamed-ahmed",
    "email": "ahmedmohamed@gmail.com",
    "phone": "01020625071",
    "password": "$2b$12$AM9o8mhLfazd2WR878ktyelvWQg3i3e15cVN2vBSfPT/nMD6.ZK26",
    "role": "manager",
    "active": true,
    "_id": "653b3d0386875736d8a4a0bb",
    "createdAt": "2023-10-27T04:30:59.089Z",
    "updatedAt": "2023-10-27T04:30:59.089Z",
    "__v": 0
  }
}
```

2- If you enter invalid data in the body or in the header ,a descriptive error message will be sent.

</details>

<details>
<summary>
Get list of users
</summary>

```http
  GET /api/v1/users
```

| Query                       | Endpoint                               | Description                                                                        |
| :-------------------------- | :------------------------------------- | :--------------------------------------------------------------------------------- |
| ``                          | `/api/v1/users`                        | get all users with default 50 users in each page                                   |
| `limit & page (pagination)` | `/api/v1/users?limit=3&page=2`         | get the second page ,each page with 3 users                                        |
| `fields`                    | `/api/v1/users?fields=name,-_id,email` | limit fields in the response (put '-' before a field to exclude it)                |
| `keyword`                   | `/api/v1/users?keyword=mohamed`        | search for users that their name contains 'mohamed' keyword                        |
| `sortBy`                    | `/api/v1/users?sortBy=-createdAt`      | sort the response by createdAt field in desc order (for asc remove '-' or add '+') |

- note: you can make your combination of these queryString

| Headers           | Type           | Description                            |
| :---------------- | :------------- | :------------------------------------- |
| `"Authorization"` | `Bearer Token` | **Required**.Bearer token of auth user |

- Responses :

1- status code `200` with these data

```json
{
  "results": 9,
  "paginationResult": {
    "currentPage": 1,
    "limit": 50,
    "numberOfPages": 1
  },
  "data": [
    {
      "name": "abdelrahman shaheen",
      "email": "abdo.com"
    },
    {
      "name": "hamada",
      "email": "shaheenabdelrahman28@gmail.com"
    },
    {
      "name": "hossam",
      "email": "hossam123@gmail.com"
    },
    {
      "name": "mohamed",
      "email": "mo123@gmail.com"
    },
    {
      "name": "SelimOoOo",
      "email": "selimoooo@gmail.com"
    },
    {
      "name": "shaheen",
      "email": "abdelrahmanbassem225@gmail.com"
    },
    {
      "name": "shaheen",
      "email": "abdelrahmanbassem@gmail.com"
    },
    {
      "name": "shaheen",
      "email": "shaheen@gmail.com"
    },
    {
      "name": "mohamed ahmed",
      "email": "ahmedmohamed@gmail.com"
    }
  ]
}
```

2- If you enter invalid data in the body or in the header ,a descriptive error message will be sent.

</details>

<details>
<summary>
Get a specific user
</summary>

```http
  GET /api/v1/users/:id
```

| Params | Endpoint            | Description           |
| :----- | :------------------ | :-------------------- |
| `id`   | `/api/v1/users/:id` | id of a specific user |

| Headers           | Type           | Description                            |
| :---------------- | :------------- | :------------------------------------- |
| `"Authorization"` | `Bearer Token` | **Required**.Bearer token of auth user |

- Responses :

1- status code `200` with these data

```json
{
  "data": {
    "_id": "6537d2a76cb530e5e11f2c99",
    "name": "mohamed",
    "slug": "mohamed",
    "email": "mo123@gmail.com",
    "phone": "01020625071",
    "password": "$2b$12$Wn2opnY9ZBWiciwPd8jr.elwE2K4aIk0XzrZ4E6uzfLrz/KOFUut.",
    "role": "user",
    "active": true,
    "createdAt": "2023-10-24T14:20:23.813Z",
    "updatedAt": "2023-10-24T20:39:30.216Z",
    "__v": 0
  }
}
```

2- If you enter invalid data in the body or in the header ,a descriptive error message will be sent.

</details>

<details>
<summary>
Update a user
</summary>

```http
  PUT /api/v1/users/:id
```

Note: when you send the body to the server convert it to JSON format.
| Body | Type | Description | Constraint |
| :--------- | :------- | :--------------------------------- |:--------- |
| `name` | `String` | name of the user |**Optional** & **minLength:3** |
| `email` | `String` | user email address | **Optional** & **Unique**|
| `role` | `String` | account role | **Optional** & valid values: **["user", "admin", "manager"]** |
| `phone` | `String` | user phone |**Optional** & **["ar-EG", "ar-SA"]**|
| `profileImg` | `buffer` | user profileImage |**Optional**|

| Params | Endpoint            | Description           |
| :----- | :------------------ | :-------------------- |
| `id`   | `/api/v1/users/:id` | id of a specific user |

choose the fields you want to update

| Headers           | Type           | Description                            |
| :---------------- | :------------- | :------------------------------------- |
| `"Authorization"` | `Bearer Token` | **Required**.Bearer token of auth user |

- Responses :

1- status code `200` with these data

```json
{
  "data": {
    "_id": "6537d2a76cb530e5e11f2c99",
    "name": "mohamed",
    "slug": "mohamed",
    "email": "mo123@gmail.com",
    "phone": "01020625071",
    "password": "$2b$12$Wn2opnY9ZBWiciwPd8jr.elwE2K4aIk0XzrZ4E6uzfLrz/KOFUut.",
    "role": "user",
    "active": true,
    "createdAt": "2023-10-24T14:20:23.813Z",
    "updatedAt": "2023-10-24T20:39:30.216Z",
    "__v": 0
  }
}
```

2- If you enter invalid data in the body or in the header ,a descriptive error message will be sent.

</details>

<details>
<summary>
Update user password
</summary>

```http
  PUT /api/v1/users/changePassword/:id
```

Note: when you send the body to the server convert it to JSON format.
| Body | Type | Description | Constraint |
| :--------- | :------- | :--------------------------------- |:--------- |
| `password` | `String` | user old password | **Required** & **minLength:6**|
| `newPassword`|`String`| user new password | **Required** & **minLength:6**|
|`passConfirmation`|`String` | user new password | **Required**|

| Params | Endpoint                           | Description           |
| :----- | :--------------------------------- | :-------------------- |
| `id`   | `/api/v1/users/changePassword/:id` | id of a specific user |

| Headers           | Type           | Description                            |
| :---------------- | :------------- | :------------------------------------- |
| `"Authorization"` | `Bearer Token` | **Required**.Bearer token of auth user |

- Responses :

1- status code `200` with these data

```json
{
  "data": {
    "_id": "6537d2a76cb530e5e11f2c99",
    "name": "mohamed",
    "slug": "mohamed",
    "email": "mo123@gmail.com",
    "phone": "01020625071",
    "password": "$2b$12$Wn2opnY9ZBWiciwPd8jr.elwE2K4aIk0XzrZ4E6uzfLrz/KOFUut.",
    "role": "user",
    "active": true,
    "createdAt": "2023-10-24T14:20:23.813Z",
    "updatedAt": "2023-10-24T20:39:30.216Z",
    "__v": 0
  }
}
```

2- If you enter invalid data in the body or in the header ,a descriptive error message will be sent.

</details>

<details>
<summary>
Delete a user
</summary>

```http
  DELETE /api/v1/users/:id
```

| Params | Endpoint            | Description           |
| :----- | :------------------ | :-------------------- |
| `id`   | `/api/v1/users/:id` | id of a specific user |

| Headers           | Type           | Description                            |
| :---------------- | :------------- | :------------------------------------- |
| `"Authorization"` | `Bearer Token` | **Required**.Bearer token of auth user |

- Responses :

1- status code `204` with no json data

2- If you enter invalid id in the body or in the header ,a descriptive error message will be sent.

</details>

<details>
<summary>
Get logged user data
</summary>

```http
  GET /api/v1/users/getMe
```

| Headers           | Type           | Description                            |
| :---------------- | :------------- | :------------------------------------- |
| `"Authorization"` | `Bearer Token` | **Required**.Bearer token of auth user |

- Responses :

1- status code `200` with these data

```json
{
  "data": {
    "_id": "653ad6b35df9e9d588136190",
    "name": "shaheen",
    "slug": "shaheen",
    "email": "shaheen@gmail.com",
    "password": "$2b$12$DFdWKAZPaIVFx7mTOWodUOLbfZjWhXOhb3U1fRcI7/3YflPDg6HYC",
    "role": "admin",
    "active": true,
    "createdAt": "2023-10-26T21:14:27.412Z",
    "updatedAt": "2023-10-27T05:11:04.356Z",
    "__v": 0,
    "passwordChangedAt": "2023-10-27T05:11:04.354Z"
  }
}
```

2- If you enter invalid data in the body or in the header ,a descriptive error message will be sent.

</details>

<details>
<summary>
Update logged user data
</summary>

```http
  PUT /api/v1/users/UpdateMe
```

Note: when you send the body to the server convert it to JSON format.
| Body | Type | Description | Constraint |
| :--------- | :------- | :--------------------------------- |:--------- |
| `name` | `String` | name of the user |**Optional** & **minLength:3** |
| `email` | `String` | user email address | **Optional** & **Unique**|
| `phone` | `String` | user phone |**Optional** & **["ar-EG", "ar-SA"]**|

choose the fields you want to update

| Headers           | Type           | Description                            |
| :---------------- | :------------- | :------------------------------------- |
| `"Authorization"` | `Bearer Token` | **Required**.Bearer token of auth user |

- Responses :

1- status code `200` with these data

```json
{
  "data": {
    "_id": "6537d2a76cb530e5e11f2c99",
    "name": "mohamed",
    "slug": "mohamed",
    "email": "mo123@gmail.com",
    "phone": "01020625071",
    "password": "$2b$12$Wn2opnY9ZBWiciwPd8jr.elwE2K4aIk0XzrZ4E6uzfLrz/KOFUut.",
    "role": "user",
    "active": true,
    "createdAt": "2023-10-24T14:20:23.813Z",
    "updatedAt": "2023-10-24T20:39:30.216Z",
    "__v": 0
  }
}
```

2- If you enter invalid data in the body or in the header ,a descriptive error message will be sent.

</details>

<details>
<summary>
Update logged user password
</summary>

```http
  PUT /api/v1/users/changeMyPassword
```

Note: when you send the body to the server convert it to JSON format.
| Body | Type | Description | Constraint |
| :--------- | :------- | :--------------------------------- |:--------- |
| `password` | `String` | user old password | **Required** & **minLength:6**|

| Headers           | Type           | Description                            |
| :---------------- | :------------- | :------------------------------------- |
| `"Authorization"` | `Bearer Token` | **Required**.Bearer token of auth user |

- Responses :

1- status code `200` with these data

```json
{
  "data": {
    "_id": "6537d2a76cb530e5e11f2c99",
    "name": "mohamed",
    "slug": "mohamed",
    "email": "mo123@gmail.com",
    "phone": "01020625071",
    "password": "$2b$12$Wn2opnY9ZBWiciwPd8jr.elwE2K4aIk0XzrZ4E6uzfLrz/KOFUut.",
    "role": "user",
    "active": true,
    "createdAt": "2023-10-24T14:20:23.813Z",
    "updatedAt": "2023-10-24T20:39:30.216Z",
    "__v": 0
  }
}
```

2- If you enter invalid data in the body or in the header ,a descriptive error message will be sent.

</details>

<details>
<summary>
Deactive logged user
</summary>

```http
  DELETE /api/v1/users/deleteMe
```

| Headers           | Type           | Description                            |
| :---------------- | :------------- | :------------------------------------- |
| `"Authorization"` | `Bearer Token` | **Required**.Bearer token of auth user |

- Responses :

1- status code `204` with no json data

2- If you enter invalid id in the body or in the header ,a descriptive error message will be sent.

</details>

### Auth Resource

<details>
<summary>
Signup
</summary>

```http
  POST /api/v1/auth/signup
```

Note: when you send the body to the server convert it to JSON format.

| Body               | Type     | Description        | Constraint                     |
| :----------------- | :------- | :----------------- | :----------------------------- |
| `name`             | `String` | name of the user   | **Required** & **minLength:3** |
| `email`            | `String` | user email address | **Required** & **Unique**      |
| `password`         | `String` | user password      | **Required** & **minLength:6** |
| `passConfirmation` | `String` | user password      | **Required**                   |

- Responses :

1- status code `201` with these data

```json
{
  "data": {
    "name": "shaheen",
    "slug": "shaheen",
    "email": "shaheen@gmail.com",
    "password": "$2b$12$pBgR44byjgzwa3ueq5MNeuoCkLl06sztlm4XVLsCLBaHo9QvcdO..",
    "role": "user",
    "active": true,
    "_id": "653ad6b35df9e9d588136190",
    "createdAt": "2023-10-26T21:14:27.412Z",
    "updatedAt": "2023-10-26T21:14:27.412Z",
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNhZDZiMzVkZjllOWQ1ODgxMzYxOTAiLCJpYXQiOjE2OTgzNTQ4NjksImV4cCI6MTcwNjEzMDg2OX0.qraosWgWiFvW_AcN4GD8A4kxvG9WE8f51Se6SJet-5k"
}
```

2- If you enter invalid data in the body or in the header ,a descriptive error message will be sent.

</details>

<details>
<summary>
Login
</summary>

```http
  POST /api/v1/auth/login
```

Note: when you send the body to the server convert it to JSON format.

| Body       | Type     | Description        | Constraint                     |
| :--------- | :------- | :----------------- | :----------------------------- |
| `email`    | `String` | user email address | **Required** & **Unique**      |
| `password` | `String` | user password      | **Required** & **minLength:6** |

- Responses :

1- status code `201` with these data

```json
{
  "data": {
    "_id": "653ad6b35df9e9d588136190",
    "name": "shaheen",
    "slug": "shaheen",
    "email": "shaheen@gmail.com",
    "password": "$2b$12$DFdWKAZPaIVFx7mTOWodUOLbfZjWhXOhb3U1fRcI7/3YflPDg6HYC",
    "role": "admin",
    "active": true,
    "createdAt": "2023-10-26T21:14:27.412Z",
    "updatedAt": "2023-10-27T05:11:04.356Z",
    "__v": 0,
    "passwordChangedAt": "2023-10-27T05:11:04.354Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNhZDZiMzVkZjllOWQ1ODgxMzYxOTAiLCJpYXQiOjE2OTgzODM2OTcsImV4cCI6MTcwNjE1OTY5N30.bEKdv2ragRXY2X6BYfUKyYgz3D1UsIp1oOBfbHwQXKw"
}
```

2- If you enter invalid data in the body or in the header ,a descriptive error message will be sent.

</details>

<details>
<summary>
Forgot password
</summary>

```http
  POST /api/v1/auth/forgotPassword
```

Note: when you send the body to the server convert it to JSON format.

| Body    | Type     | Description        | Constraint                |
| :------ | :------- | :----------------- | :------------------------ |
| `email` | `String` | user email address | **Required** & **Unique** |

- Responses :

1- status code `200` with these data

```json
{ "status": "Success", "message": "Reset code sent to email" }
```

2- If you enter invalid data in the body or in the header ,a descriptive error message will be sent.

</details>

<details>
<summary>
Verify PassResetCode
</summary>

```http
  POST /api/v1/auth/verifyResetCode
```

Note: when you send the body to the server convert it to JSON format.

| Body        | Type     | Description                   | Constraint                |
| :---------- | :------- | :---------------------------- | :------------------------ |
| `resetCode` | `String` | reset code sent to your email | **Required** & **Unique** |

- Responses :

1- status code `200` with these data

```json
{ "status": "Success" }
```

2- If you enter invalid data in the body or in the header ,a descriptive error message will be sent.

</details>

<details>
<summary>
Reset Password
</summary>

```http
  POST /api/v1/auth/resetPassword
```

Note: when you send the body to the server convert it to JSON format.

| Body    | Type     | Description        | Constraint   |
| :------ | :------- | :----------------- | :----------- |
| `email` | `String` | user email address | **Required** |

- Responses :

1- status code `200` with these data

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNhZDZiMzVkZjllOWQ1ODgxMzYxOTAiLCJpYXQiOjE2OTgzODM2OTcsImV4cCI6MTcwNjE1OTY5N30.bEKdv2ragRXY2X6BYfUKyYgz3D1UsIp1oOBfbHwQXKw"
}
```

2- If you enter invalid data in the body or in the header ,a descriptive error message will be sent.

</details>
