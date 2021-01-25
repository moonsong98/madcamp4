import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Restaurant } from '../types/RestaurantTypes';
import { SERVER_URL } from '../config';
import { InputLabel, Select, TextField } from '@material-ui/core';

function RestaruantManagementPaget() {
	const [disabled, setDisabled] = useState(true);
	const [restaurantInformation, setRestaurantInformation] = useState<Restaurant>({
		name: '',
		category: '',
		description: '',
		telephone: '',
		menus: [],
		openingHours: [],
		location: { fullAddress: '', extraAddress: '' },
	});
	// useEffect(() => {
	// 	axios({
	// 		method: 'get',
	// 		url: `${SERVER_URL}/restaurant`,
	// 	}).then((res) => {
	// 		setRestaurantInformation(res.data);
	// 	});
	// });
	return (
		<div>
			<div>
				<TextField disabled={disabled} value={restaurantInformation.name} label="가게 이름" />
			</div>
		</div>
	);
}

export default RestaruantManagementPaget;
