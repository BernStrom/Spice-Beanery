import { Component } from 'react';
import { formatPrice } from '../helpers';

export default class Item extends Component {
    render() {
        const { image, name, price, description, status } = this.props.details;

        return (
            <li className="menu-item">
                <img src={image} alt={name} />
                <h3 className="item-name">
                    {name}
                    <span className="price">{formatPrice(price)}</span>
                </h3>
            </li>
        );
    }
}
