"use client"

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import UserTableItem from "./UserTableItem";

const UserTable = ({ users }: { users: User[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">Username</TableHead>
          <TableHead className="w-[150px]">Role</TableHead>
          <TableHead className="w-[200px]">Display Name</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users && users.length > 0 ? (
          users.map((user: User) => (
            <UserTableItem user={user} />
          ))
        ) : null}
      </TableBody>
    </Table>
  );
};

export default UserTable;