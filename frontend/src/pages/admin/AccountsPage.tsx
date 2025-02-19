import { useState, useEffect } from 'react';
import { api } from '@/utils/api';
import { LoaderCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import AccountSearchFilter from '@/components/admin/AccountSearchFilter';
import ErrorBoundary from '@/components/ErrorBoundary';

interface Account {
    _id: string;
    phone: string;
    isSettled: boolean;
    addedAt: string;
    cleanSessions: boolean;
    isSolded: boolean;
    soldAt?: string;
    soldTo?: {
        _id: string;
        firstName: string;
        lastName: string;
    };
}

interface ApiResponse {
    accounts: Account[];
    total: number;
    stats: {
        totalAccounts: number;
        settledAccounts: number;
        unsoldAccounts: number;
    };
}

export default function AccountsPage() {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalAccounts, setTotalAccounts] = useState(0);
    const [stats, setStats] = useState({
        totalAccounts: 0,
        settledAccounts: 0,
        unsoldAccounts: 0,
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [hasMore, setHasMore] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const navigate = useNavigate();

    const fetchAccounts = async (page = currentPage, limit = itemsPerPage) => {
        try {
            setIsFetching(true);
            const { data } = await api.get<ApiResponse>('/admin/accounts', {
                params: {
                    page,
                    limit,
                },
            });
            setAccounts(prev => page === 1 ? data.accounts : [...prev, ...data.accounts]);
            setTotalAccounts(data.total);
            setStats(data.stats);
            setHasMore(data.accounts.length === itemsPerPage);
        } catch (error) {
            console.error('Error fetching accounts:', error);
        } finally {
            setIsFetching(false);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAccounts();
    }, []);

    const handleSearch = async (query: string) => {
        try {
            const { data } = await api.get<ApiResponse>('/admin/accounts', {
                params: { search: query },
            });
            setAccounts(data.accounts);
            setTotalAccounts(data.total);
            setHasMore(false);
        } catch (error) {
            console.error('Error searching accounts:', error);
        }
    };

    const handleRowClick = (account: Account) => {
        navigate('/account-details', { state: { account } });
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
                <div className="pt-4">
                    <AccountSearchFilter onSearch={handleSearch} />
                    <InfiniteScroll
                        className="mb-28"
                        dataLength={accounts.length}
                        next={() => setCurrentPage(prev => prev + 1)}
                        hasMore={hasMore}
                        loader={
                            <div className="flex justify-center mt-4">
                                <LoaderCircle className="w-6 h-6 animate-spin" />
                            </div>
                        }
                        endMessage={
                            <p className="text-center text-sm text-gray-500 mt-4">
                                همه حساب‌ها نمایش داده شدند
                            </p>
                        }
                        scrollableTarget="scrollableDiv"
                        style={{ overflow: 'hidden' }}
                    >
                        <div className="space-y-2 mt-2" style={{ overflow: 'hidden' }}>
                            {accounts.map(account => (
                                <div
                                    key={account._id}
                                    className="p-4 border rounded-lg shadow-sm cursor-pointer hover:bg-gray-50"
                                    onClick={() => handleRowClick(account)}
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className='flex flex-row gap-2'>
                                                <p className="font-medium">{account.phone}</p>
                                                <p>{account.cleanSessions ? '✅' : '⚠️'}</p>
                                            </div>


                                            <p className={`text-sm ${account.isSettled ? 'text-gray-500' : 'text-yellow-500'}`}>
                                                {account.isSettled ? 'تسویه شده' : 'تسویه نشده'}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm">
                                                {account.isSolded ? 'فروخته شده' : 'فروخته نشده'}
                                            </p>

                                        </div>

                                    </div>
                                    <div className="mt-2 flex justify-between items-center text-sm">
                                        <p>تاریخ افزودن: {new Date(account.addedAt).toLocaleDateString('fa-IR')}</p>
                                        {account.soldAt && (
                                            <p className="text-sm text-gray-500">
                                                تاریخ فروش: {new Date(account.soldAt).toLocaleDateString('fa-IR')}
                                            </p>
                                        )}

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