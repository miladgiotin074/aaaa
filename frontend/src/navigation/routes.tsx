import AddAccount from '@/pages/AddAccount';
import Login from '@/pages/Login';
import AdminPage from '@/pages/AdminPage';
import UserDetailsPage from '@/components/admin/UserDetailsPage';
import type { ComponentType, JSX } from 'react';

interface Route {
    path: string;
    Component: ComponentType;
    title?: string;
    icon?: JSX.Element;
}

export const routes: Route[] = [
    { path: '/addAccount', Component: AddAccount },
    { path: '/login', Component: Login },
    { path: '/admin', Component: AdminPage },
    { path: '/user-details', Component: UserDetailsPage },
];