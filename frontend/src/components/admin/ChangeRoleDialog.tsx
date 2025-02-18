import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ChangeRoleDialogProps {
  currentRole: string;
  onClose: () => void;
  onConfirm: (newRole: string) => void;
}

export default function ChangeRoleDialog({
  currentRole,
  onClose,
  onConfirm,
}: ChangeRoleDialogProps) {
  const [selectedRole, setSelectedRole] = useState(currentRole);

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>تغییر نقش کاربر</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Select
            value={selectedRole}
            onValueChange={setSelectedRole}
          >
            <SelectTrigger>
              <SelectValue placeholder="انتخاب نقش" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">مدیر</SelectItem>
              <SelectItem value="moderator">ناظر</SelectItem>
              <SelectItem value="user">کاربر</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              لغو
            </Button>
            <Button onClick={() => onConfirm(selectedRole)}>
              تایید
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 