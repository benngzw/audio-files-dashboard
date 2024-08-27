"use client";

import React from 'react'
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { getCurrentUser, getUserAudio, logout } from '@/lib/actions';
import { loginClient } from '@/lib/client-actons';

const AuthForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (credentials: any) => {
    console.log(credentials);
    await loginClient(credentials.username, credentials.password);
  }

  const handleLogClick = async () => {
    await getCurrentUser();
    await getUserAudio();
  };

  const handleLogoutClick = async () => {
    await logout();
  };

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="username">Username:</label>
          <Input
            type="text"
            id="username"
            {...register("username")}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <Input
            type="password"
            id="password"
            {...register("password")}
          />
        </div>
        <Button type="submit">Submit</Button>

        <Button type="button" onClick={handleLogClick}>Log Something</Button>

        <Button type="button" onClick={handleLogoutClick}>Logout</Button>
      </form>
    </section>
  );
}

export default AuthForm