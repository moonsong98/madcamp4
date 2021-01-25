import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { SignUpStatus } from '../types/AuthTypes';
import axios from 'axios';
import { SERVER_URL } from '../config';

function SignUpPage() {
	const [signUpStatus, setSignUpStatus] = useState<SignUpStatus>({
		username: '',
		password: '',
		nickname: '',
	});

	const submitHandler = () => {
		axios({
			method: 'post',
			url: `${SERVER_URL}/auth/register`,
			data: {
				...signUpStatus,
				role: 'user',
			},
		});
	};
	return (
		<form onSubmit={submitHandler}>
			<TextField
				label="username"
				placeholder="아이디를 입력하시오"
				value={signUpStatus.username}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
					setSignUpStatus({ ...signUpStatus, username: event.target.value });
				}}
			/>
			<TextField
				label="password"
				placeholder="비밀번호를 입력하시오"
				value={signUpStatus.password}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
					setSignUpStatus({ ...signUpStatus, username: event.target.value });
				}}
			/>
			<TextField
				label="nickname"
				placeholder="별명을 입력하시오"
				value={signUpStatus.nickname}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
					setSignUpStatus({ ...signUpStatus, username: event.target.value });
				}}
			/>
			<Button type="submit">회원가입</Button>
		</form>
	);
}

export default SignUpPage;
