import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { createStyles, fade, makeStyles, Theme } from '@material-ui/core/styles';
import { SERVER_URL } from '../config';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { RestaurantResponseType } from '../types/ResponseTypes';
import { Button } from '@material-ui/core';

interface MatchParams {
	categoryId: string;
}

interface Props {
	categoryId: string;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
		},
	})
);

function RestaurantListPage(props: Props) {
	const classes = useStyles();
	const url = `${SERVER_URL}/restaurant?category=${encodeURI(props.categoryId)}`;
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
	}, [url]);
	return (
		<div className={classes.root}>
			{restaurantList.map((e, index) => {
				return (
					<div key={index}>
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
