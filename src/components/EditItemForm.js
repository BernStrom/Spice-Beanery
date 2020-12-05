import { Component } from 'react';
import PropTypes from 'prop-types';

export default class EditItemForm extends Component {
    static propTypes = {
        item: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            desc: PropTypes.string,
            status: PropTypes.string,
            price: PropTypes.number
        }),
        index: PropTypes.string,
        updateItem: PropTypes.func
    };

    handleChange = e => {
        console.log(e.currentTarget.value);
        // Takes a copy of the current item
        const updatedItem = { 
            ...this.props.item, 
            [e.currentTarget.name]: e.currentTarget.value 
        };

        this.props.updateItem(this.props.index, updatedItem);
    }

    render() {
        return (
            <div className="item-edit">
                <input 
                    type="text" 
                    name="name" 
                    onChange={this.handleChange} 
                    value={this.props.item.name} 
                />
                <input 
                    type="text" 
                    name="price" 
                    onChange={this.handleChange} 
                    value={this.props.item.price} 
                />
                <select 
                    type="text" 
                    name="status" 
                    onChange={this.handleChange} 
                    value={this.props.item.status}
                >
                    <option value="available">In Season!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea 
                    type="text" 
                    name="desc" 
                    onChange={this.handleChange} 
                    value={this.props.item.desc}
                ></textarea>
                <input 
                    type="text" 
                    name="image" 
                    onChange={this.handleChange} 
                    value={this.props.item.image} 
                />
                <button onClick={() => this.props.deleteItem(this.props.index)}>
                    Remove Item
                </button>
            </div>
        )
    }
}
