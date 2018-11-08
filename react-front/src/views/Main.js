import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon, Card, Row, Col, Button } from 'antd';

import Api from '../api';

const { Meta } = Card;
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: [],
		};
	}

	async componentDidMount() {
		try {
			const res = await Api.getCategories();
			console.log(res.data);
			this.setState({ categories: res.data._embedded.poiResourceList });
		} catch (error) {
			console.error(error);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		console.log({ ...this.state.categories });
	}

	renderCards = () => {
		return this.state.categories.map(category => {
			const name = category.poi.name;
      let image = category._links ? category._links.photo.href : 'http://www.clinicaprimacordis.com.br/wp-content/uploads/2016/10/orionthemes-placeholder-image.png';
			return (
					<Col style={{ margin: 16 }} span={5}>
						<Card
							hoverable
							style={{ width: 240 }}
							cover={<img alt="example" src={image} />}
						>
							<Meta title={name} description="" />
						</Card>

						<Button onClick={e=>this.onClick(name)} >Adicionar</Button>
					</Col>
			);
		});
	};

	onClick = (indice) => {
		console.log(indice + "clicado!")
	}

	render() {
		return (
			<Layout>
				<Header className="header">
					<div className="logo" />
					<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{ lineHeight: '64px' }}>
						<Menu.Item key="1">
							<span>
								<Icon type="shop" theme="outlined" />
								Sample shop
							</span>
						</Menu.Item>
					</Menu>
				</Header>
				<Content style={{ padding: '0 50px' }}>
					<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>Home</Breadcrumb.Item>
						<Breadcrumb.Item>List</Breadcrumb.Item>
						<Breadcrumb.Item>App</Breadcrumb.Item>
					</Breadcrumb>
					<Layout style={{ padding: '24px 0', background: '#fff' }}>
						<Sider width={200} style={{ background: '#fff' }}>
							<Menu
								mode="inline"
								defaultSelectedKeys={['1']}
								defaultOpenKeys={['sub1']}
								style={{ height: '100%' }}
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
									<Menu.Item key="1">option1</Menu.Item>
									<Menu.Item key="2">option2</Menu.Item>
									<Menu.Item key="3">option3</Menu.Item>
									<Menu.Item key="4">option4</Menu.Item>
								</SubMenu>
							</Menu>
						</Sider>
						<Content style={{ padding: '0 24px', minHeight: 280 }}>
							<Row type="flex" justify="center">
								{this.renderCards()}
							</Row>
						</Content>
					</Layout>
				</Content>
				<Footer style={{ textAlign: 'center' }}>Projeto Tópicos especiais em computação ©2018</Footer>
			</Layout>
		);
	}
}

export default Main;
