import { UserStatus } from './AuthTypes';

export interface UserContextType {
	userStatus: UserStatus;
	setUserStatus: (userStatus: UserStatus) => void;
}
