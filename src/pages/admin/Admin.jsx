import React from "react"
import {Redirect} from "react-router-dom"
import opUser from "../../utils/storageAdmin"

//页面组件
import Container from "../../components/container/Container"

export default class Admin extends React.Component {
   
    render() {
        let userinfo = opUser.getUser()
        if (!userinfo._id) {
            return <Redirect to="/"/>
        }
        return <Container />
    }
    
}