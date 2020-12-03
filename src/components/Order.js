import { Component } from 'react';
import { formatPrice } from '../helpers';

export default class Order extends Component {
    renderOrder = key => {
        const item = this.props.items[key];
        const itemCount = this.props.order[key];
        const isAvailable = item.status === 'available';

        if (!isAvailable) {
            return (
                <li key={key}>
                    Sorry {item ? item.name : 'item'} is no longer available
                </li>
            );
        }

        return (
            <li key={key}>
                {itemCount}x {item.name} 
                {formatPrice(itemCount * item.price)}
            </li>
        );
    }

    render() {
        const orderIds = Object.keys(this.props.order);
        const orderTotal = orderIds.reduce((prevTotal, key) => {
            const item = this.props.items[key];
            const itemCount = this.props.order[key];
            const isAvailable = item && item.status === 'available';

            if (isAvailable) {
                return prevTotal + (itemCount * item.price);
            }

            return prevTotal;
        }, 0);

        return (
            <div className="order-wrap">
                <h2>Order</h2>
                <ul className="order">
                    {orderIds.map(this.renderOrder)}
                </ul>
                <div className="total">
                    Total: 
                    <strong>{formatPrice(orderTotal)}</strong>
                </div>
            </div>
        );
    }
}
