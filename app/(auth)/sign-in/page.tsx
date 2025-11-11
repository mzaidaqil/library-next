'use client';

import React from 'react';
import AuthForm from '@/components/AuthForm';
import { signInSchema } from '@/lib/validation';
import { signInWithCredentials } from '@/lib/actions/auth';

const page = () => (
  <AuthForm
    type="sign-in"
    schema={signInSchema}
    defaultValues={{
      email: '',
      password: '',
    }}
    onSubmit={signInWithCredentials}
  />
);

export default page;
