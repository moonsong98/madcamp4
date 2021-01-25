import React, { useContext } from 'react';
import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { AccountCircle } from '@material-ui/icons';
import UserContext from '../contexts/UserContext';

const useStyles = makeStyles(() =>
	createStyles({
		root: {
			flex: 1,
			flexDirection: 'column',
			justifyContent: 'space-between',
		},
		menu: {
			float: 'right',
		},
	})
);

function Header() {
	const classes = useStyles();
	const history = useHistory();
	const { userStatus, setUserStatus } = useContext(UserContext);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleLogout = () => {
		handleClose();
		setUserStatus({ accessToken: '', role: '' });
	};
	const handleRestaurantManagementMenu = () => {
		userStatus.isInitialPassword
			? history.push('/RestaurantOwnerChangePassword')
			: history.push('/RestaurantInformationInput');
		handleClose();
	};

	const renderMenu =
		userStatus.accessToken.length > 0 ? (
			<div>
				<IconButton
					aria-label="account of current user"
					aria-controls="menu-appbar"
					aria-haspopup="true"
					onClick={handleMenu}
					color="inherit"
				>
					<AccountCircle />
				</IconButton>
				<Menu
					id="menu-appbar"
					anchorEl={anchorEl}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					keepMounted
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					open={open}
					onClose={handleClose}
				>
					{userStatus.role === 'restaurantOwner' && (
						<MenuItem onClick={handleRestaurantManagementMenu}>가게 정보 수정</MenuItem>
					)}
					<MenuItem onClick={handleLogout}>로그아웃</MenuItem>
				</Menu>
			</div>
		) : (
			<Button
				color="inherit"
				onClick={() => {
					history.push('/login');
				}}
			>
				Login
			</Button>
		);

	return (
		<AppBar className={classes.root} position="static">
			<Toolbar>
				<p
					onClick={() => {
						history.push('/');
					}}
				>
					배달음식
				</p>
				<div className={classes.menu}>{renderMenu}</div>
			</Toolbar>
		</AppBar>
	);
}

export default Header;
