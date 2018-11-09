import React, { Component } from "react";
import { Icon, Popover, Button } from "antd";

import "./shoppinglist.css";
import CartElement from "./CartElement";

class ShoppingList extends Component {
  state = {
    products: []
  };

  getProducts = () => {
    const { products } = this.props;

    return (
      products.length !== 0 && (
        <>
          <table>
            <thead>
              <tr>
                <td><strong>Produto</strong></td>
                            <td style={{ width: "50px" }}><strong>Qnt.</strong></td>
                            <td><strong>Preço</strong></td>
              </tr>
            </thead>

            <tbody>
              {products.map(product => (
                <CartElement key={product.product.pid} product={product} />
              ))}
              <tr>
                <td><strong>Total</strong></td>
                <td></td>
                <td><strong>{`R$ ${this.calcTotal()}`}</strong></td>
                </tr>

            </tbody>
          </table>
          <Button style={{ display: "block" }}>Checkout</Button>
        </>
      )
    );
  };

  calcTotal = () => {
    const { products } = this.props;
    let acc = 0;

    products.forEach(product => {
        acc += product.quant * parseFloat(product.product.price)
    })

    return acc;
  }

  render() {
    return (
      <div style={this.props.style} className={"shoppinglist"}>
        <Popover
          placement={"bottomLeft"}
          title={"Cart"}
          content={this.getProducts()}
          trigger={"hover"}
        >
          <Icon
            className={"shoppinglist-icon"}
            type="shopping-cart"
            theme="outlined"
          />
          <h2 style={{ display: "inline", marginLeft: "5px" }}>
            Shopping List
          </h2>
        </Popover>
      </div>
    );
  }
}

export default ShoppingList;
