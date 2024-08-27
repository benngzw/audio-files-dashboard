import React from 'react'
import { getAllUsers, getCurrentUser } from '@/lib/actions';
import UserTable from '@/components/UserTable';
import CreateUserDialog from '@/components/CreateUserDialog';
import { redirect } from 'next/navigation';

const UserAdmin = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser?.isAdmin) redirect("/");
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