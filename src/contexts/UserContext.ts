import { createContext } from 'react';
import { UserStatus } from '../types/AuthTypes';

export default createContext({
	userStatus: { accessToken: '', role: '' },
	setUserStatus: (userStatus: UserStatus) => {},
});
