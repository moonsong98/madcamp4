import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@material-ui/core';
import axios, { AxiosResponse } from 'axios';
import LoginTypes from '../types/LoginTypes';
import { LoginResponseType } from '../types/ResponseTypes';
import { login, getLoginStatus } from '../Auth/Authorization';

function AdminLoginpage() {
	const [loginInput, setLoginInput] = useState<LoginTypes>({ username: '', password: '' });

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
		}).then((res: AxiosResponse<LoginResponseType>) => {
			login(res.data);
		});
	};

	useEffect(() => {
		console.log(getLoginStatus());
	});

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
			<p>{JSON.stringify(getLoginStatus)}</p>
		</form>
	);
}

export default AdminLoginpage;
