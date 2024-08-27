import React from 'react'
import { getAllUsers } from '@/lib/actions';
import UserTable from '@/components/UserTable';

const UserAdmin = async () => {
  const allUsers: User[] = await getAllUsers() || [];

  return (
    <section>
      <h1>User Admin</h1>
      <UserTable users={allUsers} />
    </section>
  )
}

export default UserAdmin