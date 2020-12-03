import { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { getFunName } from '../helpers';

export default class StorePicker extends Component {
    storeIdInput = createRef();

    static propTypes = {
        history: PropTypes.object
    };

    goToStore = e => {
        // 1. Stops the form from submitting
        e.preventDefault();
        // 2. Get the text from the input
        const storeNameId = this.storeIdInput.current.value;
        // 3. Change the page URL to /store/[whatever-users-entered]
        this.props.history.push(`/store/${storeNameId}`);
    }
    
    render() {
        return (
            <form className="store-selector" onSubmit={this.goToStore}>
                <h2>Enter A Store Name ID</h2>
                <input 
                    type="text"
                    ref={this.storeIdInput}
                    required 
                    placeholder="ID Name" 
                    defaultValue={getFunName()} 
                />
                <button type="submit">Visit Store &#10140;</button>
            </form> 
        );
    }     
}