import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, UserX } from 'lucide-react';

interface UserStatsProps {
  totalUsers: number;
  activeUsers: number;
  blockedUsers: number;
  roleDistribution: {
    admin: number;
    moderator: number;
    user: number;
  };
}

export default function UserStats({
  totalUsers,
  activeUsers,
  blockedUsers,
  roleDistribution = { admin: 0, moderator: 0, user: 0 },
}: UserStatsProps) {
  return (
    <div className="space-y-2">
      <Card>
        <div className="flex justify-between pt-4 px-4">
          <div className="flex flex-col gap-1 items-center">
            <Users className="h-6 w-6 text-muted-foreground" />
            <CardTitle className="text-sm font-medium mt-2">کل کاربران</CardTitle>
            <CardContent className="text-2xl font-bold">{totalUsers}</CardContent>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <UserCheck className="h-6 w-6 text-muted-foreground" />
            <CardTitle className="text-sm font-medium mt-2">کاربران فعال</CardTitle>
            <CardContent className="text-2xl text-green-500 font-bold">{activeUsers}</CardContent>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <UserX className="h-6 w-6 text-muted-foreground" />
            <CardTitle className="text-sm font-medium mt-2">کاربران مسدود</CardTitle>
            <CardContent className="text-2xl font-bold text-red-400">{blockedUsers}</CardContent>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex justify-between pb-2 pt-4 px-4">
          <div className="flex flex-col gap-1 items-center">
            <CardTitle className="text-sm font-medium mt-2">مدیران</CardTitle>
            <CardContent className="text-2xl font-bold">{roleDistribution.admin}</CardContent>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <CardTitle className="text-sm font-medium mt-2">ناظران</CardTitle>
            <CardContent className="text-2xl font-bold">{roleDistribution.moderator}</CardContent>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <CardTitle className="text-sm font-medium mt-2">کاربران</CardTitle>
            <CardContent className="text-2xl font-bold">{roleDistribution.user}</CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
} 