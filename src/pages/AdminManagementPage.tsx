import React, { useContext, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { RestaurantOwnerRegister } from '../types/AuthTypes';
import axios from 'axios';
import UserContext from '../contexts/UserContext';
import { SERVER_URL } from '../config';

function AdminManagementPage() {
	const [restaurantOwnerRegisterInformation, setRestaurantOnwerRegisterInformation] = useState<RestaurantOwnerRegister>(
		{ registerNumber: '', password: '' }
	);

	const { userStatus } = useContext(UserContext);

	const createRestaurantOwnerAccount = (event: React.FormEvent) => {
		event?.preventDefault();
		const password = Math.random().toString(36).slice(-8);
		console.log(`username: ${restaurantOwnerRegisterInformation.registerNumber} password: ${password}`);
		axios({
			method: 'post',
			url: `${SERVER_URL}/auth/register`,
			data: {
				username: restaurantOwnerRegisterInformation.registerNumber,
				password,
				role: 'restaurantOwner',
			},
		}).then((res) => console.log(res.data));
	};
	console.log(userStatus.role);
	return (
		<form onSubmit={createRestaurantOwnerAccount}>
			<div>
				<TextField
					label="사업자등록번호"
					placeholder="사업자등록번호를 입력하시오"
					value={restaurantOwnerRegisterInformation.registerNumber}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						setRestaurantOnwerRegisterInformation({
							...restaurantOwnerRegisterInformation,
							registerNumber: event.target.value,
						});
					}}
				/>
			</div>
			<Button type="submit">Create New Restaurant Owner's Account</Button>
		</form>
	);
}

export default AdminManagementPage;
