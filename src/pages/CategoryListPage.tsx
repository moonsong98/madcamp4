import { Box, Button, Grid, Paper } from '@material-ui/core';
import { createStyles, fade, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useContext, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { SERVER_URL } from '../config';
import UserContext from '../contexts/UserContext';
import { useHistory } from 'react-router-dom';
import { CategoryResponseType } from '../types/ResponseTypes';
import RestaurantListPage from './RestaurantListPage';

const defaultProps = {
	style: { width: '6rem', height: '4rem' },
};
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flex: 1,
			flexDirection: 'row',
			justifyContent: 'space-between',
			marginLeft: '20%',
			marginRight: '20%',
		},
	})
);

function CategoryListPage() {
	const url = `${SERVER_URL}/category`;
	const classes = useStyles();
	const history = useHistory();
	const [categoryId, setCategoryId] = useState<string | null>(null);
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
		<div>
			<Paper>
				<div className={classes.root}>
					{categoryList.map((e, index) => {
						return (
							<Button
								{...defaultProps}
								onClick={() => {
									// history.push(`/RestaurantList/${e._id}`);
									setCategoryId(e._id);
								}}
							>
								<Box m="auto">{e.name}</Box>
							</Button>
						);
					})}
				</div>
			</Paper>
			{categoryId && <RestaurantListPage categoryId={categoryId} />}
		</div>
	);
}

export default CategoryListPage;
