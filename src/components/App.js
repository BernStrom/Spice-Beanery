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

    render() {
        return (
            <div className="spice-beanery">
                <div className="menu">
                    <Header tagline="Coffee Roasters" />
                    <ul className="items">
                        {Object.keys(this.state.items).map(key => <Item key={key} details={this.state.items[key]} />)}
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
