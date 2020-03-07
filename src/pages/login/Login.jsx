import React, { Component } from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import './Login.less'
import logo from './images/logo.jpg'
// 分别暴露需要些大括号
import { reqLogin} from '../../api';
import {Redirect} from 'react-router-dom';
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'

// 登录组件
class Login extends Component {

    handleSubmit = (e) => {
        // 阻事件的默认行为
        e.preventDefault()

        // 对所有表单字段进行校验
        this.props.form.validateFields(async (err, values) => {

            // 如果校验成功 values-->对象
            if (!err) {
                console.log('提交登录的ajax请求', values);
                // 调登录接口  ctrl + - 三个组合键回退到上一次代码浏览的位置
                const { username, password } = values
                const result = await reqLogin(username, password)
                console.log('请求成功', result)
                if (result.status === 200) {
                    message.success('登录成功!')
                    // 拿到用户信息
                    const user = result.data
                    // 保存user == > 内存
                    memoryUtils.user = user
                    // 保存user == > 本地
                    storageUtils.saveUser(user)
                    // 跳转到管理页面(事件跳转)
                    this.props.history.replace('/')
                } else {
                    message.error(result.data)
                }
            } else {
                console.log('校验失败！')
            }
        });

        // 得到form对象
        // const form = this.props.form
        // // 获取表单项的输入数据
        // const values = form.getFieldsValue()
        // message.success('登录成功！用户名：' + form.getFieldValue('username') + ',密码：' + form.getFieldValue('password'))
        // console.log(values)
    }

    /**
     * 对密码进行自定义验证
     */
    validatePwd = (rule, value, callback) => {
        console.log('validatePwd()', rule, value)
        if (!value) {
            callback('必须输入')
        } else if (value.length < 4) {
            callback('密码长度必须大于4')
        } else if (value.length > 12) {
            callback('密码长度必须小于12')
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback("密码必须是英文、数字或下划线组成") // 验证通过
        } else {
            callback()
        }
    }


    render() {

        // 判断用户是否登录，如果已经登录，自动跳转到管理界面
        if(memoryUtils.user && memoryUtils.user.id){
            return <Redirect to='/admin'/>
        }

        // 具有强大功能的form对象
        const form = this.props.form;
        const { getFieldDecorator } = form;


        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo" />
                    <h1>爱的小窝：后台管理</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {
                                /**
                               * 用户名/密码的合法要求
                               * a、必须输入
                               * b、必须大于4位
                               * c、必须小于12位
                               * d、必须是英文、数字或下划线组成
                               */
                            }
                            {
                                getFieldDecorator('username', {//配置对象：属性名是特定的一些名称
                                    // 声明式验证，直接使用别人定义好的验证规则去进行验证
                                    rules: [
                                        { required: true, whitespace: true, message: '请输入用户名' },
                                        { min: 4, message: '用户名至少4位' },
                                        { max: 12, message: '用户名最多12位' },

                                        { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' }

                                    ], initialValue: 'admin'
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Username"
                                    />
                                )
                            }

                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('password', {
                                    rules: [
                                        {
                                            validator: this.validatePwd
                                        }
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="Password"
                                    />
                                )
                            }

                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                             </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        );
    }
}

/**
 * 1、高阶函数 -- 返回的是一个函数
 * 1) 一类特别的函数
 *      a. 接收函数类型的参数
 *      b. 返回值是函数
 * 
 * 2） 常见
 *      a.定时器：setTimeout() / setInterval()
 *      b.Promise:Promise( () => {} ) then(value => {},reason => {})
 *      c.数组遍历相关的方法：forEach()/filter()/map()/reduce()/find()/findIndex()
 *      d.函数对象的bind()
 *      e.Form.Create()() / getFieldDecorator()()
 * 
 * 3)  高阶函数更加动态，更加具有扩展性
 * 
 * 2、高阶组件
 * 1)、本质就是一个函数
 * 2)、接收一个组件（被包装组件），返回一个新的组件（包装组件），包装组件会向被包装组件传入一个特定属性
 * 3)、作用：扩展组件的功能
 * 4)、高阶组件也是高阶函数：接收一个组件函数，返回一个新的组件函数
 */

/**
 * 包装Form组件 生成一个新的组件：Form(Login)
 * 新组件会向被包装的组件传递一个具有强大功能的form对象 （就是父组件向子组件传递form对象）
 */
const WrapLogin = Form.create()(Login);
export default WrapLogin;
 /**
* (1) 前台表单验证
* (2) 收集表单数据
*/

/**
 *  async 和 await
 *
 * 1、作用？
 *    简化promise对象的使用：不用再使用.then来指定成功或失败的回调函数
 *    以同步编码（没有回调函数）的方式实现异步流程
 *
 * 2、哪里写async？
 *    await所在函数（最近的）定义的左侧
 *
 * 3、哪里写await
 *    在返回promise的表达式左侧写await：不想要promise，想要promise异步执行的成果的value数据
 */