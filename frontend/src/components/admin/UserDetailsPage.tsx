import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { api } from '@/utils/api';
import { TgPage } from '@/components/TgPage';
import { ArrowLeft, CheckCircle, LoaderCircle } from 'lucide-react';

export default function UserDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(location.state?.user);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/admin');
    }
  }, [user, navigate]);

  const handleSave = async () => {
    try {
      setLoading(true);
      const response = await api.put(`/admin/users/${user._id}`, {
        role: user.role,
        isBlocked: user.isBlocked,
        balance: user.balance,
        isAuthenticated: user.isAuthenticated
      });
      console.log('Response:', response.data);
      // Optionally show success message
    } catch (error) {
      console.error('Error updating user:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (<TgPage>
    <div className="p-4 space-y-4">

      <div className="space-y-2">
        <div className='text-right'>
          <label >نام کامل</label>
        </div>

        <Input
          className='text-left'
          value={`${user.firstName} ${user.lastName}`}
          disabled
        />
      </div>

      <div className="space-y-2">
        <div className='text-right'>
          <label>نام کاربری</label>
        </div>
        <Input
          className='text-left'
          value={user.username}
          disabled
        />
      </div>

      <div className="space-y-2">
        <div className='text-right'>
          <label>شناسه تلگرام</label>
        </div>
        <Input
          className='text-left'
          value={user.telegramId}
          disabled
        />
      </div>

      <div className="space-y-2">
        <div className='text-right'>
          <label>نقش</label>
        </div>
        <Select
          value={user.role}
          onValueChange={(value) => setUser({ ...user, role: value })}
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
      </div>

      <div className="space-y-2">
        <div className='text-right'>
          <label>موجودی</label>
        </div>
        <Input
          className='text-left'
          type="number"
          value={user.balance || ''}
          onChange={(e) => setUser({ ...user, balance: e.target.value === '' ? 0 : Number(e.target.value) })}
        />
      </div>

      <div className="space-y-2">
        <div className='text-right'>
          <label>وضعیت احراز هویت</label>
        </div>
        <Select
          value={user.isAuthenticated ? 'true' : 'false'}
          onValueChange={(value) => setUser({ ...user, isAuthenticated: value === 'true' })}
        >
          <SelectTrigger>
            <SelectValue placeholder="وضعیت احراز هویت" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">تایید شده</SelectItem>
            <SelectItem value="false">تایید نشده</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <div className='text-right'>
          <label>وضعیت کاربر</label>
        </div>
        <Select
          value={user.isBlocked ? 'true' : 'false'}
          onValueChange={(value) => setUser({ ...user, isBlocked: value === 'true' })}
        >
          <SelectTrigger>
            <SelectValue placeholder="وضعیت کاربر" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">مسدود</SelectItem>
            <SelectItem value="false">فعال</SelectItem>
          </SelectContent>
        </Select>
      </div>


    </div>
    <div className="flex flex-col gap-2 mt-4 mb-10 px-4">

      <div>
        <Button className='w-full' onClick={handleSave} disabled={loading}>
          {loading ? (
            <div className="flex items-center gap-2">
              <LoaderCircle className="w-4 h-4 animate-spin" />
              <span>درحال ثبت...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>ثبت تغییرات</span>
            </div>
          )}
        </Button>
      </div>

      <div>
        <Button className='w-full' onClick={() => navigate(-1)} variant="destructive">
          <div className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            <span>بازگشت</span>
          </div>
        </Button>
      </div>

    </div>
  </TgPage>
  );
} 