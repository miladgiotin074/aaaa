import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface AccountSearchFilterProps {
    onSearch: (query: string) => void;
}

export default function AccountSearchFilter({
    onSearch,
}: AccountSearchFilterProps) {
    return (
        <div className="flex flex-col gap-2 p-4 bg-black/5 rounded-lg">
            <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-gray-500" />
                <Input
                    placeholder="جستجو بر اساس شماره تلفن یا وضعیت"
                    onChange={(e) => onSearch(e.target.value)}
                    className="flex-1"
                />
            </div>
        </div>
    );
} 