# E-Shop

<details>
<summary>Table of content</summary>

- [E-Shop](#e-shop)
  - [Description](#description)
  - [Features ✨](#features-)
  - [More about uploading images :](#more-about-uploading-images-)
  - [More about Authentication \& Authorization :](#more-about-authentication--authorization-)
  - [More about Validation \& Error handling :](#more-about-validation--error-handling-)
  - [About security :](#about-security-)
  - [Project structure](#project-structure)
  - [Database Schema](#database-schema)
  - [Installation 📥](#installation-)
  - [How to use](#how-to-use)
    - [Environment Variables](#environment-variables)
  - [Api Docs](#api-docs)
          - [This is a detailed documentation for all api endpoints that have been implemented](#this-is-a-detailed-documentation-for-all-api-endpoints-that-have-been-implemented)
  - [ToDo](#todo)
          - [Here are some features that i 'll implement soon:](#here-are-some-features-that-i-ll-implement-soon)

</details>

## Description

Real World Backend RESTful API For E-Commerce Platform Ready for Mobile or Web E-Shop Application

## Features ✨

- Categories CRUD Operations
- SubCategories CRUD & Brands CRUD Operations
- Products CRUD Operations
- Users CRUD Operations
- Upload Single And Multiple Images And Image Processing
- Implemented authentication and authorization mechanisms to ensure only authorized users can access specific endpoints.
- Advanced Searching, Sorting, Pagination, and Filtering
- Users can recover forgotten passwords
- Ensure proper validation and error handling is implemented for the API endpoints.
- Sending emails via gmail using `nodemailer` (sending reset password code).
- Reviews Feature: Users can create/update/delete/read reviews by title and rating (1-5). Each user can make one review per product and update their own reviews. Anyone can retrieve reviews. Admins and managers have the authority to delete reviews. Product data includes all reviews, and the system calculates ratingsAverage and ratingsQuantity when CRUDing a review.
- Wishlist Feature: Users can add/remove products to/from their wishlists and view their wishlist products.
- User Addresses Feature: Users can add, remove, and view a list of addresses with `aliases`, `details`, `phone` `numbers`, and `cities`.
- Shopping cart feature so user can add product items in a cart to buy.
- Coupon feature so user can apply a coupon to get a discount .
- Order feature
- Cash on delivery (no online payment required)
- Credit card payment with `stripe`
- Well-organized and well-documented code (Clean code).
- Used MVC Architecture

## More about uploading images :

- used `multer` lib.
- filter files to accept only images.
- used memory storage to make image processing using `sharp` lib cuz sharp deals with buffers.
- stored images in the file system and image name in the database but return image url in the response.
- upload brand/category image using `upload.single(fieldName)`.
- upload product images and product imageCover using `upload.filters([{},{}])`.

## More about Authentication & Authorization :

- About password :
  - user have to enter a confirmation password.
  - password is hashed using `bycript` lib before saving.
  - to change password user have to enter the current one ,the new one and the confirmation password.
  - user can call forget password API using email address and a sending reset(hashed and saved into DB) code to the email
  - forget reset password cycle :
    1. api/v1/auth/forgotPassword -> send reset code to email
    2. api/v1/auth/verifyResetCode -> verify that reset code sent to email
    3. api/v1/auth/resetPassword -> set the new password
- About Authentication :
  - user can `signup` using `name` ,`email` ,`pass` and `confirmation` password then the server sends a JWT token in the response.
  - user can login using `email` and `password` and the server sends a `JWT` token in the response.
- About Authorization :
  - There are 3 roles in the system (`user`,`admin`,`manager`)

## More about Validation & Error handling :

- used validation layer before entering the handler to handle all inputs in `req.body`. Made it using `express-validator` lib.
- used global error handler middleware to handle all operational and non-operational errors coming from controllers/handlers.
- there is no error that does not been handled in the system.

## About security :

- Set request size limit to 20kb to prevent attackers from sending large request body using `express-rate-limit` package.
- Using `rate-limiter` package to help preventing brute-force attack by setting a limit on login route(5 requsets per 15min).
- Protect routes against HTTP Parameter Pollution attacks using `hpp` package.
- Perform input validation using : `mongoSanitize` to prevent nosql injection & `express-validator` to validate inputs .

## Project structure

<details>
<summary>Click to expand!</summary>

```bash
## Project Structure
📦e-commerce
 ┣ 📂controllers
 ┃ ┣ 📜addressController.js
 ┃ ┣ 📜authController.js
 ┃ ┣ 📜brandController.js
 ┃ ┣ 📜cartController.js
 ┃ ┣ 📜categoryController.js
 ┃ ┣ 📜couponController.js
 ┃ ┣ 📜handlersFactory.js
 ┃ ┣ 📜orderController.js
 ┃ ┣ 📜productController.js
 ┃ ┣ 📜reviewController.js
 ┃ ┣ 📜subCategoryController.js
 ┃ ┣ 📜userController.js
 ┃ ┗ 📜wishlistController.js
 ┣ 📂db
 ┃ ┗ 📜mongoose.js
 ┣ 📂middlewares
 ┃ ┣ 📜allowedToMiddleware.js
 ┃ ┣ 📜authMiddleware.js
 ┃ ┣ 📜errorMiddleware.js
 ┃ ┣ 📜uploadImageMiddleware.js
 ┃ ┗ 📜validatorMiddleware.js
 ┣ 📂models
 ┃ ┣ 📜brand.js
 ┃ ┣ 📜cart.js
 ┃ ┣ 📜category.js
 ┃ ┣ 📜coupon.js
 ┃ ┣ 📜order.js
 ┃ ┣ 📜product.js
 ┃ ┣ 📜review.js
 ┃ ┣ 📜subCategory.js
 ┃ ┗ 📜user.js
 ┣ 📂routers
 ┃ ┣ 📜addressRouter.js
 ┃ ┣ 📜authRouter.js
 ┃ ┣ 📜brandRouter.js
 ┃ ┣ 📜cartRouter.js
 ┃ ┣ 📜categoryRouter.js
 ┃ ┣ 📜couponRouter.js
 ┃ ┣ 📜index.js
 ┃ ┣ 📜orderRouter.js
 ┃ ┣ 📜productRouter.js
 ┃ ┣ 📜reviewRouter.js
 ┃ ┣ 📜subCategoryRouter.js
 ┃ ┣ 📜userRouter.js
 ┃ ┗ 📜wishlistRouter.js
 ┣ 📂uploads
 ┃ ┣ 📂brands
 ┃ ┃ ┣ 📜brand-042dac62-3bde-4dca-8461-4aba35309445-1698000791446.jpeg
 ┃ ┃ ┗ 📜brand-14d8ce2b-64b6-4cc0-8e4e-de8b9de2911c-1698372363665.jpeg
 ┃ ┣ 📂categories
 ┃ ┃ ┣ 📜category-18c841a2-ed1b-4fcb-a4a0-38a3c4d98a6c-1697999913252.jpeg
 ┃ ┃ ┣ 📜category-718171ac-f3de-47e0-b6ee-c46c138f75f7-1698361700650.jpeg
 ┃ ┃ ┗ 📜category-aebb97e0-9af6-4993-8162-d56dc3efe808-1697999866558.jpeg
 ┃ ┣ 📂products
 ┃ ┃ ┗ 📜product-f8045f51-4764-4ea3-8d9c-2711e0a36387-1698096566849.jpeg
 ┃ ┗ 📂users
 ┃ ┃ ┗ 📜user-4ec222df-e4fd-481d-b7c1-822471969084-1698107246137.jpeg
 ┣ 📂utils
 ┃ ┣ 📂dummyData
 ┃ ┃ ┣ 📜products.json
 ┃ ┃ ┗ 📜seeder.js
 ┃ ┣ 📂validators
 ┃ ┃ ┣ 📜addressValidator.js
 ┃ ┃ ┣ 📜authValidator.js
 ┃ ┃ ┣ 📜brandValidator.js
 ┃ ┃ ┣ 📜categoryValidator.js
 ┃ ┃ ┣ 📜productValidator.js
 ┃ ┃ ┣ 📜reviewValidator.js
 ┃ ┃ ┣ 📜subCategoryValidator.js
 ┃ ┃ ┣ 📜userValidator.js
 ┃ ┃ ┗ 📜wishlistValidator.js
 ┃ ┣ 📜apiFeatures.js
 ┃ ┣ 📜AppError.js
 ┃ ┗ 📜sendEmail.js
 ┣ 📜.eslintrc.json
 ┣ 📜.gitignore
 ┣ 📜api-docs.md
 ┣ 📜config.env
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜README.md
 ┗ 📜server.js
```

</details>

## Database Schema

<details>
<summary>Diagram</summary>

![soon]()

</details>

## Installation 📥

Install my-project with npm

```bash
> git clone https://github.com/AbdelrahmanShaheen/e-commerce
> cd e-commerce/
> npm install
```

## How to use

use the scripts in package.json

```bash
> npm run start
or
> npm run start:prod
```

or

```bash
> nodemon server.js
or
> set NODE_ENV=production&&nodemon server.js
```

the backend server will be running on the specified port on your env files.

### Environment Variables

To run this project, you will need to add the following environment variables to your .env file \
\
`PORT`\
`NODE_ENV` [`development` OR `production`]\
`BASE_URL` like `http://localhost:8000`

`DB_PASS`\
`DB_USER_NAME`\
`DB_URI`

`JWT_SECRET`\
`JWT_EXPIRE_TIME`

`EMAIL_PASSWORD`\
`EMAIL_USER`

`STRIPE_SECRET`\
`STRIPE_WEBHOOK_SECRET`

## Api Docs

###### This is a detailed documentation for all api endpoints that have been implemented

[Click!](https://github.com/AbdelrahmanShaheen/e-commerce/blob/main/api-docs.md)

## ToDo

###### Here are some features that i 'll implement soon:

- [x] Reviews, Wishlist And User Addresses features

- [x] Coupons And Shopping Cart features

- [x] Cash payment And Online Orders
- [x] Credit card payment with `stripe`
- [ ] Add validation layer for coupons ,cart and orders
- [ ] Testing
- [ ] Redis for cashing
- [ ] AWS S3 for file uploading instead of using multer and server file system
