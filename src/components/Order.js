import { Component } from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

export default class Order extends Component {
    static propTypes = {
        items: PropTypes.object,
        order: PropTypes.object,
        removeFromOrder: PropTypes.func
    };

    renderOrder = key => {
        const item = this.props.items[key];
        const itemCount = this.props.order[key];
        const isAvailable = item && item.status === 'available';
        const transitionOptions = {
            classNames: "order", 
            key, 
            timeout: { enter: 500, exit: 500 }
        };

        if (!item) return null; // Makes sure the item is loaded before continuing 

        if (!isAvailable) {
            return (
                <CSSTransition {...transitionOptions}>
                    <li key={key}>
                        Sorry {item ? item.name : 'item'} is no longer available
                    </li>
                </CSSTransition>
            );
        }

        return (
            <CSSTransition {...transitionOptions}>
                <li key={key}>
                    <span>
                        <TransitionGroup component="span" className="count">
                            <CSSTransition classNames="count" key={itemCount} timeout={{ enter: 500, exit: 500 }}>
                                <span>{itemCount}</span>
                            </CSSTransition>
                        </TransitionGroup>
                        x {item.name} 
                        <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
                    </span>
                    <span className="price">{formatPrice(itemCount * item.price)}</span>
                </li>
            </CSSTransition>
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
                <h2>Your Order</h2>
                <TransitionGroup component="ul" className="order">
                    {orderIds.map(this.renderOrder)}
                </TransitionGroup>
                <div className="total">
                    Total: 
                    <strong>{formatPrice(orderTotal)}</strong>
                </div>
            </div>
        );
    }
}
