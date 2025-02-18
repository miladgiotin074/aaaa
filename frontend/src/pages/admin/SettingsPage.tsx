import { useState, useEffect } from 'react';
import { api } from '@/utils/api';
import { LoaderCircle } from 'lucide-react';

export default function SettingsPage() {
    const [settings, setSettings] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const { data } = await api.get('/admin/settings');
                setSettings(data);
            } catch (error) {
                console.error('Error fetching settings:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
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
            <h1 className="text-xl font-bold mb-4">تنظیمات</h1>
            <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow">
                    <p className="font-medium">تنظیمات عمومی</p>
                    <p className="text-sm text-gray-500">در حال توسعه...</p>
                </div>
            </div>
        </div>
    );
} 