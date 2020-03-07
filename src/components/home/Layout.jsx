import { Layout, Menu, Breadcrumb } from './node_modules/antd';
import React, { Component } from './node_modules/react'

const { Header, Content, Footer } = Layout;
export default class MyLayout extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={[2]}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key='1'>首页</Menu.Item>
                        <Menu.Item key='2'>服务</Menu.Item>
                        <Menu.Item key='3'>数据</Menu.Item>
                        <Menu.Item key='4'>场景</Menu.Item>
                    </Menu>

                </Header>
                <Content style={{ padding: '0 50' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>index</Breadcrumb.Item>
                        <Breadcrumb.Item>service</Breadcrumb.Item>
                        <Breadcrumb.Item>data</Breadcrumb.Item>
                        <Breadcrumb.Item>scene</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ background: 'fff', padding: 24, minHeight: 280 }}>content</div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Imagesky @2019 Created by appleyk</Footer>
            </Layout>
        )
    }

}
