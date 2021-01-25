import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from '../config';
import { Restaurant } from '../types/RestaurantTypes';

interface MatchParams {
	restaurantId: string;
}

interface Props extends RouteComponentProps<MatchParams> {
	restaurantId: string;
}

function RestaurantPage(props: Props) {
	const url = `${SERVER_URL}/restaurant/${props.match.params.restaurantId}`;
	const [restaurantInformation, setRestaurantInformation] = useState<Restaurant>({
		name: '',
		category: '',
		menus: [],
		telephone: '',
		description: '',
		openingHours: [
			{
				openTime: '',
				closeTime: '',
			},
			{
				openTime: '',
				closeTime: '',
			},
			{
				openTime: '',
				closeTime: '',
			},
			{
				openTime: '',
				closeTime: '',
			},
			{
				openTime: '',
				closeTime: '',
			},
			{
				openTime: '',
				closeTime: '',
			},
			{
				openTime: '',
				closeTime: '',
			},
		],
		location: {
			fullAddress: '',
			extraAddress: '',
		},
	});
	useEffect(() => {
		axios({
			method: 'get',
			url,
		}).then((res) => setRestaurantInformation(res.data));
	}, [url]);
	return (
		<div>
			<p>{restaurantInformation.name}</p>
			<p>{restaurantInformation.description}</p>
			<p>{restaurantInformation.category}</p>
			<p>{restaurantInformation.telephone}</p>
			<p>{restaurantInformation.location.fullAddress}</p>
			<p>{restaurantInformation.location.extraAddress}</p>
			{restaurantInformation.menus.map((e) => {
				return <div></div>;
			})}
		</div>
	);
}

export default RestaurantPage;
