import React from 'react';
import {Route, Switch} from "react-router-dom";
import Register from "../Register/Register";
import Login from "../Login/Login";


const Routers = () => {
    return (
        <Switch>
            <Route path={'/register'} exact component={Register}/>
            <Route path={'/login'} exact component={Login}/>
        </Switch>
    );
};

export default Routers;