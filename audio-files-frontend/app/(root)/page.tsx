// "use client";

import { useUser } from '@/providers/UserProvider';
import { redirect } from 'next/navigation';
import React from 'react'

const Home = () => {
  // const { user } = useUser();
  // if (!user) redirect("/sign-in");

  return (
    <section>
      <h1>Home</h1>
    </section>
  )
}

export default Home