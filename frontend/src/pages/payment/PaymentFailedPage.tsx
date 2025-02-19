import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const PaymentFailedPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const errorCode = searchParams.get('errorCode');

    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
                <div className="text-red-500 text-6xl mb-4">✗</div>
                <h1 className="text-2xl font-bold text-red-500 mb-6">پرداخت ناموفق بود</h1>

                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <p className="text-gray-700">
                        کد خطا: <span className="font-bold text-red-500">{errorCode}</span>
                    </p>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                    متأسفانه پرداخت شما با خطا مواجه شد. لطفاً دوباره تلاش کنید یا با پشتیبانی تماس بگیرید.
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

export default PaymentFailedPage; 