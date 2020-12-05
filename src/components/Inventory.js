import { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import AddItemForm from './AddItemForm';
import EditItemForm from './EditItemForm';
import Login from './Login';
import base, { firebaseApp } from '../base';

export default class Inventory extends Component {
    static propTypes = {
        items: PropTypes.object,
        updateItem: PropTypes.func,
        deleteItem: PropTypes.func,
        loadSampleItems: PropTypes.func
    };

    state = {
        uid: null,
        owner: null
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.authHandler({ user });
            }
        })
    }

    authHandler = async authData => {
        // 1. Look up the current store in the firebase database
        const store = await base.fetch(this.props.storeId, { context: this });
        console.log(store);
        // 2. Claim it if there is no owner
        if (!store.owner) {
            // Save it as our own
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            });
        }
        // 3. Set the state of the inventory component to reflect the current user
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        });
    }

    authenticate = provider => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp
            .auth()
            .signInWithPopup(authProvider)
            .then(this.authHandler);
    }

    logout = async () => {
        console.log('Logging Out!');
        await firebase.auth().signOut();
        this.setState({ uid: null });
    }

    render() {
        const logout = <button onClick={this.logout}>Log Out!</button>

        // Check if they are logged in
        if (!this.state.uid) {
            return <Login authenticate={this.authenticate} />;
        }

        // Check if they are not the owner of the store
        if (this.state.uid !== this.state.owner) {
            return (
                <div>
                    <p>Sorry you do not have admin access!</p>
                    {logout}
                </div>
            );
        }

        return (
            <div className="inventory">
                <h2>Inventory</h2>
                {logout}
                {Object.keys(this.props.items).map(key => (
                    <EditItemForm 
                        key={key} 
                        index={key} 
                        item={this.props.items[key]} 
                        updateItem={this.props.updateItem}
                        deleteItem={this.props.deleteItem} 
                    />
                ))}
                <AddItemForm addItem={this.props.addItem} />
                <button onClick={this.props.loadSampleItems}>
                    Load Sample Items
                </button>
            </div>
        );
    }
}
