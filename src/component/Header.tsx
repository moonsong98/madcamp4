import React, { useContext } from 'react';
import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { AccountCircle } from '@material-ui/icons';
import UserContext from '../contexts/UserContext';

const useStyles = makeStyles(() =>
	createStyles({
		root: {
			flex: 1,
			flexDirection: 'column',
			justifyContent: 'space-between',
		},
	})
);

function Header() {
	const classes = useStyles();
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

	const loginButtonOrProfileMenu = () => {};
	return (
		<AppBar className={classes.root} position="static">
			<Toolbar>
				<p>배달음식</p>
				{loginButtonOrProfileMenu()}
				{userStatus.accessToken.length > 0 ? (
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
							<Link to="/">
								<MenuItem onClick={handleLogout}>Logout</MenuItem>
							</Link>
						</Menu>
					</div>
				) : (
					<Link to="/login">
						<Button color="inherit">Login</Button>
					</Link>
				)}
			</Toolbar>
		</AppBar>
	);
}

export default Header;
