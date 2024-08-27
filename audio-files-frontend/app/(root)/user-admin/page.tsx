import React from 'react'
import { getAllUsers } from '@/lib/actions';
import UserTable from '@/components/UserTable';
import CreateUserDialog from '@/components/CreateUserDialog';

const UserAdmin = async () => {
  const allUsers: User[] = await getAllUsers() || [];

  return (
    <section>
      <h1>User Admin</h1>
      <UserTable users={allUsers} />
      <CreateUserDialog />
    </section>
  )
}

export default UserAdmin