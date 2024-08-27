import {
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { deleteUser } from "@/lib/actions";
import { Button } from "./ui/button";
import UpdateUserDialog from "./UpdateUserDialog";

const UserTableItem = ({ user }: { user: User }) => {
  const handleDelete = async (userId: string) => {
    try {
      await deleteUser(userId);
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{user.username}</TableCell>
      <TableCell>{user.isAdmin ? "Admin" : "User"}</TableCell>
      <TableCell>{user.displayName}</TableCell>
      <TableCell className="text-right">
        <UpdateUserDialog user={user} />
        <Button className="mx-2" onClick={() => handleDelete(user.id)}>Delete</Button>
      </TableCell>
    </TableRow>
  )
}

export default UserTableItem;