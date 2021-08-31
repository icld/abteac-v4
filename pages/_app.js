import Head from 'next/head';
import 'tailwindcss/tailwind.css';
import SimpleNav from '../components/SimpleNav';
import { CartProvider } from 'use-shopping-cart';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>abteac</title>
        <meta
          name='description'
          content='An amazing blog to end all of your confusion'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <CartProvider
          mode='checkout-session'
          stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
          currency={'usd'}
        >
          <SimpleNav />
          {/* <CartSummary /> */}
          <Component {...pageProps} />
          <Footer />
        </CartProvider>
      </div>
    </>
  );
}

export default MyApp;
