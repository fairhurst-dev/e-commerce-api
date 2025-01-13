import Stripe from "stripe";

console.log("stripe Key", process.env.STRIPE_SK);
export const stripe = new Stripe(process.env.STRIPE_SK);
