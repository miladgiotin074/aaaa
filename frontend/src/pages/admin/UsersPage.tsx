import { useState, useEffect, useCallback } from 'react';
import { api } from '@/utils/api';
import { LoaderCircle, UserCheck, UserX, UserCog, CheckCircle, XCircle } from 'lucide-react';
import ErrorBoundary from '@/components/ErrorBoundary';
import UserSearchFilter from '@/components/admin/UserSearchFilter';
import { Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Chip } from '@mui/material';

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    telegramId: number;
    role: string;
    createdAt: string;
    balance: number;
    isBlocked: boolean;
    isAuthenticated: boolean;
}

interface ApiResponse {
    users: User[];
    total: number;
    stats: {
        totalUsers: number;
        activeUsers: number;
        blockedUsers: number;
        roleDistribution: {
            admin: number;
            moderator: number;
            user: number;
        };
    };
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalUsers, setTotalUsers] = useState(0);
    const [stats, setStats] = useState({
        totalUsers: 0,
        activeUsers: 0,
        blockedUsers: 0,
        roleDistribution: {
            admin: 0,
            moderator: 0,
            user: 0,
        },
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [hasMore, setHasMore] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const navigate = useNavigate();

    const fetchUsers = async (page = currentPage, limit = itemsPerPage) => {
        try {
            setIsFetching(true);
            const { data } = await api.get<ApiResponse>('/admin/users', {
                params: {
                    page,
                    limit,
                },
            });
            setUsers(prev => page === 1 ? data.users : [...prev, ...data.users]);
            setTotalUsers(data.total);
            setStats(data.stats);
            setHasMore(data.users.length === itemsPerPage);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setIsFetching(false);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleScroll = useCallback(() => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        console.log('Scroll position:', scrollTop + clientHeight, scrollHeight);

        // اگر 50px مانده به پایین صفحه بودیم، لود کنیم
        if (scrollTop + clientHeight >= scrollHeight - 50 && !isFetching && hasMore) {
            console.log('Loading more users...');
            setCurrentPage(prev => prev + 1);
        }
    }, [isFetching, hasMore]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    useEffect(() => {
        if (currentPage > 1) {
            fetchUsers(currentPage);
        }
    }, [currentPage]);

    const handleSearch = async (query: string) => {
        try {
            const { data } = await api.get<ApiResponse>('/admin/users', {
                params: { search: query },
            });
            setUsers(data.users);
            setTotalUsers(data.total);
            setHasMore(false);
        } catch (error) {
            console.error('Error searching users:', error);
        }
    };

    const handleRowClick = (user: User) => {
        navigate('/user-details', { state: { user } });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <LoaderCircle className='w-12 h-12 text-telegram-header animate-spin' />
            </div>
        );
    }

    return (
        <ErrorBoundary>
            <div className="h-screen overflow-auto" id="scrollableDiv">
                <UserStats {...stats} />
                <div className="pt-4">
                    <UserSearchFilter onSearch={handleSearch} />
                    <InfiniteScroll
                        className="mb-28"
                        dataLength={users.length}
                        next={() => setCurrentPage(prev => prev + 1)}
                        hasMore={hasMore}
                        loader={
                            <div className="flex justify-center mt-4">
                                <LoaderCircle className="w-6 h-6 animate-spin" />
                            </div>
                        }
                        endMessage={
                            <p className="text-center text-sm text-gray-500 mt-4">
                                همه کاربران نمایش داده شدند
                            </p>
                        }
                        scrollableTarget="scrollableDiv"
                        style={{ overflow: 'hidden' }}
                    >
                        <div className="space-y-2 mt-2" style={{ overflow: 'hidden' }}>
                            {users.map(user => (
                                <div
                                    key={user._id}
                                    className="p-4 border rounded-lg shadow-sm cursor-pointer hover:bg-gray-50"
                                    onClick={() => handleRowClick(user)}
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="flex items-center gap-1">
                                                <p className="font-medium">{user.firstName} {user.lastName}</p>
                                                {user.isAuthenticated ? (
                                                    <span className="text-green-500 text-sm">✅</span>
                                                ) : (
                                                    <span className="text-orange-300 text-sm">⚠️</span>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-500">@{user.username}<p className='text-telegram-header'>{user.telegramId}</p></p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm">
                                                {user.role === 'admin' ? 'مدیر' :
                                                    user.role === 'moderator' ? 'ناظر' :
                                                        'کاربر'}
                                            </p>
                                            <p className={`text-sm ${user.isBlocked ? 'text-red-500' : 'text-green-500'}`}>
                                                {user.isBlocked ? 'مسدود' : 'فعال'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-2 flex justify-between items-center text-sm">
                                        <p>موجودی: {user.balance.toLocaleString('fa-IR')}</p>
                                        <p>تاریخ عضویت: {new Date(user.createdAt).toLocaleDateString('fa-IR')}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </InfiniteScroll>
                </div>
            </div>
        </ErrorBoundary>
    );
}

const UserStats = ({ totalUsers, activeUsers, blockedUsers, roleDistribution }: any) => {
    return (
        <div className="space-y-6 pt-4">
            {/* Combined Stats Card */}
            <div className="px-6">
                <div className="grid grid-cols-3 gap-4">
                    {/* Total Users */}
                    <div className="flex flex-col items-center p-4 rounded-lg bg-blue-50">
                        <div className="p-3 bg-blue-100 rounded-full">
                            <Users className="w-6 h-6 text-blue-500" />
                        </div>
                        <div className='flex flex-col items-center pt-2'>
                            <p className="text-sm text-gray-600">کاربران</p>
                            <p className="font-medium text-lg text-blue-700">
                                {totalUsers.toLocaleString('fa-IR')}
                            </p>
                        </div>
                    </div>

                    {/* Active Users */}
                    <div className="flex flex-col items-center p-4 rounded-lg bg-green-50">
                        <div className="p-3 bg-green-100 rounded-full">
                            <UserCheck className="w-6 h-6 text-green-500" />
                        </div>
                        <div className='flex flex-col items-center pt-2'>
                            <p className="text-sm text-gray-600">فعال</p>
                            <p className="font-medium text-lg text-green-700">
                                {activeUsers.toLocaleString('fa-IR')}
                            </p>
                        </div>
                    </div>

                    {/* Blocked Users */}
                    <div className="flex flex-col items-center p-4 rounded-lg bg-red-50">
                        <div className="p-3 bg-red-100 rounded-full">
                            <UserX className="w-6 h-6 text-red-500" />
                        </div>
                        <div className='flex flex-col items-center pt-2 text-center'>
                            <p className="text-sm text-gray-600">مسدود</p>
                            <p className="font-medium text-lg text-red-700">
                                {blockedUsers.toLocaleString('fa-IR')}
                            </p>
                        </div>
                    </div>

                    {/* Admins */}
                    <div className="flex flex-col items-center p-4 rounded-lg bg-purple-50">
                        <div className="p-3 bg-purple-100 rounded-full">
                            <UserCog className="w-6 h-6 text-purple-500" />
                        </div>
                        <div className='flex flex-col items-center pt-2 text-center'>
                            <p className="text-sm text-gray-600">ادمین</p>
                            <p className="font-medium text-lg text-purple-700">
                                {roleDistribution.admin.toLocaleString('fa-IR')}
                            </p>
                        </div>
                    </div>

                    {/* Moderators */}
                    <div className="flex flex-col items-center p-4 rounded-lg bg-orange-50">
                        <div className="p-3 bg-orange-100 rounded-full">
                            <UserCog className="w-6 h-6 text-orange-500" />
                        </div>
                        <div className='flex flex-col items-center pt-2 text-center'>
                            <p className="text-sm text-gray-600">ناظر</p>
                            <p className="font-medium text-lg text-orange-700">
                                {roleDistribution.moderator.toLocaleString('fa-IR')}
                            </p>
                        </div>
                    </div>

                    {/* Regular Users */}
                    <div className="flex flex-col items-center p-4 rounded-lg bg-teal-50">
                        <div className="p-3 bg-teal-100 rounded-full">
                            <UserCog className="w-6 h-6 text-teal-500" />
                        </div>
                        <div className='flex flex-col items-center pt-2 text-center'>
                            <p className="text-sm text-gray-600">عادی</p>
                            <p className="font-medium text-lg text-teal-700">
                                {roleDistribution.user.toLocaleString('fa-IR')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}; 