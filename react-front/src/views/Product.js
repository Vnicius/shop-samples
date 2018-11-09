import React, { Component } from 'react';

class Product extends Component {

    render() {

        const { product, addProduct } = this.props; 
        
        return (<div>
            { product && product.name }
        </div>
        );
    }
}
 
export default Product;