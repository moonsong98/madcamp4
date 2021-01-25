import React, { useState, useContext } from 'react';
import { Button, TextField } from '@material-ui/core';
import { LoginInput } from '../types/AuthTypes';
import axios from 'axios';
import UserContext from '../contexts/UserContext';
import { Link, useHistory } from 'react-router-dom';
import { SERVER_URL } from '../config';

function LoginPage() {
	const history = useHistory();
	const { setUserStatus } = useContext(UserContext);
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
				role: 'restaurantOwner',
			},
			withCredentials: true,
		})
			.then((res) => {
				console.log(res);
				setUserStatus({ ...res.data });
				history.push('/');
			})
			.catch((error) => {
				console.log(error.response.data.message);
			});
	};
	return (
		<div>
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
			<div>
				<p>아직 회원가입하지 않으셨나요?</p>
				<Link to="/signup">
					<Button>회원가입</Button>
				</Link>
			</div>
		</div>
	);
}

export default LoginPage;
