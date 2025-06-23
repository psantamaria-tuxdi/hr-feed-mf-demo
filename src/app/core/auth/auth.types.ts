import { User } from '../user/user.types';

export interface LoginResponse {
    user: User;
    hr_access_token: string;
}

export interface LoginPayload {
    externalUserId: string;
    name: string;
    roles: string[];
    expiresIn: number;
}
