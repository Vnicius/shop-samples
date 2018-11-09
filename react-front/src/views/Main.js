import React, { Component } from "react";
import { Layout, Menu, Breadcrumb, Icon, Row } from "antd";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import Api from "../api";
import ShoppingList from "./ShoppingList";
import Products from "./Products";
import Product from "./Product";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      products: [],
      selectedCategory: "",
      selectedProducts: [],
      stack: []
    };
  }

  componentWillMount() {
    this.getCategories();
    this.getProducts();
    this.setState({ selectedProducts: this.props.selectedProducts });
  }

  componentWillUpdate() {
    console.log(this.props);
  }

  getCategories = () => {
    Api.getCategories()
      .then(response => {
        this.setState({ categories: response.data }, this.getSelectedCategory);
      })
      .catch(console.error);
  };

  getSelectedCategory = () => {
    const { categories } = this.state;
    if (categories.length !== 0)
      this.setState({ selectedCategory: categories[0].catid });
  };

  getProducts = () => {
    Api.getProducts()
      .then(response => {
        this.setState({
          products: response.data
        });
      })
      .catch(console.error);
  };

  renderCards = props => {
    const { products, selectedCategory, categories } = this.state;

    if (props.match.params.catid && categories.length !== 0) {
      let catid = props.match.params.catid;
      this.addStack({
        name: this.getCategoryName(parseInt(catid)),
        to: `/${catid}`
      });
    }

    return (
      products.length !== 0 && (
        <Products
          match={props.match}
          products={products}
          addProduct={this.props.addProduct}
        />
      )
    );
  };

  showCategories = () => {
    const { categories } = this.state;

    return (
      categories.length !== 0 &&
      categories.map(category => (
        <Menu.Item
          key={category.catid}
          onClick={this.onSelectCategory(category)}
        >
        <Link to={`/${category.catid}`} >
            {category.name}
        </Link> 
        </Menu.Item>
      ))
    );
  };

  getCategoryName = id => {
    const { categories } = this.state;
    let category = categories.filter(element => element.catid === id);
    return category.length !== 0 ? category[0].name : "";
  };

  onSelectCategory = category => () => {
    this.setState({
      selectedCategory: category.catid
    });

    this.goToStack({ name: category.name, to: `/${category.catid}` })();
  };

  addStack = stage => {
    const { stack } = this.state;

    if (stack.findIndex(element => element.name === stage.name) === -1) {
      this.setState({
        stack: [...stack, stage]
      });
    }
  };

  goToStack = stage => () => {
    const { stack } = this.state;
    let index = stack.findIndex(element => element.name === stage.name);
    console.log(index)
    if (index !== -1) {
      this.setState({
        stack: stack.slice(0, index)
      });
    }
  };

  getStack = () => {
    const { stack } = this.state;

    return (
      <Breadcrumb style={{ margin: "16px 0", display: "inline-block" }}>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        {stack.length !== 0 &&
          stack.map(element => (
            <Breadcrumb.Item
              key={element.name}
              onClick={this.goToStack(element)}
            >
              <Link to={element.to}>{element.name}</Link>
            </Breadcrumb.Item>
          ))}
      </Breadcrumb>
    );
  };

  toProduct = props => {
    const { products } = this.state;
    const { addProduct } = this.props;
    let product = products[0];

    if (props.match.params.pid) {
      let pid = parseInt(props.match.params.pid);
      let index = products.findIndex(element => element.pid === pid);
      if (index !== -1) {
        product = products[index];
        this.addStack({
          name: product.name,
          to: `/product/${product.pid}`
        });
        this.addStack({
          name: this.getCategoryName(product.catid),
          to: `/${product.catid}`
        });
      }
    }

    console.log(product);

    return product ? <Product product={product} addProduct={addProduct} /> : "";
  };

  render() {
    return (
      <Router>
        <Layout>
          <Header className="header">
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
              style={{ lineHeight: "64px" }}
            >
              <Menu.Item key="1">
                <span>
                  <Icon type="shop" theme="outlined" />
                  Sample shop
                </span>
              </Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: "0 50px" }}>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between"
              }}
            >
              {this.getStack()}
              <ShoppingList
                style={{ display: "inline", paddingTop: "8px" }}
                products={this.props.selectedProducts}
              />
            </div>

            <Layout style={{ padding: "24px 0", background: "#fff" }}>
              <Sider width={200} style={{ background: "#fff" }}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={["1"]}
                  defaultOpenKeys={["sub1"]}
                  style={{ height: "100%" }}
                >
                  <SubMenu
                    key="sub1"
                    title={
                      <span>
                        <Icon type="tags" theme="outlined" />
                        Categorias
                      </span>
                    }
                  >
                    {this.showCategories()}
                  </SubMenu>
                </Menu>
              </Sider>
              <Content style={{ padding: "0 24px", minHeight: 280 }}>
                <Route
                  path="/"
                  exact
                  render={() =>
                    this.state.categories.length !== 0 && (
                      <Redirect to={`/${this.state.categories[0].catid}`} />
                    )
                  }
                />
                <Route
                  path="/:catid"
                  exact
                  render={props => this.renderCards(props)}
                />
                <Route path="/product/:pid" exact render={this.toProduct} />
              </Content>
            </Layout>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Projeto Tópicos especiais em computação ©2018
          </Footer>
        </Layout>
      </Router>
    );
  }
}

export default Main;
