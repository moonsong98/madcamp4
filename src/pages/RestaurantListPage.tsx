import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../config';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { RestaurantResponseType } from '../types/ResponseTypes';
import { Button } from '@material-ui/core';

interface MatchParams {
	categoryId: string;
}

interface Props extends RouteComponentProps<MatchParams> {
	categoryId: string;
}

function RestaurantListPage(props: Props) {
	const url = `${SERVER_URL}/restaurant?category=${encodeURI(props.match.params.categoryId)}`;
	const [restaurantList, setRestaurantList] = useState<RestaurantResponseType[]>([]);
	const history = useHistory();
	useEffect(() => {
		axios({
			method: 'get',
			url,
		}).then((res) => {
			const resultRestaurantList: RestaurantResponseType[] = [];
			res.data.forEach((e: any) => {
				resultRestaurantList.push({
					_id: e._id,
					name: e.name,
					description: e.description,
					openingHours: e.openingHours,
				});
			});
			setRestaurantList(resultRestaurantList);
		});
		console.log(props.match.params.categoryId);
		console.log(url);
	}, [url]);
	return (
		<div>
			{restaurantList.map((e) => {
				return (
					<div>
						<Button
							onClick={() => {
								history.push(`/restaurant/${e._id}`);
							}}
						>
							<p>{e._id}</p>
							<p>{e.name}</p>
							<p>{e.description}</p>
							{e.openingHours.map((el) => {
								return (
									<div>
										<p>{el.openTime}</p>
										<p>{el.closeTime}</p>
									</div>
								);
							})}
						</Button>
					</div>
				);
			})}
		</div>
	);
}

export default RestaurantListPage;
