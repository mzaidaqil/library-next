import React from 'react';
import Header from '@/components/Header';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (!session){
    redirect('/sign-in');
  };
  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl">
        <Header session ={session}/>
        {children}
        <div className="mt-20 pb-20"></div>
      </div>
    </main>
  );
};

export default layout;
