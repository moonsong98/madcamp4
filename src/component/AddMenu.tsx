import { Box, Button, Paper, TextField } from '@material-ui/core';
import axios from 'axios';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SERVER_URL } from '../config';
import UserContext from '../contexts/UserContext';
import { Menu } from '../types/RestaurantTypes';
import menuDefaultImage from '../images/menuDefaultImage.png';

function AddMenu() {
	const history = useHistory();
	const { userStatus } = useContext(UserContext);
	const [menu, setMenu] = useState<Menu>({
		name: '',
		description: '',
		sizes: [
			{
				size: '',
				price: 0,
			},
		],
	});
	const [image, setImage] = useState<File | null>(null);

	const handleSubmit = async () => {
		if (!image) return;
		const form = new FormData();
		form.append('image', image);
		form.append('menu', JSON.stringify(menu));

		try {
			const response = await axios.post(`${SERVER_URL}/restaurant/${userStatus.restaurantId}/menu`, form, {
				headers: { 'Content-Type': 'multipart/form-data', token: userStatus.accessToken },
			});
			console.log(response);
			if (response.status === 200) {
				history.push('/RestaurantManagement');
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

	const addSize = () => {
		const newSizes = menu.sizes;
		newSizes.push({
			size: '',
			price: 0,
		});
		setMenu({ ...menu, sizes: newSizes });
	};

	const removeSize = (index: number) => {
		const newSizes = menu.sizes.filter((element, i) => i !== index);
		setMenu({
			...menu,
			sizes: newSizes,
		});
	};

	return (
		<div>
			<Paper>
				<form>
					<div>
						<Button component="label">
							<div>
								<img
									src={image ? URL.createObjectURL(image) : menuDefaultImage}
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
									<Button onClick={() => removeSize(index)}>삭제</Button>
								</div>
							);
						})}
					</div>
					<Button onClick={addSize}> 사이즈 추가하기 </Button>
				</form>
			</Paper>
			<Box>
				<Button onClick={handleSubmit}> 확인 </Button>
				<Button onClick={(e) => history.goBack()}> 취소 </Button>
			</Box>
		</div>
	);
}

export default AddMenu;
