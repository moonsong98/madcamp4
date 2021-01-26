import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../config';
import { FormControl, InputLabel, Select, TextField } from '@material-ui/core';
import { MenuModification, Restaurant } from '../types/RestaurantTypes';
import UserContext from '../contexts/UserContext';
import AddressSearch from '../component/AddressSearchComponent';
import { makeStyles, createStyles } from '@material-ui/core';
import RestaurantInformationInputPage from './RestaurantInformationInputPage';

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

function RestaruantManagementPaget() {
	const classes = useStyles();
	const { userStatus } = useContext(UserContext);
	const [disabled, setDisabled] = useState(false);
	const [menuDisabled, setMenuDisabled] = useState<Boolean[]>();
	const initialModifiedMenus: MenuModification = { newMenus: [], removedMenus: [], modifiedMenus: [] };
	const [modifedMenus, setModifiedMenus] = useState<MenuModification>(initialModifiedMenus);
	const initialRestaurntInformation: Restaurant = {
		name: '',
		category: '',
		description: '',
		telephone: '',
		menus: [],
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
		location: { fullAddress: '', extraAddress: '' },
	};
	const [restaurantInformation, setRestaurantInformation] = useState<Restaurant>(initialRestaurntInformation);
	const dayOfWeek = ['월', '화', '수', '목', '금', '토', '일'];
	const url = `${SERVER_URL}/restaurant/${userStatus.restaurantId}`;
	console.log(userStatus.restaurantId);
	useEffect(() => {
		axios({
			method: 'get',
			url,
		})
			.then((res) => {
				console.log(`res: ${res}`);
				setRestaurantInformation(res.data);
				let tmp: Boolean[] = [];
				res.data.menus.forEach(() => {
					tmp.push(false);
				});
				setMenuDisabled(tmp);
			})
			.catch((err) => {
				console.error(`err: ${err}`);
			});
	}, [url]);
	console.log(`restaurantInformation.openingHours: ${restaurantInformation.name}`);
	console.log(`menuDisabled.length: ${menuDisabled?.length}`);
	return (
		<div className={classes.rootDiv}>
			<div>
				<p>메뉴 수정 페이지</p>
				<div>
					<TextField disabled value={restaurantInformation.name} label="가게 이름" />
				</div>
				<div>
					<TextField disabled value={restaurantInformation.category} label="카테고리" />
				</div>
				<div>
					<TextField
						label="가게 설명"
						placeholder="가게 설명 입력해주세요"
						value={restaurantInformation.description}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							setRestaurantInformation({ ...restaurantInformation, description: event.target.value });
						}}
						multiline={true}
					/>
				</div>
				<div>
					<TextField
						label="전화번호"
						type="tel"
						placeholder="전화번호를 입력해주세요"
						value={restaurantInformation.telephone}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							setRestaurantInformation({ ...restaurantInformation, telephone: event.target.value });
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
									value={restaurantInformation.openingHours[index].openTime}
									InputLabelProps={{
										shrink: true,
									}}
									inputProps={{
										step: 300, // 5 min
									}}
									onChange={(e) => {
										const newOpeningHours = restaurantInformation.openingHours;
										newOpeningHours[index].openTime = e.target.value;
										setRestaurantInformation({
											...restaurantInformation,
											openingHours: newOpeningHours,
										});
									}}
								/>
								<TextField
									label="닫는 시간"
									type="time"
									value={restaurantInformation.openingHours[index].closeTime}
									InputLabelProps={{
										shrink: true,
									}}
									inputProps={{
										step: 300, // 5 min
									}}
									onChange={(e) => {
										const newOpeningHours = restaurantInformation.openingHours;
										newOpeningHours[index].closeTime = e.target.value;
										setRestaurantInformation({
											...restaurantInformation,
											openingHours: newOpeningHours,
										});
									}}
								/>
							</div>
						);
					})}
				</div>
				<AddressSearch
					restaurantInformation={restaurantInformation}
					setRestaurantInformation={setRestaurantInformation}
				/>
			</div>
			<div>
				{restaurantInformation.menus.map((e, index) => {
					return (
						<div>
							<div>
								<TextField value={e.name} label="메뉴명" />
							</div>
							<div>
								<TextField value={e.description} label="메뉴설명" />
							</div>
							{e.sizes.length === 1 ? (
								<div>
									<TextField value={e.sizes[0].price} label="가격" />
								</div>
							) : (
								e.sizes.map((e, index) => {
									return (
										<div>
											<TextField value={e.size} label={`사이즈 ${index + 1}`} />
											<TextField value={e.price} label={`가격 ${index + 1}`} />
										</div>
									);
								})
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default RestaruantManagementPaget;
