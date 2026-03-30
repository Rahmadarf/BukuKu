export type * from './auth';
export type * from './navigation';
export type * from './ui';

export interface User {
    id: number
    name: string
    email: string
    email_verified_at?: string
}

export interface Auth {
    user: User
}

export interface PageProps {
    auth: Auth
    [key: string]: unknown
}