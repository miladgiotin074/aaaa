import { useNavigate, useLocation } from 'react-router-dom';
import { formatJalaliDate } from '@/utils/dateUtils';
import { Button } from '@/components/ui/button';

const PaymentSuccessPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get('userId');
    const authority = searchParams.get('Authority');

    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
                <div className="text-green-500 text-6xl mb-4">✓</div>
                <h1 className="text-2xl font-bold text-green-500 mb-6">پرداخت موفقیت‌آمیز بود</h1>

                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <p className="text-gray-700">
                        شناسه کاربری: <span className="font-bold text-blue-500">{userId}</span>
                    </p>
                    <p className="text-gray-700 mt-2">
                        کد مرجع: <span className="text-gray-600">{authority}</span>
                    </p>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                    مبلغ پرداختی با موفقیت به حساب شما واریز شد. می‌توانید از طریق ربات از موجودی خود استفاده کنید.
                </p>

                <Button
                    className="w-full"
                    onClick={() => navigate('/')}
                >
                    بازگشت به صفحه اصلی
                </Button>
            </div>
        </div>
    );
};

export default PaymentSuccessPage; 