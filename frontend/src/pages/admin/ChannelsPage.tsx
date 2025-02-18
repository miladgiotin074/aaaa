import { useState, useEffect } from 'react';
import { api } from '@/utils/api';
import { LoaderCircle } from 'lucide-react';

export default function ChannelsPage() {
    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchChannels = async () => {
            try {
                const { data } = await api.get('/admin/channels');
                setChannels(data);
            } catch (error) {
                console.error('Error fetching channels:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchChannels();
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
            <h1 className="text-xl font-bold mb-4">کانال‌ها</h1>
            <div className="space-y-4">
                {channels.map((channel) => (
                    <div key={channel._id} className="bg-white p-4 rounded-lg shadow">
                        <p className="font-medium">{channel.channelName}</p>
                        <p className="text-sm text-gray-500">{channel.channelLink}</p>
                    </div>
                ))}
            </div>
        </div>
    );
} 