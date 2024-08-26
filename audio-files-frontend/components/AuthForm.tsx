"use client";

import React, { useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';

// import { useUser } from "@/providers/UserProvider"
import { getCurrentUser, login } from '@/lib/actions/user.actions';
import { get } from 'http';

const AuthForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const { user, setUser } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(username, password);
    // try {
    //   const response = await axios.post('http://localhost:3000/auth/login', {
    //     username,
    //     password,
    //   }, {
    //     withCredentials: true
    //   })
    //   console.log(response.data);

    //   if (response) {
    //     setUser({
    //       id: response.data.id,
    //       username: response.data.username,
    //       displayName: response.data.displayName,
    //       isAdmin: response.data.isAdmin,
    //     });
    //     console.log(user);
    //     router.push('/sign-out')
    //   }
    // } catch (error) {
    //   console.error(error);
    // }

  };

  const handleLogClick = async () => {
    // const anotherResponse = await axios.get("http://localhost:3000/auth/status", {
    //   withCredentials: true
    // })
    // console.log(anotherResponse.data);
    // console.log(user);
    getCurrentUser();
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <Input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit">Submit</Button>

        <Button type="button" onClick={handleLogClick}>Log Something</Button>
      </form>
    </section>
  );
}

export default AuthForm