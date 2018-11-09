import React, { Component } from "react";
import { Card, Col, Button, Row } from "antd";
import { Link } from "react-router-dom"

const { Meta } = Card;

class Products extends Component {
  state = {};

  getProducts = () => {
    const { products, addProduct, match } = this.props;
    console.log(this.props);

    return (
      <Row type="flex" justify="center">
        {products.length !== 0 &&
          match.params.catid &&
          products
            .filter(product => product.catid.toString() === match.params.catid)
            .map(product => {
              const name = product.name;
              let image =
                product.url ||
                "http://www.clinicaprimacordis.com.br/wp-content/uploads/2016/10/orionthemes-placeholder-image.png";
              return (
                <Col style={{ margin: 16 }} span={5} key={product.pid}>
                      <Link to={`/product/${product.pid}`} >
                    <Card
                      hoverable
                      style={{ width: 240 }}
                      cover={<img alt="example" src={image} />}
                    >
                      <Meta title={name} description="" />
                    </Card>
                  </Link>
                  <Button
                    onClick={() => addProduct(product)}
                    style={{ marginLeft: 75, marginTop: 16 }}
                  >
                    Adicionar
                  </Button>
                </Col>
              );
            })}
      </Row>
    );
  };

  render() {
    const { products } = this.props;
    return products.length === 0 ? "" : this.getProducts();
  }
}

export default Products;
