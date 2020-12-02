import { 
    BrowserRouter as Router,
    Switch, 
    Route 
} from 'react-router-dom';
import App from './App';
import NotFound from './NotFound';
import StorePicker from './StorePicker';

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={StorePicker} />
            <Route path="/store/:storeId" component={App} />
            <Route component={NotFound} />
        </Switch>
    </Router>
);

export default Routes;