import { Component } from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleItems from '../sample-items';
import Item from './Item';

export default class App extends Component {
    state = {
        items: {},
        order: {}
    };

    addItem = item => {
        // 1. Take a copy of the existing state
        const items = { ...this.state.items };
        // 2. Add our new item to that items variable
        items[`item ${Date.now()}`] = item;
        //3. Set the new items object to state
        this.setState({ items });
    }

    loadSampleItems = () => {
        this.setState({ items: sampleItems });
    }

    addToOrder = key => {
        // 1. Take a copy of state
        const order = { ...this.state.order };
        // 2. Either add to order, or update the number in the order
        order[key] += 1 || 1;
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
                <Order />
                <Inventory 
                    addItem={this.addItem} 
                    loadSampleItems={this.loadSampleItems} 
                />
            </div>
        );
    }
}
