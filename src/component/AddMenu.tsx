import { Button, TextField } from '@material-ui/core';
import axios from 'axios';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SERVER_URL } from '../config';
import UserContext from '../contexts/UserContext';
import { Menu } from '../types/RestaurantTypes';

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
		image: '',
	});
	const [image, setImage] = useState<File | null>(null);

	const handleSubmit = async () => {
		const form = new FormData();
		if (image) form.append('image', image);
		form.append('menu', JSON.stringify({ ...menu, image: image?.name }));

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
			<form>
				{image && <img src={URL.createObjectURL(image)} alt="" style={{ maxWidth: '25vw', maxHeight: '50vh' }} />}
				<div>
					<Button component="label">
						메뉴 이미지 업로드
						<input
							type="file"
							onChange={(e) => {
								console.log(e.target.files);
								setImage(e.target.files && e.target.files[0]);
							}}
							hidden
						/>
					</Button>
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
				<Button onClick={handleSubmit}> 메뉴 추가 </Button>
			</form>
		</div>
	);
}

export default AddMenu;
