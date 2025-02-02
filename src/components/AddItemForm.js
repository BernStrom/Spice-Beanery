import { Component, createRef } from 'react';
import PropTypes from 'prop-types';

export default class AddItemForm extends Component {
    nameRef = createRef();
    priceRef = createRef();
    statusRef = createRef();
    descRef = createRef();
    imageRef = createRef();

    static propTypes = {
        addFish: PropTypes.func
    }

    createItem = e => {
        e.preventDefault(); // Stops the form from submitting

        const item = {
            name: this.nameRef.current.value,
            price: parseFloat(this.priceRef.current.value),
            status: this.statusRef.current.value,
            desc: this.descRef.current.value,
            image: this.imageRef.current.value
        };

        this.props.addItem(item);
        e.currentTarget.reset(); // Refreshes the form
    }

    render() {
        return (
            <form className="item-edit" onSubmit={this.createItem}>
                <input name="name" ref={this.nameRef} type="text" placeholder="Item Name" />
                <input name="price" ref={this.priceRef} type="text" placeholder="Item Price" />
                <select name="status" ref={this.statusRef}>
                    <option value="available">In Season!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>

                <textarea name="desc" ref={this.descRef} placeholder="Item Description"></textarea>
                <input name="image" ref={this.imageRef} type="text" placeholder="Item Image" />
                <button type="submit">+ Add Item</button>
            </form>
        );
    }
}