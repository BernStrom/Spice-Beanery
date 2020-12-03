import { Component } from 'react';
import { formatPrice } from '../helpers';

export default class Item extends Component {
    handleClick = () => { 
        this.props.addToOrder(this.props.index);
    }
    
    render() {
        const { image, name, price, desc, status } = this.props.details;
        const isAvailable = status === 'available';

        return (
            <li className="menu-item">
                <img src={image} alt={name} />
                <h3 className="item-name">
                    {name}
                    <span className="price">{formatPrice(price)}</span>
                </h3>
                <p>{desc}</p>
                <button disabled={!isAvailable} onClick={this.handleClick}>
                    {isAvailable ? 'Add To Order' : 'Sold Out!'}
                </button>
            </li>
        );
    }
}
