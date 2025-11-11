import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const TooFastPage = () => {
  return (
    <main className="root-container flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6 text-center max-w-md">
        <Image src="/icons/logo.svg" alt="logo" width={60} height={60} />
        
        <h1 className="text-4xl font-semibold text-white">Whoa, slow down! 🚦</h1>
        
        <p className="text-light-100 text-lg">
          You've made too many requests. We've temporarily limited your access to protect our system.
        </p>
        
        <p className="text-light-200">
          Please wait a moment before trying again.
        </p>
        
        <Link 
          href="/sign-in"
          className="mt-4 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
        >
          Back to Sign In
        </Link>
      </div>
    </main>
  );
};

export default TooFastPage;

