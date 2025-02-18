import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import UserDetailsModal from './UserDetailsModal';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  telegramId: number;
  role: string;
  createdAt: string;
  balance: number;
}

interface UserTableProps {
  users: User[];
  onRoleChange: (userId: string, newRole: string) => void;
  onBlockToggle: (userId: string, isBlocked: boolean) => void;
}

export default function UserTable({ users, onRoleChange, onBlockToggle }: UserTableProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>عملیات</TableHead>
            <TableHead>
              <Button variant="ghost" className="p-0">
                نام
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" className="p-0">
                نام کاربری
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" className="p-0">
                شناسه تلگرام
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" className="p-0">
                نقش
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" className="p-0">
                تاریخ عضویت
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" className="p-0">
                موجودی
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedUser(user)}
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </TableCell>
              <TableCell>{user.firstName} {user.lastName}</TableCell>
              <TableCell>@{user.username}</TableCell>
              <TableCell>{user.telegramId}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{new Date(user.createdAt).toLocaleDateString('fa-IR')}</TableCell>
              <TableCell>{user.balance.toLocaleString('fa-IR')} تومان</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onRoleChange={onRoleChange}
          onBlockToggle={onBlockToggle}
        />
      )}
    </>
  );
} 