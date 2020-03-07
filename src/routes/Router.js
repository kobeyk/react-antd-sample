import React, { Component } from './node_modules/react'
import { HashRouter, Route, Switch } from './node_modules/react-router-dom'
import Home from '../components/home/Home'
import Login from '../components/login/Login'

export default class Router extends Component {
    render() {
        return (
            <div>
                <HashRouter>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/login" component={Login}/>
                    </Switch>
                </HashRouter>
            </div>
        )
    }
}