import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Register from "../Register/Register";
import Login from "../Login/Login";
import {useSelector} from "react-redux";
import AddPlace from "../AddPlace/AddPlace";
import Places from "../Places/Places";
import Place from "../Place/Place";


const Routers = () => {
    const user = useSelector(state => state.users.user);

    const ProtectedRoute = ({isAllowed, ...props}) => (
        isAllowed ? <Route {...props} /> : <Redirect to='/'/>
    );

    return (
        <Switch>
            <Route path={'/register'} exact component={Register}/>
            <Route path={'/login'} exact component={Login}/>
            <Route path={'/'} exact component={Places}/>
            <Route path={'/place/:id'} exact component={Place}/>
            <ProtectedRoute isAllowed={user} path={'/add_place'} exact component={AddPlace}/>
        </Switch>
    );
};

export default Routers;