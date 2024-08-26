"use client";

import React, { useState } from 'react'
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { useAuth } from '@/providers/AuthProvider';

const AuthForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("I am here");
    auth.loginAction(username, password);
    // const response = await axios.post('http://localhost:3000/auth/login', {
    //   username,
    //   password,
    // }, {
    //   withCredentials: true
    // })
    // console.log(response.data);
    // const anotherResponse = await axios.get("http://localhost:3000/auth/status", {
    //   withCredentials: true
    // })
    // console.log(anotherResponse.data);
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
      </form>
    </section>
  );
}

export default AuthForm