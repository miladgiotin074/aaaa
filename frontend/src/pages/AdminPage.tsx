import { useState, useEffect } from 'react';
import { TgPage } from '@/components/TgPage';
import { useNavigate } from 'react-router-dom';
import { api } from '@/utils/api';
import { LoaderCircle } from 'lucide-react';
import AdminBottomNav from '@/components/admin/AdminBottomNav';
import UsersPage from '@/pages/admin/UsersPage';
import AccountsPage from '@/pages/admin/AccountsPage';
import CountriesPage from '@/pages/admin/CountriesPage';
import ChannelsPage from '@/pages/admin/ChannelsPage';
import SettingsPage from '@/pages/admin/SettingsPage';
import PaymentsPage from '@/pages/admin/PaymentsPage';

export default function AdminPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [activeTab, setActiveTab] = useState('users');
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data } = await api.post('/check-auth');
                if (data.user.role !== 'admin') {
                    navigate('/');
                } else {
                    setIsAdmin(true);
                }
            } catch (error: any) {
                setError(error.message || 'Authentication failed');
                navigate('/');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [navigate]);

    const renderContent = () => {
        switch (activeTab) {
            case 'users':
                return <UsersPage />;
            case 'accounts':
                return <AccountsPage />;
            case 'countries':
                return <CountriesPage />;
            case 'channels':
                return <ChannelsPage />;
            case 'settings':
                return <SettingsPage />;
            case 'payments':
                return <PaymentsPage />;
            default:
                return <UsersPage />;
        }
    };

    if (loading) {
        return (
            <TgPage back={false}>
                <div className="flex justify-center items-center h-screen">
                    <LoaderCircle className='w-12 h-12 text-telegram-header animate-spin' />
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
                </div>
            </TgPage>
        );
    }

    return (
        <TgPage back={false}>
            <div className="flex flex-col h-screen">
                <div className="flex-1 py-4 px-2 overflow-y-auto">
                    {renderContent()}
                </div>
                {isAdmin && <AdminBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />}
            </div>
        </TgPage>
    );
} 