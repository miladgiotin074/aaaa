import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

interface SendMessageDialogProps {
  onClose: () => void;
  onSend: (message: string) => void;
}

export default function SendMessageDialog({
  onClose,
  onSend,
}: SendMessageDialogProps) {
  const [message, setMessage] = useState('');

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>ارسال پیام به کاربر</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="متن پیام خود را وارد کنید..."
            rows={5}
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              لغو
            </Button>
            <Button onClick={() => onSend(message)}>
              ارسال
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 