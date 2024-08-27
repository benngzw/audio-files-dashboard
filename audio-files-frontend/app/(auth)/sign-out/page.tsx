"use client";

import { Button } from '@/components/ui/button';
import React from 'react'

const SignOut = () => {
  const handleLogClick = async () => {
  };

  return (
    <section>
      <Button type="button" onClick={handleLogClick}>Log Something</Button>
    </section>
  )
}

export default SignOut