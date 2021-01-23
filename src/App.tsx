import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, useHistory, Route } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AdministratorPage from './pages/AdministratorPage';

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
		</Router>
	);
}

export default App;
