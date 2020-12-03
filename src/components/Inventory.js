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

    authHandler = async authData => {
        // 1. Look up the current store in the firebase database
        const store = await base.fetch(this.props.storeId, { context: this });
        // 2. Claim it if there is no owner
        if (!store.owner) {
            // Save it as our own
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            })
        }
        console.log(store);
    }

    authenticate = provider => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp
            .auth()
            .signInWithPopup(authProvider)
            .then(this.authHandler);
    }

    render() {
        // return <Login authenticate={this.authenticate} />;
        return (
            <div className="inventory">
                <h2>Inventory</h2>
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
