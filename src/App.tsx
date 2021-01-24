import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, useHistory, Route, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AdministratorPage from './pages/AdministratorPage';
import AdminManagementPage from './pages/AdminManagementPage';
import AdminLoginPage from './pages/AdminLoginPage';
import LoginPage from './pages/LoginPage';
import Header from './component/Header';
import UserContext from './contexts/UserContext';
import { UserStatus } from './types/AuthTypes';
import RestaurantOwnerChangePasswordPage from './pages/RestaurantOwnerChangePasswordPage';

function Home() {
	const history = useHistory();
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<Button
					onClick={() => {
						history.push('/Administrator');
					}}
				>
					관리자 페이지
				</Button>
			</header>
		</div>
	);
}

function App() {
	const [userStatus, setUserStatus] = useState<UserStatus>({ accessToken: '', role: '' });
	return (
		<Router>
			<UserContext.Provider value={{ userStatus, setUserStatus }}>
				<Header />
				<Route exact path="/" component={Home} />
				<Route path="/Administrator" component={AdministratorPage} />
				<Route
					path="/AdminLogin"
					render={(props) =>
						userStatus.role === 'admin' ? (
							<Redirect to={{ pathname: '/AdminManagement', state: { from: props.location } }} />
						) : (
							<AdminLoginPage />
						)
					}
				/>
				<Route
					path="/AdminManagement"
					render={(props) =>
						userStatus.role === 'admin' ? (
							<AdminManagementPage />
						) : (
							<Redirect to={{ pathname: '/', state: { from: props.location } }} />
						)
					}
				/>
				<Route path="/Login" component={LoginPage} />
				<Route path="/RestaurantOwnerChangePassword" component={RestaurantOwnerChangePasswordPage} />
			</UserContext.Provider>
		</Router>
	);
}

export default App;
