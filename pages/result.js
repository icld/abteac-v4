// web/pages/result.js
import { useEffect } from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useSWR from 'swr';
import PrintObject from '../components/PrintObject';
import { fetchGetJSON } from '../utils/apiHelpers';

const ResultPage = () => {
  const { clearCart } = useShoppingCart();

  const router = useRouter();
  // Fetch CheckoutSession from static page via
  // https://nextjs.org/docs/basic-features/data-fetching#static-generation
  const { data, error } = useSWR(
    router.query.session_id
      ? `/api/checkout_sessions/${router.query.session_id}`
      : null,
    fetchGetJSON
  );

  useEffect(() => {
    clearCart;
  }, []);

  if (error) {
    return <div>failed to load</div>;
  }

  return (
    <div className='px-4 mx-auto mt-12 text-center max-w-7xl sm:px-6 lg:px-8'>
      <div className='mb-4 text-4xl'>Congrats</div>
      <h1 className='mb-4 text-2xl'>Checkout Payment Result</h1>
      <div className='mb-6 text-2xl'>
        Thank you,
        <div className='text-3xl text-gray-500 capitalize - '>
          {data?.payment_intent.charges.data[0].billing_details.name}.
        </div>
      </div>
      <p className='text-xl'>
        Confirmation email sent to{' '}
        {data?.payment_intent.charges.data[0].billing_details.email}.
      </p>
    </div>
  );
};

export default ResultPage;
