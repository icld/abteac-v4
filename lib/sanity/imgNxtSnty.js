import { client } from './client';
import { useNextSanityImage } from 'next-sanity-image';
import { useState, useEffect } from 'react';

function useNxtSntyImg(img) {
  const [newImg, setNewImg] = useState('');

  setNewImg(useNextSanityImage(client));

  return newImg;
}

export default nxtSntyImg;
