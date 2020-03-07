import React, { Component } from 'react';
import './LeftNav.less'
import logo from '../../assets/images/logo.png';
import { Link ,withRouter} from 'react-router-dom';
import { Menu, Icon } from 'antd';
import menuList from "../../config/menuConfig.js"

const { SubMenu } = Menu
class LeftNav extends Component {

    /**
     * 根据menu到数据数组生成对应到标签数组
     * (1)使用map递归调用
     */
    getMenuNodes_map = (menuList) => {
        return menuList.map(item => {
            /**
             {
                 title:"首页",
                 path:"/home",
                 icon:"home",
                 children:[
                     {
                       
                     }
                 ]
             }
             */
            if (!item.children) {
                return <Menu.Item key={item.key}>
                    <Link to={item.key}>
                        <Icon type={item.icon} />
                        <span>{item.title}</span>
                    </Link>
                </Menu.Item>
            } else {
                return <SubMenu
                    key={item.key}
                    title={
                        <span>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </span>
                    }>
                    {
                        this.getMenuNodes(item.children)
                    }
                </SubMenu>
            }
        })
    }

    /**
     * 根据menu到数据数组生成对应到标签数组
     * (1)使用reduce递归调用
     */
    getMenuNodes= (menuList) => {
        const path =this.props.location.pathname
        return menuList.reduce((pre, item) => {
            // 像pre中添加<Menu.Item/> 或 <SubMenu/>
            if (!item.children) {
                pre.push((
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                ))
            } else {
                // 查找当前地址栏中的路由地址 == 子菜单项的key
                const citem = item.children.find(citem =>citem.key === path)
                // 如果不等于空，要展开的key就等于子菜单的key，注意不是子菜单的孩子的key
                if(citem){
                    this.openKey = item.key
                    console.log('openKey',this.openKey)
                }
                pre.push((
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }>

                        {
                            this.getMenuNodes(item.children)
                        }
                     </SubMenu>
                ))

            }
            return pre
        }, [])
    }

    // 在render()之前准备数据，同步，注意只调用一次
    componentWillMount(){
        this.menuList = this.getMenuNodes(menuList)
    }

    render() {

        // 得到当前的路由路径path
        const path =this.props.location.pathname
        const openKey = this.openKey
        console.log("render()",path)

        return (
            <div className='left-nav'>
                <Link to="/" className='left-nav-header'>
                    <img src={logo} alt="小黄人" />
                    <h1>宝妈后台</h1>
                </Link>
                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                >
                
                    {
                        this.menuList
                    }

                </Menu>
            </div>
        );
    }
}

/**
 * 如何让一个非路由组件变成路由组件
 * withRouter高阶组件：
 * 包装非路由组件，返回一个新的组件
 * 新的组件向非路由组件传递3个属性：history、location、match
 */
export default withRouter(LeftNav)
