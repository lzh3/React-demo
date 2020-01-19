import React from "react"
import { Layout } from 'antd';
import "./container.css"
import LeftNav from "./leftnav/leftNav"
import {Route,Switch,Redirect} from "react-router-dom"
//admin页面的路由组件
import Home from "../../pages/home/Home"
import Kinds from "../../pages/kinds/Kinds"
import Product from "../../pages/product/Product"
import User from "../../pages/user/User"
import Role from "../../pages/role/Role"
import BarChart from "../../pages/barchart/BarChart"
import LineChart from "../../pages/linechart/LineChart"
import PieChart from "../../pages/piechart/PieChart"

import Header from "../header/Header"
const { Footer, Sider, Content } = Layout;

export default class Container extends React.Component {
    render() {
        return (
            <div className="container">
                <Layout>
                    <Sider>
                        <LeftNav/>
                    </Sider>
                    <Layout>
                        <Header />
                        <Content style={{margin:15,background:"#fff"}}>
                            <Switch>
                                <Route path="/admin/home" component={Home} />
                                <Route path="/admin/kinds" component={Kinds} />
                                <Route path="/admin/product" component={Product} />
                                <Route path="/admin/user" component={User} />
                                <Route path="/admin/role" component={Role} />
                                <Route path="/admin/barchart" component={BarChart} />
                                <Route path="/admin/linechart" component={LineChart} />
                                <Route path="/admin/piechart" component={PieChart} />

                                <Redirect to="/admin/home" />
                            </Switch>
                        </Content>
                        <Footer>Footer</Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
}