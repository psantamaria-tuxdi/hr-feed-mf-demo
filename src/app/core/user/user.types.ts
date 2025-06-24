import { BaseDocument } from "../data/base.types";

export interface User extends BaseDocument {
    externalUserId: string;
    displayName: string;
    firstName: string;
    lastName: string;
    roles: string[];
    avatar?: string;
}
