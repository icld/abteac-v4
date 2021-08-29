import 'tailwindcss/tailwind.css';
import SimpleNav from '../components/SimpleNav';
import { CartProvider } from 'use-shopping-cart';
import CartSummary from '../components/CartSummary';
import Cart from '../components/Cart';

function MyApp({ Component, pageProps }) {
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <CartProvider
        mode='checkout-session'
        stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
        currency={'usd'}
      >
        <SimpleNav />
        <CartSummary />
        <Component {...pageProps} />
      </CartProvider>
    </div>
  );
}

export default MyApp;
