import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import axios from 'axios';
import LoginTypes from '../types/LoginTypes';

function AdminLoginpage() {
	const [loginInput, setLoginInput] = useState<LoginTypes>({ username: '', password: '' });

	const submitHandler = (event: React.FormEvent) => {
		event?.preventDefault();
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
		</form>
	);
}

export default AdminLoginpage;
