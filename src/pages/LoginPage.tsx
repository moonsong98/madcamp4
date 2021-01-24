import React, { useState, useContext } from 'react';
import { Button, TextField } from '@material-ui/core';
import { LoginInput } from '../types/AuthTypes';
import axios from 'axios';
import UserContext from '../contexts/UserContext';
import { useHistory } from 'react-router-dom';
import { SERVER_URL } from '../config';

function LoginPage() {
	const history = useHistory();
	const { userStatus, setUserStatus } = useContext(UserContext);
	const [loginInput, setLoginInput] = useState<LoginInput>({
		username: '',
		password: '',
	});
	const submitHandler = (event: React.FormEvent) => {
		event.preventDefault();
		axios({
			method: 'post',
			url: `${SERVER_URL}/auth/login`,
			data: {
				username: loginInput.username,
				password: loginInput.password,
				role: '',
			},
		})
			.then((res) => {
				res.data.isInitialPassword === undefined
					? setUserStatus({ accessToken: res.data.token, role: res.data.role })
					: setUserStatus({
							accessToken: res.data.token,
							role: res.data.role,
							isInitialPassword: res.data.isInitialPassword,
					  });
				if (res.data.role === 'restaurantOwner') {
					res.data.isInitialPassword ? history.push('/RestaurantOwnerChangePassword') : history.push('/Administrator');
				}
			})
			.catch((error) => {
				console.log(error.response.data.message);
			});
	};
	return (
		<form onSubmit={submitHandler}>
			<TextField
				label="username"
				value={loginInput.username}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
					setLoginInput({ ...loginInput, username: event.target.value });
				}}
			/>
			<TextField
				label="password"
				type="password"
				value={loginInput.password}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
					setLoginInput({ ...loginInput, password: event.target.value });
				}}
			/>
			<Button type="submit">로그인</Button>
		</form>
	);
}

export default LoginPage;
