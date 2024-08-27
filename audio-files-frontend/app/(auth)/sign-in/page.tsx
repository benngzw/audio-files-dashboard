import dotenv from 'dotenv';
import React from 'react';

import AuthForm from '@/components/AuthForm';

dotenv.config();

const BACKEND_HOST = process.env.BACKEND_HOST || "http://localhost:3000";

const SignIn = () => {
  return (
    <section className='flex items-center justify-center size-full max-sm:px-6'>
      <AuthForm backendHost={BACKEND_HOST} />
    </section>
  )
}

export default SignIn