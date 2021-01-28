import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { createStyles, fade, makeStyles, Theme } from '@material-ui/core/styles';
import { SERVER_URL } from '../config';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { RestaurantResponseType } from '../types/ResponseTypes';
import { Button } from '@material-ui/core';
import restaurantDefaultImage from '../images/restaurantDefaultImage.png';
import { Restaurant } from '../types/RestaurantTypes';

interface MatchParams {
	categoryId: string;
}

interface Props {
	categoryId: string;
	searchText: string;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			alignItems: 'center',
			flexWrap: 'wrap',
			marginLeft: '10%',
			marginRight: '10%',
			flex: 1,
			flexDirection: 'row',
		},
		restaurant: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
		},
		image: {
			height: '5rem',
			width: 'auto',
		},
		contianter: {
			width: '15rem',
			height: '18rem',
		},
	})
);

function RestaurantListPage(props: Props) {
	const classes = useStyles();
	const curr = new Date();
	const today = curr.getDay();
	const url = `${SERVER_URL}/restaurant?category=${encodeURI(props.categoryId)}`;
	const allRestaurantUrl = `${SERVER_URL}/restaurant`;
	const [restaurantList, setRestaurantList] = useState<Restaurant[]>([]);
	const history = useHistory();
	useEffect(() => {
		props.categoryId.length === 0
			? axios({
					method: 'get',
					url: allRestaurantUrl,
			  }).then((res) => {
					const resultRestaurantList: Restaurant[] = [];
					res.data.forEach((e: any) => {
						resultRestaurantList.push(e);
					});
					setRestaurantList(resultRestaurantList);
			  })
			: axios({
					method: 'get',
					url,
			  }).then((res) => {
					const resultRestaurantList: Restaurant[] = [];
					res.data.forEach((e: any) => {
						resultRestaurantList.push(e);
					});
					setRestaurantList(resultRestaurantList);
			  });
	}, [url]);
	return (
		<div className={classes.root}>
			{restaurantList
				.filter((e) => {
					return e.confirmed && e.name.includes(props.searchText);
				})
				.map((e, index) => {
					return (
						<div key={index}>
							<Button
								className={classes.contianter}
								variant="outlined"
								onClick={() => {
									history.push(`/restaurant/${e._id}`);
								}}
							>
								<div className={classes.restaurant}>
									<img className={classes.image} src={restaurantDefaultImage} alt="Restaurant" />
									<div>{e.name}</div>
									<div>{e.description}</div>
									{e.openingHours[today] && (
										<div>
											<p>{e.openingHours[today].openTime}</p>
											<p>{e.openingHours[today].closeTime}</p>
										</div>
									)}
								</div>
							</Button>
						</div>
					);
				})}
		</div>
	);
}

export default RestaurantListPage;
