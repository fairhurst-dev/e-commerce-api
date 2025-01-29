# e-commerce-api

## prerequisites ⬅️

You will need:

- an AWS account
- a [serverless](https://www.serverless.com/) account
- a [stripe](https://stripe.com/) account

## Try it on Postman

[Postman Documentation](https://documenter.getpostman.com/view/39373856/2sAYQiB7aZ)

To interact with the cart, orders, and checkout endpoint you need to create an account and obtain a Bearer token.

- Invoke the `register` endpoint.
- Copy the OTP sent to your email, and then invoke the `confirm` endpoint.
- If the OTP is correct, you will be returned an `AccessToken`. Set the access token as the `Bearer` token for the collection environment.

To checkout:

- Send a `POST` with a valid `id` via `cart/{id}`
- Send a `POST` to `/checkout`
- Copy the `url` to your browser and checkout via the stripe page with a [valid stripe testing method](https://docs.stripe.com/testing)

## setup 🔩

`git clone https://github.com/fairhurst-dev/e-commerce-api.git`

`cp .env.example .env`

`npm i serverless -g`

`serverless login`

## install 📦

`npm install`

## test 🧑‍🔬

`npm run test`

## deploy 🚀

`sls deploy`
