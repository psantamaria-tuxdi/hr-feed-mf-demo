export interface User {
    _id: string;
    externalUserId: string;
    name: string;
    roles: string[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    avatar?: string;
}
