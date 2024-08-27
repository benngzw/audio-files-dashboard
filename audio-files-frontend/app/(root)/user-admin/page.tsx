import React from 'react'
import { getAllUsers } from '@/lib/actions';
import UserTable from '@/components/UserTable';
import CreateUserDialog from '@/components/CreateUserDialog';

const UserAdmin = async () => {
  const allUsers: User[] = await getAllUsers() || [];

  return (
    <section>
      <div>
        <h1>User Admin</h1>
        <div className="text-right">
          <CreateUserDialog />
        </div>
      </div>
      <UserTable users={allUsers} />
    </section>
  )
}

export default UserAdmin