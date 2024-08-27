"use client";

import { Button } from '@/components/ui/button';
import React from 'react'

const SignOut = () => {
  const handleLogClick = async () => {
    // const anotherResponse = await axios.get("http://localhost:3000/auth/status", {
    //   withCredentials: true
    // })
    // console.log(anotherResponse.data);
  };

  return (
    <section>
      <Button type="button" onClick={handleLogClick}>Log Something</Button>
    </section>
  )
}

export default SignOut