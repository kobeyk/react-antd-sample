import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker';
import './index.css';
import memoryUtils from './utils/memoryUtils';
import storageUtils from './utils/storageUtils';
import App from './App';

// 加载local的user到内存中，内存快啊
memoryUtils.user = storageUtils.getUser()

ReactDOM.render(<App />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
