import { useState, useEffect } from 'react';
import { api } from '@/utils/api';
import { LoaderCircle } from 'lucide-react';

export default function CountriesPage() {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const { data } = await api.get('/admin/countries');
                setCountries(data);
            } catch (error) {
                console.error('Error fetching countries:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCountries();
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
            <h1 className="text-xl font-bold mb-4">کشورها</h1>
            <div className="space-y-4">
                {countries.map((country) => (
                    <div key={country._id} className="bg-white p-4 rounded-lg shadow">
                        <p className="font-medium">{country.countryName}</p>
                        <p className="text-sm text-gray-500">{country.countryCode}</p>
                    </div>
                ))}
            </div>
        </div>
    );
} 