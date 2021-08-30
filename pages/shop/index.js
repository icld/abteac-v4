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
    <main className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
      <Products products={products} />
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
