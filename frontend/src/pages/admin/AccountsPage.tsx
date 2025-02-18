import { useState, useEffect } from 'react';
import { api } from '@/utils/api';
import { LoaderCircle } from 'lucide-react';

export default function AccountsPage() {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const { data } = await api.get('/admin/accounts');
                setAccounts(data);
            } catch (error) {
                console.error('Error fetching accounts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAccounts();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <LoaderCircle className='w-12 h-12 text-telegram-header animate-spin' />
            </div>
        );
    }

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">حساب‌ها</h1>
            <div className="space-y-4">
                {accounts.map((account) => (
                    <div key={account._id} className="bg-white p-4 rounded-lg shadow">
                        <p className="font-medium">{account.phone}</p>
                        <p className="text-sm text-gray-500">{account.isSettled ? 'تسویه شده' : 'تسویه نشده'}</p>
                    </div>
                ))}
            </div>
        </div>
    );
} 