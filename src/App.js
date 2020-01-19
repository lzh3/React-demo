import React from 'react';
import './App.css';
import {Switch, Route, Redirect} from "react-router-dom"


import Login from "./pages/login/Login"
import Admin from "./pages/admin/Admin"

export default class App extends React.Component {
    render() {
        
        return (
            <div className="App">
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/admin" component={Admin}/>
                    
                    <Redirect to="/login" />
                </Switch>
            </div>
        );
    }
}

