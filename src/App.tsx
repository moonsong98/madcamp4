import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, useHistory, Route, Redirect, Switch } from 'react-router-dom';
import CategoryListPage from './pages/CategoryListPage';
import RestaurantInformationInputPage from './pages/RestaurantInformationInputPage';
import RestaurantManagementPage from './pages/RestaruantManagementPage';
import RestaurantListPage from './pages/RestaurantListPage';
import RestaurantPage from './pages/RestaurantPage';
import AdminManagementPage from './pages/AdminManagementPage';
import AdminLoginPage from './pages/AdminLoginPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Header from './component/Header';
import UserContext from './contexts/UserContext';
import { UserStatus } from './types/AuthTypes';
import RestaurantOwnerChangePasswordPage from './pages/RestaurantOwnerChangePasswordPage';

function App() {
	const [userStatus, setUserStatus] = useState<UserStatus>({ accessToken: '', role: '' });
	return (
		<Router>
			<UserContext.Provider value={{ userStatus, setUserStatus }}>
				<Header />
				<Switch>
					<Route exact path="/" component={CategoryListPage} />
					<Route exact path="/login" component={LoginPage} />
					<ProtectedRoute exact path="/RestaurantInformationInput" userStatus={userStatus}>
						<RestaurantInformationInputPage />
					</ProtectedRoute>
					<Route
						exact
						path="/AdminLogin"
						render={(props) =>
							userStatus.role === 'admin' ? (
								<Redirect to={{ pathname: '/AdminManagement', state: { from: props.location } }} />
							) : (
								<AdminLoginPage />
							)
						}
					/>
					<Route exact path="/AdminManagement" component={AdminManagementPage} />
					<Route exact path="/RestaurantOwnerChangePassword" component={RestaurantOwnerChangePasswordPage} />
					<Route exact path="/RestaurantManagement" component={RestaurantManagementPage} />
					<Route exact path="/RestaurantList/:categoryId" component={RestaurantListPage} />
					<Route exact path="/Restaurant/:restaurantId" component={RestaurantPage} />
					<Route exact path="/SignUp" component={SignUpPage} />
					<Route path="/" render={() => <div>404</div>} />
				</Switch>
			</UserContext.Provider>
		</Router>
	);
}

function ProtectedRoute(props: { path: string; exact: boolean; userStatus: UserStatus; children: React.ReactChild }) {
	console.log('SSS');
	return (
		<Route
			exact
			path={props.path}
			render={() => (props.userStatus.accessToken.length > 0 ? props.children : <Redirect to={{ pathname: '/' }} />)}
		/>
	);
}

export default App;
