import { stripe } from "#lib/services/stripe/client.js";
import { createOrder } from "#lib/services/dynamodb/index.js";

export const handler = async (event) => {
  const payload = event.body;
  const sig = event.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  try {
    const stripeEvent = stripe.webhooks.constructEvent(
      payload,
      sig,
      endpointSecret
    );
    await createOrder(stripeEvent.data.object);
  } catch (err) {
    console.error(err);
    return {
      statusCode: 400,
    };
  }

  return {
    statusCode: 200,
  };
};
