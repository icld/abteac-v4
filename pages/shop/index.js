// pages/merch/index.js

import Link from 'next/link';
import Cart from '../../components/Cart';
import CartSummary from '../../components/CartSummary';
import Products from '../../components/Products';
import { client } from '../../lib/sanity/client';
import { merchQuery } from '../../lib/sanity/merchQuery';
import SimpleNav from '../../components/SimpleNav';

const Merch = ({ products }) => {
  console.log(products);

  return (
    <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      {/* <SimpleNav /> */}
      <h1>My Merch Store</h1>
      <p>
        Powered by the{' '}
        <a href='https://useshoppingcart.com'>use-shopping-cart</a> React hooks
        library.
      </p>
      {/* <Cart> */}
      <Products products={products} />
      {/* <CartSummary /> */}
      {/* </Cart> */}
      <Link href='/'>
        <a>Back Home</a>
      </Link>
    </main>
  );
};

export default Merch;

export async function getStaticProps({ params }) {
  let products;
  products = await client.fetch(merchQuery);

  if (!products) {
    console.log('nothing returned ');
  } else {
    return {
      props: {
        products,
      },
    };
  }
}
