/*
 * @Author: kayinn许小强 79544105@qq.com
 * @Date: 2023-09-01 00:27:23
 * @LastEditors: kayinn许小强 79544105@qq.com
 * @LastEditTime: 2023-09-01 03:09:51
 * @FilePath: /react-cli/src/App.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { Suspense, lazy } from 'react';
import { Link, Routes, Route } from 'react-router-dom'
// import Home from './pages/Home'

// 路由懒加载
const Home = lazy(() => import(/* webpackChunkName: 'home'*/'./pages/Home'))

function App(){
    return (
        <div>
            <p>App</p>
            <Link to='/home'>Home</Link>
            <div>===========================</div>
            <Suspense fallback={<div>loading...</div>}>
                <Routes>
                    <Route path='/home' element={<Home/>}></Route>
                </Routes>
            </Suspense>
        </div>
    )
} 

export default App