import { Box, Grid } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { SERVER_URL } from '../config';
import UserContext from '../contexts/UserContext';
import { useHistory } from 'react-router-dom';
import { CategoryResponseType } from '../types/ResponseTypes';

const defaultProps = {
	bgcolor: 'background.paper',
	borderColor: 'text.primary',
	m: 1,
	border: 1,
	style: { width: '5rem', height: '5rem' },
};

function CategoryListPage() {
	const url = `${SERVER_URL}/category`;
	const history = useHistory();
	const { userStatus } = useContext(UserContext);
	const [categoryList, setCategoryList] = useState<CategoryResponseType[]>([]);
	useEffect(() => {
		axios({ method: 'get', url }).then((res: AxiosResponse<CategoryResponseType[]>) => {
			const resultArray: CategoryResponseType[] = [];
			res.data.forEach((e: any) => {
				resultArray.push(e);
			});
			setCategoryList(resultArray);
		});
	}, [url]);

	return (
		<Box display="flex" justifyContent="center">
			{categoryList.map((e, index) => {
				return (
					<Grid key={index} item xs={3}>
						<Box
							borderRadius={16}
							{...defaultProps}
							onClick={() => {
								history.push(`/RestaurantList/${e._id}`);
							}}
						>
							{e.name}
						</Box>
					</Grid>
				);
			})}
		</Box>
	);
}

export default CategoryListPage;
