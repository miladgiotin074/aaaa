import { useEffect, useState } from 'react';
import { TgPage } from '@/components/TgPage';
import { api } from '@/utils/api';
import { LoaderCircle, Plus, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { telegramService } from '@/services/telegramService';

interface Account {
    phone: string;
    addedAt: string;
    isSettled: boolean;
    cleanSessions: boolean;
    sessionKey: string;
}

interface AuthResponse {
    valid: boolean;
    user: {
        id: number;
        role: string;
        username: string;
    };
    accounts: {
        phone: string;
        addedAt: string;
        isSettled: boolean;
        cleanSessions: boolean;
        sessionKey: string;
    }[];
}

function getFarsiErrorMessage(error: string): string {
    return error; // Default to returning the original error
}

function AddAccount() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [authError, setAuthError] = useState<'unauthorized' | 'forbidden' | null>(null);
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const navigate = useNavigate();
    const [checkLoading, setCheckLoading] = useState(false);
    const [checkError, setCheckError] = useState<string | null>(null);

    useEffect(() => {
        // Wait for fonts to load
        document.fonts.ready.then(() => {
            setFontsLoaded(true);
        });
    }, []);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                if (fontsLoaded) {
                    const { data } = await api.post<AuthResponse>('/check-auth');
                    console.log("data :", data);
                    setAccounts(data.accounts || []);
                    setLoading(false);
                }
            } catch (error: any) {
                console.error('Auth check error:', error);
                if (error.status === 401) {
                    setAuthError('unauthorized');
                } else if (error.status === 403) {
                    setAuthError('forbidden');
                } else {
                    setError(error.message || 'Authentication failed');
                }
                setLoading(false);
            }
        };

        checkAuth();
    }, [fontsLoaded]); // Add fontsLoaded as dependency

    const handleCheckSessionTermination = async (account: Account) => {
        setCheckLoading(true);
        setCheckError(null);

        try {
            const activeSessions = await telegramService.getActiveSessionsWithKey(account.sessionKey);
            const otherSessions = activeSessions.filter(session => !session.current);

            if (otherSessions.length === 0) {
                await api.post('/update-sessions', {
                    phone: account.phone,
                    cleanSessions: true
                });

                setAccounts(prevAccounts => prevAccounts.map(acc =>
                    acc.phone === account.phone ? { ...acc, cleanSessions: true } : acc
                ));

                setCheckError('✅ تمام نشست‌های دیگر با موفقیت خاتمه یافتند.');
            } else {
                setCheckError(`⚠️ هنوز ${otherSessions.length} نشست فعال دیگر وجود دارد. لطفاً آنها را خاتمه دهید.`);
            }
        } catch (err: any) {
            const errorMessage = getFarsiErrorMessage(err.message);
            setCheckError(errorMessage);
        } finally {
            setCheckLoading(false);
        }
    };

    if (loading || !fontsLoaded) {
        return (
            <TgPage back={false}>
                <div className="flex justify-center items-center h-screen">
                    <LoaderCircle className='w-12 h-12 text-telegram-header animate-spin' />
                </div>
            </TgPage>
        );
    }

    if (authError === 'unauthorized') {
        return (
            <TgPage back={false}>
                <div className="flex flex-col justify-center items-center h-screen p-4 text-center">
                    <h1 className="text-2xl font-bold mb-4">⚠️ Unauthorized</h1>
                </div>
            </TgPage>
        );
    }

    if (authError === 'forbidden') {
        return (
            <TgPage back={false}>
                <div className="flex flex-col justify-center items-center h-screen p-4 text-center">
                    <h1 className="text-2xl font-bold mb-4">⛔️ Forbidden</h1>
                    <p>You don't have permission to access this page</p>
                </div>
            </TgPage>
        );
    }

    if (error) {
        return (
            <TgPage back={false}>
                <div className="flex flex-col justify-center items-center h-screen p-4 text-center">
                    <h1 className="text-2xl font-bold mb-4">⚠️ Error</h1>
                    <p className="text-red-500 mb-4">{error}</p>
                    <p className="text-gray-600">🔄 Please try again later or contact support</p>
                </div>
            </TgPage>
        );
    }

    return (
        <TgPage back={false}>
            <div className="p-4">
                <div className="space-y-4">
                    {accounts.map((account) => (
                        <div key={account.phone} className="bg-white p-4 rounded-lg shadow">
                            <div className="flex justify-between items-center">
                                <div className='flex flex-col gap-2'>
                                    <p className="font-medium">{account.phone}</p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(account.addedAt).toLocaleString()}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 justify-center items-center">
                                    {account.isSettled && (
                                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                                            تسویه شده
                                        </span>
                                    )}
                                    {account.cleanSessions && (
                                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                                            لاگین موفق
                                        </span>
                                    )}

                                </div>
                            </div>
                            {!account.cleanSessions && (
                                <div className="mt-4">
                                    <button
                                        onClick={() => handleCheckSessionTermination(account)}
                                        disabled={checkLoading}
                                        className="w-full bg-telegram-header text-white px-2 py-3 rounded disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {checkLoading ? (
                                            <LoaderCircle className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <>
                                                <span>بررسی خاتمه نشست</span>
                                                <Shield className="w-5 h-5" />
                                            </>
                                        )}
                                    </button>
                                    {checkError && (
                                        <div className="mt-4 rtl p-2 text-center bg-red-100 text-red-600 rounded">
                                            {checkError}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="fixed bottom-8 right-8">
                    <button
                        onClick={() => navigate('/login')}
                        className="bg-telegram-header text-white rounded-full p-4 shadow-lg transition-colors"
                    >
                        <Plus className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </TgPage>
    );
}

export default AddAccount;
