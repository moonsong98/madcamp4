import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { IMAGE_BASE_URL, SERVER_URL } from '../config';
import { Button, FormControl, InputLabel, Paper, Select, TextField } from '@material-ui/core';
import { Restaurant, OpeningHour } from '../types/RestaurantTypes';
import UserContext from '../contexts/UserContext';
import AddressSearch from './AddressSearchComponent';
import { makeStyles, createStyles } from '@material-ui/core';
import { Link, NavLink, useRouteMatch } from 'react-router-dom';
import restaurantDefaultImage from '../images/restaurantDefaultImage.png';

const useStyles = makeStyles(() =>
	createStyles({
		rootDiv: {
			display: 'flex',
		},
		formControl: {
			minWidth: 120,
		},
	})
);

function RestaurantManagement() {
	const match = useRouteMatch();
	const classes = useStyles();
	const { userStatus } = useContext(UserContext);
	const initialRestaurnt: Restaurant = {
		name: '',
		category: '',
		description: '',
		image: '',
		telephone: '',
		menus: [],
		openingHours: [...Array<OpeningHour>(7)].map(() => {
			return { openTime: '', closeTime: '' } as OpeningHour;
		}),
		location: { fullAddress: '', extraAddress: '' },
	};
	const [restaurant, setRestaurant] = useState<Restaurant>(initialRestaurnt);
	const [image, setImage] = useState<File | null>(null);

	const dayOfWeek = ['월', '화', '수', '목', '금', '토', '일'];
	const url = `${SERVER_URL}/restaurant/${userStatus.restaurantId}`;

	console.log('restaurantInformation:', restaurant);
	useEffect(() => {
		axios({
			method: 'get',
			url,
		})
			.then((res) => {
				console.log('res', res);
				setRestaurant(res.data);
			})
			.catch((err) => {
				console.log('err:', err);
			});
	}, [url]);

	const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		const form = new FormData();
		if (!image) return;
		form.append('image', image);
		form.append('restaurant', JSON.stringify(restaurant));

		axios.put(url, form, { headers: { token: userStatus.accessToken } });
	};

	const deleteMenu = async (index: number) => {
		const menuToDelete = restaurant.menus[index];
		console.log(menuToDelete);

		try {
			const response = await axios.delete(url + `/menu/${menuToDelete._id}`, {
				headers: { token: userStatus.accessToken },
			});
			if (response.status === 200) {
				const newMenus = restaurant.menus.filter((_, i) => index !== i);
				setRestaurant({
					...restaurant,
					menus: newMenus,
				});
			}
			console.log(response);
		} catch (error) {
			console.log(error.response.data.message);
		}
	};

	return (
		<div className={classes.rootDiv}>
			<div>
				<Button component="label">
					<div>
						{console.log(`${IMAGE_BASE_URL}/restaurants/${restaurant.image}`)}
						<img
							src={
								image
									? URL.createObjectURL(image)
									: restaurant.image
									? `${IMAGE_BASE_URL}/restaurants/${restaurant.image}`
									: restaurantDefaultImage
							}
							alt="가게 대표 이미지"
							style={{ maxWidth: '25vw', maxHeight: '50vh' }}
						/>
					</div>
					<input
						type="file"
						onChange={(e) => {
							console.log(e.target.files);
							setImage(e.target.files && e.target.files[0]);
						}}
						hidden
					/>
				</Button>
				<div> 가게 대표 이미지 </div>
				<div>
					<TextField disabled value={restaurant.name} label="가게 이름" />
				</div>
				<div>
					<TextField disabled value={restaurant.category} label="카테고리" />
				</div>
				<div>
					<TextField
						label="가게 설명"
						placeholder="가게 설명 입력해주세요"
						value={restaurant.description}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							setRestaurant({ ...restaurant, description: event.target.value });
						}}
						multiline={true}
					/>
				</div>
				<div>
					<TextField
						label="전화번호"
						type="tel"
						placeholder="전화번호를 입력해주세요"
						value={restaurant.telephone}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							setRestaurant({ ...restaurant, telephone: event.target.value });
						}}
					/>
				</div>
				<div>
					{dayOfWeek.map((e, index) => {
						return (
							<div key={index}>
								{e}
								<TextField
									label="여는 시간"
									type="time"
									value={restaurant.openingHours[index].openTime}
									InputLabelProps={{
										shrink: true,
									}}
									inputProps={{
										step: 300, // 5 min
									}}
									onChange={(e) => {
										const newOpeningHours = restaurant.openingHours;
										newOpeningHours[index].openTime = e.target.value;
										setRestaurant({
											...restaurant,
											openingHours: newOpeningHours,
										});
									}}
								/>
								<TextField
									label="닫는 시간"
									type="time"
									value={restaurant.openingHours[index].closeTime}
									InputLabelProps={{
										shrink: true,
									}}
									inputProps={{
										step: 300, // 5 min
									}}
									onChange={(e) => {
										const newOpeningHours = restaurant.openingHours;
										newOpeningHours[index].closeTime = e.target.value;
										setRestaurant({
											...restaurant,
											openingHours: newOpeningHours,
										});
									}}
								/>
							</div>
						);
					})}
				</div>
				<AddressSearch restaurantInformation={restaurant} setRestaurantInformation={setRestaurant} />
				<Button onClick={handleSubmit}> 수정 </Button>
			</div>
			<div>
				{restaurant.menus.map((e, index) => {
					return (
						<div key={index}>
							<Paper style={{ margin: '20px' }}>
								<Button>
									<Link to={`${match.url}/update-menu/${e._id}`}>메뉴 수정하기</Link>
								</Button>
								<Button onClick={() => deleteMenu(index)}>메뉴 삭제하기</Button>
								<div>
									<TextField value={e.name} label="메뉴명" />
									<TextField value={e.description} label="메뉴설명" />
								</div>
							</Paper>
						</div>
					);
				})}
			</div>
			<div>
				<Link to={`${match.url}/add-menu`}> {console.log(match)}메뉴 추가하기</Link>
			</div>
		</div>
	);
}

export default RestaurantManagement;
