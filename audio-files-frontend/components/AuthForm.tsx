"use client";

import React, { useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';

// import { useUser } from "@/providers/UserProvider"
import { getCurrentUser, getUserAudio, login, logout } from '@/lib/actions';
import { get } from 'http';

const AuthForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const { user, setUser } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(username, password);
  };

  const handleLogClick = async () => {
    await getCurrentUser();
    await getUserAudio();
  };

  const handleLogoutClick = async () => {
    await logout();
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

        <Button type="button" onClick={handleLogoutClick}>Logout</Button>
      </form>
    </section>
  );
}

export default AuthForm