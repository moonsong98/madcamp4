import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, useHistory, Route, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AdministratorPage from './pages/AdministratorPage';
import AdminManagementPage from './pages/AdminManagementPage';
import AdminLoginPage from './pages/AdminLoginPage';
import { getLoginStatus } from './Auth/Authorization';

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
	return (
		<Router>
			<Route exact path="/" component={Home} />
			<Route path="/Administrator" component={AdministratorPage} />
			<Route
				path="/AdminLogin"
				render={(props) =>
					getLoginStatus().role === 'admin' ? (
						<Redirect to={{ pathname: '/AdminManagejment', state: { from: props.location } }} />
					) : (
						<AdminLoginPage />
					)
				}
			/>
			<Route path="/AdminManagement" component={AdminManagementPage} />
		</Router>
	);
}

export default App;
