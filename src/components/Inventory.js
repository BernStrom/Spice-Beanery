import { Component } from 'react';
import AddItemForm from './AddItemForm';
import EditItemForm from './EditItemForm';

export default class Inventory extends Component {
    render() {
        return (
            <div className="inventory">
                <h2>Inventory</h2>
                {Object.keys(this.props.items).map(key => (
                    <EditItemForm 
                        key={key} 
                        index={key} 
                        item={this.props.items[key]} 
                        updateItem={this.props.updateItem} 
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
