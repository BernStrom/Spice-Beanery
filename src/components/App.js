import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleItems from '../sample-items';
import Item from './Item';
import base from '../base';

export default class App extends Component {
    state = {
        items: {},
        order: {}
    };

    static propTypes = {
        match: PropTypes.object
    }

    componentDidMount() {
        const { params } = this.props.match;

        // Reinstate localStorage
        const localStorageRef = localStorage.getItem(params.storeId);
        if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) });
        }

        this.ref = base.syncState(`${params.storeId}/items`, {
            context: this,
            state: 'items'
        });
    }

    componentDidUpdate() {
        const { params } = this.props.match;
        localStorage.setItem(params.storeId, JSON.stringify(this.state.order));
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    addItem = item => {
        // 1. Take a copy of the existing state
        const items = { ...this.state.items };
        // 2. Add our new item to that items variable
        items[`item ${Date.now()}`] = item;
        //3. Set the new items object to the state
        this.setState({ items });
    }

    updateItem = (key, updatedItem) => {
        // 1. Takes a copy of the current state
        const items = { ...this.state.fishes };
        // 2. Update that state
        items[key] = updatedItem;
        // 3. Set that to the state
        this.setState({ items });
    }

    deleteItem = key => {
        // 1. Take a copy of the existing state
        const items = { ...this.state.items };
        // 2. Update that state
        items[key] = null;
        // 3. Set that to the state
        this.setState({ items });
    }

    loadSampleItems = () => {
        this.setState({ items: sampleItems });
    }

    addToOrder = key => {
        // 1. Take a copy of state
        const order = { ...this.state.order };
        // 2. Either add to order, or update the number in the order
        order[key] = order[key] + 1 || 1;
        // 3. Call setState to update our state object
        this.setState({ order });
    }

    removeFromOrder = key => {
        // 1. Take a copy of state
        const order = { ...this.state.order };
        // 2. Remove that item from order
        delete order[key];
        // 3. Call setState to update our state object
        this.setState({ order });
    }

    render() {
        return (
            <div className="spice-beanery">
                <div className="menu">
                    <Header tagline="Coffee Roasters" />
                    <ul className="items">
                        {Object.keys(this.state.items).map(key => (
                            <Item 
                                key={key}
                                index={key} 
                                details={this.state.items[key]} 
                                addToOrder={this.addToOrder} 
                            />
                        ))}
                    </ul>
                </div>
                <Order 
                    items={this.state.items} 
                    order={this.state.order} 
                    removeFromOrder={this.removeFromOrder}
                />
                <Inventory 
                    addItem={this.addItem}
                    updateItem={this.updateItem}
                    deleteItem={this.deleteItem}
                    loadSampleItems={this.loadSampleItems}
                    items={this.state.items}
                    storeId={this.props.match.params.storeId} 
                />
            </div>
        );
    }
}
