import { useState, useEffect } from 'react';
import Head from 'next/head';
import 'tailwindcss/tailwind.css';
import SimpleNav from '../components/SimpleNav';
import { CartProvider } from 'use-shopping-cart';
import Footer from '../components/Footer';
import Loading from '../components/Loading';

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      console.log('done loading');
      setLoading(false);
    }, 2000);
  }, []);

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
      {loading ? (
        <Loading />
      ) : (
        <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
          <CartProvider
            mode='checkout-session'
            stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
            currency={'usd'}
          >
            <>
              <SimpleNav />
              <Component {...pageProps} />
              <Footer />
            </>
          </CartProvider>
        </div>
      )}
    </>
  );
}

export default MyApp;
