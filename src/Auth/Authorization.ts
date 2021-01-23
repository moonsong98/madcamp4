import { LoginResponseType } from '../types/ResponseTypes';

interface LoginStatus {
	accessToken: string;
	role: string;
}

let loginStatus: LoginStatus = { accessToken: '', role: '' };

export function login(loginResponse: LoginResponseType) {
	loginStatus = { accessToken: loginResponse.token, role: loginResponse.role };
}

export function logout() {
	loginStatus = { accessToken: '', role: '' };
}

export function getLoginStatus() {
	return loginStatus;
}
