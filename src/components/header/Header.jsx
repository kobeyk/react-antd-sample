import React, { Component } from 'react';
import './Header.less'
export default class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎，admin</span>
                    <a href="javascript:">退出</a>
                </div>
               <div className="header-bottom">
                    <div className="header-bottom-left">首页</div>
                    <div className="header-bottom-right">
                        <span>2019-12-25 10:36:12</span>
                        <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4246965422,575281867&fm=26&gp=0.jpg" alt="wheater"/>
                        <span>晴</span>
                    </div>
               </div>
            </div>
        );
    }
}
