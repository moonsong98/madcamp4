import { Route, Router, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import AddMenu from '../component/AddMenu';
import RestaurantManagement from '../component/RestaruantManagement';

function RestaurantManagementPage() {
	const match = useRouteMatch();
	const history = useHistory();
	return (
		<div>
			<Router history={history}>
				<Switch>
					<Route exact path={match.path} component={RestaurantManagement} />
					<Route exact path={`${match.path}/add-menu`} component={AddMenu} />
					<Route path={match.path} render={() => <div>404</div>} />
				</Switch>
			</Router>
		</div>
	);
}

export default RestaurantManagementPage;
