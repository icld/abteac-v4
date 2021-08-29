// web/lib/stripe/getStripe.js

import { loadStripe } from '@stripe/stripe-js';

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    // console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  }

  return stripePromise;
  // return ;
};

export default getStripe;
