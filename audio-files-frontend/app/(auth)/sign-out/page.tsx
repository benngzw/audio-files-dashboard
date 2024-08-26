"use client";

import { Button } from '@/components/ui/button';
import { useUser } from '@/providers/UserProvider';
import { redirect } from 'next/navigation';
import React from 'react'

const SignOut = () => {
  const { user } = useUser();
  if (!user) redirect("/sign-in");

  const handleLogClick = async () => {
    // const anotherResponse = await axios.get("http://localhost:3000/auth/status", {
    //   withCredentials: true
    // })
    // console.log(anotherResponse.data);
    console.log(user);
  };

  return (
    <section>
      <Button type="button" onClick={handleLogClick}>Log Something</Button>
    </section>
  )
}

export default SignOut