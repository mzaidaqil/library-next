import BookList from '@/components/BookList';
import React from 'react'
import { signOut } from '@/auth';
import { Button } from '@/components/ui/button';
import { sampleBooks } from '@/app/constants';

const page = () => {
   return (
     <>
     <form action = {async() =>{
        'use server';
        await signOut();
    }}>
        <Button>Logout</Button>
    </form>

    <BookList title ='Borrowed Books' books ={sampleBooks}/>
     </>
   )
 }
 
 export default page
 