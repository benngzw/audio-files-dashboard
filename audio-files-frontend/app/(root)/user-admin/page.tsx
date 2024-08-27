import React from 'react'
import { deleteUser, getAllUsers } from '@/lib/actions';
import UserListItem from '@/components/UserListItem'

const UserAdmin = async () => {
  const allUsers: User[] | null = await getAllUsers();

  const handleDelete = async (userId: string) => {
    try {
      await deleteUser(userId);
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  return (
    <section><h1>User Admin</h1>
      <ul>
        {allUsers && allUsers.length > 0 ? (
          allUsers.map((user: User) => (
            <UserListItem key={user.id} user={user} />
          ))
        ) : null}
      </ul></section>
  )
}

export default UserAdmin