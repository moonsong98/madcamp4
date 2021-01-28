import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from '../config';
import { Restaurant } from '../types/RestaurantTypes';
import {
	makeStyles,
	createStyles,
	Theme,
	List,
	ListItemText,
	Divider,
	Paper,
	ListItem,
	TextField,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import MapContainer from '../component/MapContainer';
import UserContext from '../contexts/UserContext';
import moment from 'moment';

const useStyles = makeStyles(() =>
	createStyles({
		rootDiv: {
			flex: 1,
		},
	})
);

interface MatchParams {
	restaurantId: string;
}

interface Props extends RouteComponentProps<MatchParams> {
	restaurantId: string;
}

function RestaurantPage(props: Props) {
	const classes = useStyles();
	const { userStatus } = useContext(UserContext);
	const getRestaurantUrl = `${SERVER_URL}/restaurant/${props.match.params.restaurantId}`;
	const [comment, setComment] = useState('');
	const [updateCommentBody, setUpdateCommentBody] = useState('');
	const [openDialogIndex, setOpenDialogIndex] = useState(-1);
	const [updateCommentIndex, setUpdateCommentIndex] = useState(-1);
	const [restaurantInformation, setRestaurantInformation] = useState<Restaurant>({
		name: '',
		category: '',
		menus: [],
		telephone: '',
		description: '',
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
		location: {
			fullAddress: '',
			extraAddress: '',
		},
	});
	useEffect(() => {
		axios({
			method: 'get',
			url: getRestaurantUrl,
		}).then((res) => {
			setRestaurantInformation(res.data);
			console.log(res);
		});
	}, [getRestaurantUrl]);
	console.log(restaurantInformation);
	return (
		<div className={classes.rootDiv}>
			<List>
				<ListItemText primary={`가게 설명: ${restaurantInformation.description}`} />
				<Divider />
				<ListItemText primary={`가게 전화번호: ${restaurantInformation.telephone}`} />
				<Divider />
				<ListItemText
					primary={`가게 주소: ${restaurantInformation.location.fullAddress} ${restaurantInformation.location.extraAddress}`}
				/>
				<Divider />
				{/* <MapContainer fullAddress={restaurantInformation.location.fullAddress} name={restaurantInformation.name} /> */}
				<Paper>
					<p>댓글</p>
					<List>
						{restaurantInformation.comments?.map((e, index) => {
							return (
								<div>
									<ListItem>
										<ListItemText primary={e.nickname} />
										<ListItemText primary={e.body} />
										<ListItemText primary={moment(e.date).format('YYYY-MM-DD-hh-mm-ss')} />
										<IconButton
											aria-label="update"
											onClick={() => {
												setUpdateCommentBody('');
												setUpdateCommentIndex(index);
											}}
										>
											<UpdateIcon fontSize="small" />
										</IconButton>
										<IconButton
											aria-label="delete"
											onClick={() => {
												setOpenDialogIndex(index);
											}}
										>
											<DeleteIcon fontSize="small" />
										</IconButton>
									</ListItem>
									{updateCommentIndex === index && (
										<div>
											<p>댓글 수정하기</p>
											<TextField
												value={updateCommentBody}
												onChange={(e) => {
													setUpdateCommentBody(e.target.value);
												}}
											/>
											<Button
												onClick={() => {
													if (restaurantInformation.comments) {
														const deleteCommentUrl = `${SERVER_URL}/restaurant/${restaurantInformation._id}/comment/${e._id}`;
														axios({
															method: 'put',
															url: deleteCommentUrl,
															data: {
																body: updateCommentBody,
															},
															headers: {
																token: userStatus.accessToken,
															},
														}).then(() => {
															setUpdateCommentIndex(-1);
															setUpdateCommentBody('');
															axios({
																method: 'get',
																url: getRestaurantUrl,
															}).then((res) => setRestaurantInformation(res.data));
														});
													}
												}}
											>
												수정
											</Button>
											<Button
												onClick={() => {
													setUpdateCommentIndex(-1);
													setUpdateCommentBody('');
												}}
											>
												취소
											</Button>
										</div>
									)}
								</div>
							);
						})}
					</List>
					{userStatus.nickname && (
						<div>
							<TextField
								value={comment}
								onChange={(e) => {
									setComment(e.target.value);
								}}
							/>
							<Button
								onClick={() => {
									const postCommentUrl = `${SERVER_URL}/restaurant/${restaurantInformation._id}/comment`;
									axios({
										method: 'post',
										url: postCommentUrl,
										data: {
											body: comment,
										},
										headers: {
											token: userStatus.accessToken,
										},
										withCredentials: true,
									}).then((res) => {
										setComment('');
										axios({
											method: 'get',
											url: getRestaurantUrl,
										}).then((res) => setRestaurantInformation(res.data));
									});
								}}
							>
								댓글 작성하기
							</Button>
						</div>
					)}
				</Paper>
			</List>
			<Dialog
				open={openDialogIndex > -1}
				keepMounted
				onClose={() => {
					setOpenDialogIndex(-1);
				}}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle id="alert-dialog-slide-title">{'댓글 삭제'}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">댓글을 삭제하시겠습니까?</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => {
							if (restaurantInformation.comments) {
								const deleteCommentUrl = `${SERVER_URL}/restaurant/${restaurantInformation._id}/comment/${restaurantInformation?.comments[openDialogIndex]._id}`;
								axios({
									method: 'delete',
									url: deleteCommentUrl,
									headers: {
										token: userStatus.accessToken,
									},
								})
									.then((res) => {
										axios({
											method: 'get',
											url: getRestaurantUrl,
										}).then((res) => setRestaurantInformation(res.data));
										setOpenDialogIndex(-1);
									})
									.catch((err) => {
										console.error(err);
									});
							}
						}}
						color="primary"
					>
						댓글 삭제
					</Button>
					<Button
						onClick={() => {
							setOpenDialogIndex(-1);
						}}
						color="primary"
					>
						취소
					</Button>
				</DialogActions>
			</Dialog>
			{restaurantInformation.menus.map((e) => {
				return <div></div>;
			})}
		</div>
	);
}

export default RestaurantPage;
