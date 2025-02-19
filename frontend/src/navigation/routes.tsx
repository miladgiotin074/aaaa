import AddAccount from '@/pages/AddAccount';
import Login from '@/pages/Login';
import AdminPage from '@/pages/AdminPage';
import UserDetailsPage from '@/components/admin/UserDetailsPage';
import type { ComponentType, JSX } from 'react';
import { lazy } from 'react';

interface Route {
    path: string;
    Component: ComponentType;
    title?: string;
    icon?: JSX.Element;
}

const PaymentSuccessPage = lazy(() => import('@/pages/payment/PaymentSuccessPage'));
const PaymentFailedPage = lazy(() => import('@/pages/payment/PaymentFailedPage'));

export const routes: Route[] = [
    { path: '/addAccount', Component: AddAccount },
    { path: '/login', Component: Login },
    { path: '/admin', Component: AdminPage },
    { path: '/user-details', Component: UserDetailsPage }
];