import React, { Component } from 'react';
import memoryUtils from '../../utils/memoryUtils';
import { Redirect ,Switch,Route} from 'react-router-dom';
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav/LeftNav';
import Header from '../../components/header/Header';

// 引入路由组件
import Home from '../home/Home'
import Category from '../category/Category'
import Bar from '../charts/Bar'
import Line from '../charts/Line'
import Pie from '../charts/Pie'
import User from '../user/User'
import Role from '../role/Role'
import Goods from '../goods/Goods'

const {Footer, Sider, Content } = Layout;
// 管理组件
class Admin extends Component {

    render() {

        const user = memoryUtils.user
        // 如果当前没有登录
        if (!user || !user.id) {
            // 如何自动跳转到登录(render中如何跳转)
            return <Redirect to='/login' />

        }
        return (
            <Layout style={{ height: "100%" }}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{margin:20, backgroundColor:'white'}}>
                        <Switch>
                            <Route path="/home" component={Home}/>
                            <Route path="/category" component={Category}/>
                            <Route path="/goods" component={Goods}/>
                            <Route path="/user" component={User}/>
                            <Route path="/role" component={Role}/>
                            <Route path="/charts/bar" component={Bar}/>
                            <Route path="/charts/line" component={Line}/>
                            <Route path="/charts/pie" component={Pie}/>
                            {/* 什么都不匹配直接定位到home路由上 */}
                            <Redirect to="/home"/>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:'center',color:'grain'}}>我是Appleyk，CSDN博客地址：<a href='https://blog.csdn.net/Appleyk' target='_blank' rel="noopener noreferrer">https://blog.csdn.net/Appleyk</a></Footer>
                </Layout>
            </Layout>
        );
    }
}

export default Admin;
