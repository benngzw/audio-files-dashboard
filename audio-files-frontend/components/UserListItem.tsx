"use client";

import { deleteUser } from "@/lib/actions";

const UserListItem = ({ user }: { user: User }) => {
  const handleDelete = async (userId: string) => {
    try {
      await deleteUser(userId);
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  return (
    <li>
      {user.username} - {user.displayName} - {user.isAdmin ? "Admin" : "User"}
      <button onClick={() => handleDelete(user.id)}>Delete</button>
    </li>
  );
};

export default UserListItem;