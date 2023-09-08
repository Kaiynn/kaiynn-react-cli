/*
 * @Author: kayinn许小强 79544105@qq.com
 * @Date: 2023-09-01 00:25:17
 * @LastEditors: kayinn许小强 79544105@qq.com
 * @LastEditTime: 2023-09-01 02:58:39
 * @FilePath: /react-cli/src/main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<BrowserRouter><App /></BrowserRouter>);