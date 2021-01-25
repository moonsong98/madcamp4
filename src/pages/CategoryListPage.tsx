import { Box, Grid } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../config';
import UserContext from '../contexts/UserContext';

const defaultProps = {
	bgcolor: 'background.paper',
	borderColor: 'text.primary',
	m: 1,
	border: 1,
	style: { width: '5rem', height: '5rem' },
};

function CategoryListPage() {
	const url = `${SERVER_URL}/category`;
	const { userStatus } = useContext(UserContext);
	const [categoryList, setCategoryList] = useState<string[]>([]);
	useEffect(() => {
		axios({ method: 'get', url }).then((res) => {
			const resultArray: string[] = [];
			res.data.forEach((e: any) => {
				resultArray.push(e.name);
			});
			setCategoryList(resultArray);
		});
	}, [url]);

	console.log(userStatus);
	return (
		<Box display="flex" justifyContent="center">
			{categoryList.map((e, index) => {
				return (
					<Grid key={index} item xs={3}>
						<Box borderRadius={16} {...defaultProps}>
							{e}
						</Box>
					</Grid>
				);
			})}
		</Box>
	);
}

export default CategoryListPage;
