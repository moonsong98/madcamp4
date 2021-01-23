import React, { useState, useContext } from 'react';
import { Button, TextField } from '@material-ui/core';
import axios from 'axios';
import LoginTypes from '../types/LoginTypes';
import UserContext from '../contexts/UserContext';

function AdminLoginpage() {
	const [loginInput, setLoginInput] = useState<LoginTypes>({ username: '', password: '' });
	const { JWTToken, setJWTToken } = useContext(UserContext);

	const submitHandler = (event: React.FormEvent) => {
		event?.preventDefault();
		axios({
			method: 'post',
			url: 'http://192.249.18.244:8080/auth/login',
			data: {
				username: loginInput.username,
				password: loginInput.password,
				role: 'admin',
			},
		}).then((res) => setJWTToken(res.data.token));
		setJWTToken('test');
		// login 정보 저장
	};

	return (
		<form onSubmit={submitHandler}>
			<div>
				<TextField
					label="username"
					value={loginInput.username}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						setLoginInput({ ...loginInput, username: event.target.value });
					}}
				/>
			</div>
			<div>
				<TextField
					type="password"
					label="password"
					value={loginInput.password}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						setLoginInput({ ...loginInput, password: event.target.value });
					}}
				/>
			</div>
			<Button type="submit">Login</Button>
			<p>{JWTToken}</p>
		</form>
	);
}

export default AdminLoginpage;
