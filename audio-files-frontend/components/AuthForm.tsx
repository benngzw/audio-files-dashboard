"use client";

import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { loginClient } from '@/lib/client-actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { redirectProxy } from '@/lib/actions';

const formSchema = z.object({
  username: z.string().min(5).max(25),
  password: z.string().min(5).max(25),
})

const AuthForm = ({ backendHost }: { backendHost: string }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  })

  const onSubmit = async (credentials: any) => {
    const user = await loginClient(credentials.username, credentials.password, backendHost);

    console.log(user);
    if (user) {
      redirectProxy();
    } else {
      setErrorMessage("Invalid username or password");
    }
  }

  return (
    <section className="flex min-h-screen w-full max-w-[420px] flex-col justify-center gap-5 py-10 md:gap-8">
      <header className='flex flex-col gap-5 md:gap-8'>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-[36px] font-semibold text-gray-900">
            Sign In
          </h1>
          <p className="text-[16px] font-normal text-gray-600">
            Please enter your details
          </p>
        </div>
      </header>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder='Enter your username' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder='Enter your password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {errorMessage && (
            <FormMessage>
              {errorMessage}
            </FormMessage>
          )}
          <Button type="submit" className="w-full">Submit</Button>
        </form>
      </Form>
    </section >
  );
}

export default AuthForm