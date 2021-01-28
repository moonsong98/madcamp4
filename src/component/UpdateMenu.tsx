import { Box, Button, Paper, TextField } from '@material-ui/core';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { IMAGE_BASE_URL, SERVER_URL } from '../config';
import UserContext from '../contexts/UserContext';
import { Menu } from '../types/RestaurantTypes';
import menuDefaultImage from '../images/menuDefaultImage.png';

interface UpdateMenuParam {
	menu_id: string;
}

function UpdateMenu() {
	const match = useRouteMatch<UpdateMenuParam>();
	const history = useHistory();
	const { userStatus } = useContext(UserContext);
	const requestUrl = `${SERVER_URL}/restaurant/${userStatus.restaurantId}/menu/${match.params.menu_id}`;

	const [menu, setMenu] = useState<Menu>({
		_id: '',
		name: '',
		description: '',
		sizes: [],
		image: '',
	});
	const [image, setImage] = useState<File | null>(null);

	useEffect(() => {
		const getMenu = async () => {
			try {
				const response = await axios.get(requestUrl);

				if (response.status === 200) {
					console.log(response.data);
					setMenu(response.data);
				}
			} catch (error) {
				console.log(error);
				alert('메뉴 정보를 가져오는 중에 문제가 발생했습니다.');
				history.goBack();
			}
		};
		getMenu();
	}, [history, requestUrl]);

	const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		if (!image) return;
		const form = new FormData();
		form.append('image', image);

		form.append('menu', JSON.stringify(menu));

		try {
			const response = await axios.put(requestUrl, form, {
				headers: { 'Content-Type': 'multipart/form-data', token: userStatus.accessToken },
			});
			console.log(response);
			if (response.status === 200) {
				history.goBack();
			} else {
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMenu({
			...menu,
			[e.target.name]: e.target.value,
		});
		console.log(e);
	};
	const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		const tempSizes = [...menu.sizes];
		tempSizes[index] = {
			...tempSizes[index],
			[e.target.name]: e.target.value,
		};

		setMenu({
			...menu,
			sizes: tempSizes,
		});
	};

	return (
		<div>
			<Paper>
				<form>
					<div>
						<Button component="label">
							<div>
								{console.log(`${IMAGE_BASE_URL}/menus/${menu.image}`)}
								<img
									src={`${IMAGE_BASE_URL}/menus/${menu.image}`}
									alt="메뉴 이미지"
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
						<div> 메뉴 이미지 </div>
					</div>
					<div>
						<TextField name="name" value={menu.name} label="메뉴명" onChange={handleChange} />
					</div>
					<div>
						<TextField name="description" value={menu.description} label="메뉴설명" onChange={handleChange} />
					</div>
					<div>
						{menu.sizes.map((element, index) => {
							console.log(element);
							return (
								<div key={index}>
									<TextField
										name="size"
										value={element.size}
										label={`사이즈명 ${index + 1}`}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSizeChange(e, index)}
									/>
									<TextField
										name="price"
										value={element.price}
										type="number"
										label={`가격 ${index + 1}`}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSizeChange(e, index)}
									/>
									<Button>삭제</Button>
								</div>
							);
						})}
					</div>
				</form>
			</Paper>
			<Box>
				<Button onClick={handleSubmit}> 확인 </Button>
				<Button onClick={(e) => history.goBack()}> 취소 </Button>
			</Box>
		</div>
	);
}

export default UpdateMenu;
