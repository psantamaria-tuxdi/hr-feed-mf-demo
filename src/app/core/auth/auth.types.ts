import { User } from '../user/user.types';

export interface LoginResponseDTO {
  user: User;
  hr_access_token: string;
}

export interface LoginPayloadDTO {
  externalUserId: string;
  displayName: string;
  firstName: string;
  lastName: string;
  roles: string[];
  expiresIn: number;
}
