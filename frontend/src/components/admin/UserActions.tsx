import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Shield, Lock, Unlock, MessageCircle } from 'lucide-react';
import ChangeRoleDialog from './ChangeRoleDialog';
import SendMessageDialog from './SendMessageDialog';

interface UserActionsProps {
  user: {
    _id: string;
    role: string;
    isBlocked: boolean;
  };
  onRoleChange: (newRole: string) => void;
  onBlockToggle: () => void;
  onSendMessage: (message: string) => void;
}

export default function UserActions({
  user,
  onRoleChange,
  onBlockToggle,
  onSendMessage,
}: UserActionsProps) {
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const [showMessageDialog, setShowMessageDialog] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setShowRoleDialog(true)}>
            <Shield className="w-4 h-4 mr-2" />
            تغییر نقش
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onBlockToggle}>
            {user.isBlocked ? (
              <>
                <Unlock className="w-4 h-4 mr-2" />
                رفع مسدودیت
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 mr-2" />
                مسدود کردن
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowMessageDialog(true)}>
            <MessageCircle className="w-4 h-4 mr-2" />
            ارسال پیام
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {showRoleDialog && (
        <ChangeRoleDialog
          currentRole={user.role}
          onClose={() => setShowRoleDialog(false)}
          onConfirm={onRoleChange}
        />
      )}

      {showMessageDialog && (
        <SendMessageDialog
          onClose={() => setShowMessageDialog(false)}
          onSend={onSendMessage}
        />
      )}
    </>
  );
} 