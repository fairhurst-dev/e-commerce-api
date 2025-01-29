# e-commerce-api

A serverless e-commerce REST API built with Node.js and the Serverless Framework. This API provides comprehensive endpoints for product management, user authentication, shopping cart operations, order processing, and secure checkout functionality. The system leverages AWS services (Lambda, DynamoDB, Cognito, OpenSearch) for scalable cloud infrastructure and integrates with Stripe for payment processing.

## Try it in Postman

- [Postman Documentation](https://documenter.getpostman.com/view/39373856/2sAYQiB7aZ)

## Features

- **User Registration & Authentication** - JWT-based authentication with email verification via AWS Cognito
- **Product Management** - CRUD operations for products via admin and public interfaces
- **Advanced Product Search** - Full-text search powered by OpenSearch with real-time indexing
- **Shopping Cart** - Add, remove, and manage items in user carts
- **Secure Checkout** - Stripe integration for payment processing
- **Order Management** - Track and view order history
- **Real-time Data Sync** - DynamoDB streams automatically update search indices

## API Endpoints

### User Authentication

- `POST /auth/register` - User registration
- `POST /auth/confirm` - Confirm user registration
- `POST /auth/login` - User login
- `POST /auth/refresh` - Refresh JWT tokens

### Public Product Operations

- `GET /products` - View products
- `GET /product/{id}` - View single product
- `POST /search/product?q` - Search products
- `POST /categories/product?categories` - Filter products by category

### Admin Product Operations

- `POST /product` - Create product
- `PATCH /product/{id}` - Update product

### Cart Operations

- `GET /cart` - Get cart
- `POST /cart/{id}` - Add item to cart
- `DELETE /cart/{id}` - Remove item from cart

### Checkout

- `POST /checkout` - Start checkout session

### Order Management

- `GET /orders` - View orders
- `GET /order/{cartUUID}` - View single order

## Prerequisites

- Node.js 20.x or higher
- AWS CLI configured with appropriate credentials
- Serverless Framework CLI (`npm install -g serverless`)
- A [Stripe](stripe.com) account

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/fairhurst-dev/e-commerce-api.git
   cd e-commerce-api
   ```

2. Copy the environment variables example and configure them:

   ```bash
   cp .env.example .env
   # Edit `.env` and configure STRIPE_WEBHOOK_SECRET, STRIPE_SK, and DOMAIN
   ```

3. Install Serverless globally:

   ```bash
   npm install serverless -g
   serverless login
   ```

4. Install project dependencies:

   ```bash
   npm install
   ```

5. Configure AWS credentials:
   ```bash
   aws configure
   ```

## Deployment

### Deploy to Development

```bash
serverless deploy
```

### Deploy to Production

```bash
serverless deploy --stage prod
```

## Testing

Run tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run watch
```

### Obtain a Bearer Token

- Register using the `POST /auth/register`.
- Confirm registration via the `POST /auth/confirm` endpoint with the OTP sent to your email.
- Use the returned `AccessToken` as the Bearer token to interact with protected endpoints.

## Scripts

- **Lint:** `npm run lint`
- **Test:** `npm run test`
- **Build:** `npx sls package`
- **Deploy Dev:** `npx sls deploy`
- **Deploy Prod:** `npx sls deploy --stage=prod`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## Support

For support, please open an issue in the [GitHub repository](https://github.com/fairhurst-dev/e-commerce-api/issues).

## Author

**fairhurst.dev**

- GitHub: [@fairhurst-dev](https://github.com/fairhurst-dev)
- Website: [fairhurst.dev](https://fairhurst.dev)
