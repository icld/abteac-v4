import { ImSpinner11 } from 'react-icons/im';

const Loading = () => {
  return (
    // <div className='fixed top-0 left-0 z-50 block w-full h-full bg-white opacity-75'>
    // <div
    //   className='relative block w-0 h-0 mx-auto my-0 text-green-500 opacity-75 top-1/2'
    //   style='
    //       top: 50%;
    //   '
    // >
    //   <div>Spinning</div>
    <div className='flex flex-col items-center justify-center w-full mt-48 h-ful'>
      <h2 className='mb-16 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
        A Blog to End All Confusion
      </h2>
      <ImSpinner11 className='text-6xl animate-spin' />
    </div>
    // </div>
    // </div>
  );
};

export default Loading;
