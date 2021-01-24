export interface LoginInput {
	username: string;
	password: string;
}
export interface RestaurantOwnerRegister {
	registerNumber: string;
	password: string;
}
export interface UserStatus {
	accessToken: string;
	role: string;
	isInitialPassword?: boolean;
}
