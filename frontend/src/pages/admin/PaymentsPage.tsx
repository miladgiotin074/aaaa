import { useState, useEffect } from 'react';
import { api } from '@/utils/api';
import { LoaderCircle } from 'lucide-react';

export default function PaymentsPage() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const { data } = await api.get('/admin/payments');
                setPayments(data);
            } catch (error) {
                console.error('Error fetching payments:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
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
            <h1 className="text-xl font-bold mb-4">پرداخت‌ها</h1>
            <div className="space-y-4">
                {payments.map((payment) => (
                    <div key={payment._id} className="bg-white p-4 rounded-lg shadow">
                        <p className="font-medium">{payment.amount}</p>
                        <p className="text-sm text-gray-500">{payment.status}</p>
                    </div>
                ))}
            </div>
        </div>
    );
} 