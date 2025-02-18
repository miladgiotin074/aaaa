import { Users, Phone, Globe, Home, Settings, CreditCard } from 'lucide-react';

interface AdminBottomNavProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export default function AdminBottomNav({ activeTab, setActiveTab }: AdminBottomNavProps) {
    const navItems = [
        { id: 'users', icon: Users, label: 'کاربران' },
        { id: 'accounts', icon: Phone, label: 'حساب‌ها' },
        { id: 'countries', icon: Globe, label: 'کشورها' },
        { id: 'channels', icon: Home, label: 'کانال‌ها' },
        { id: 'settings', icon: Settings, label: 'تنظیمات' },
        { id: 'payments', icon: CreditCard, label: 'پرداخت‌ها' },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
            <div className="flex justify-around items-center p-2">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`flex flex-col items-center p-2 rounded-lg ${
                            activeTab === item.id ? 'bg-telegram-header text-white' : 'text-gray-600'
                        }`}
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="text-xs mt-1">{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
} 