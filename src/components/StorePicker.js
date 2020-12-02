import { Component } from 'react';

export default class StorePicker extends Component {   
    render() {
        return (
            <form className="store-selector">
                <h2>Please Enter A Store</h2>
                <input type="text" required placeholder="Store Name"/>
                <button type="submit">Visit Store &#10140;</button>
            </form> 
        );
    }     
}