import React, { Component } from "react";
import { Button } from "antd";

class Product extends Component {
  render() {
    const { product, addProduct } = this.props;

    return (
      <div>
        {product && (
            <div style={{ display: "flex", justifyContent: "space-evenly" }} >
              <img src={product.url} alt={product.name} style={{ maxWidth: "500px", maxHeight: "400px" }} />
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly" }} >
              <span>{product.description}</span>
              <span>{`R$ ${product.price}`}</span>
              <Button onClick={addProduct.bind(this, product)}>Adicionar</Button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Product;
