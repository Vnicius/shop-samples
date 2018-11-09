import React, { Component } from "react";

import Main from "./views/Main";

import "./App.css";

class App extends Component {
  state = {
    selectedProducts: []
  };

  addProduct = product => {
    const { selectedProducts } = this.state;
    let index = selectedProducts.findIndex(p => p.product.pid === product.pid);
    if (index === -1) {
      this.setState({
        selectedProducts: [...selectedProducts, { product, quant: 1 }]
	  });
    } else {
	  let element = selectedProducts[index]
	  element.quant++

      this.setState({ selectedProducts: [...selectedProducts.slice(0, index), element, ...selectedProducts.slice(index + 1)]});
    }
  };

  removeProduct = pid => {
    const { selectedProducts } = this.state;
	let index = selectedProducts.findIndex(p => p.pid === pid);
	
	if(index !== -1) {
		this.setState({ selectedProducts: [...selectedProducts.slice(0, index), selectedProducts.slice(index+1)] })
	}
  };

  render() {
    return <Main selectedProducts={this.state.selectedProducts} addProduct={this.addProduct} removeProduct={this.removeProduct} />;
  }
}

export default App;
