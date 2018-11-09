import React, { Component } from "react"

class CartElement extends Component {
    state = {  }
    render() {
        const { product } = this.props; 
        return (
        <tr>
            <td style={{ width: "100px" }} >{product.product.name}</td>
            <td style={{textAlign: "center"}}>{product.quant}</td>
            <td>{`R$ ${product.quant * parseFloat(product.product.price)}`}</td>
        </tr>
        );
    }
}
 
export default CartElement;