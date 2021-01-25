import { Button, TextField } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import UserContext from '../contexts/UserContext';
import { SERVER_URL } from '../config';
import { useHistory } from 'react-router-dom';

function RestaurantOwnerChangePasswordPage() {
	const [newPassword, setNewPassword] = useState('');
	const { userStatus, setUserStatus } = useContext(UserContext);
	const history = useHistory();
	const submitHandler = () => {
		axios({
			method: 'post',
			url: `${SERVER_URL}/auth/update-password`,
			data: {
				password: newPassword,
			},
			headers: {
				token: userStatus.accessToken,
			},
		})
			.then((res) => {
				history.push('/restaurantinformationinput');
			})
			.catch((err) => {
				console.log(err.request.response);
			});
	};
	return (
		<div>
			<p>비밀번호를 변경해주세요</p>
			<TextField
				label="새 비밀번호"
				placeholder="새 비밀번호"
				value={newPassword}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
					setNewPassword(event.target.value);
				}}
			/>
			<Button onClick={submitHandler}>비밀번호 변경하기</Button>
		</div>
	);
}

export default RestaurantOwnerChangePasswordPage;
