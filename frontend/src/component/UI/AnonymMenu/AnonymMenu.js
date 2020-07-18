import React from 'react';
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";

const AnonymMenu = () => {
    return (
        <>
            <Button color="inherit" component={NavLink} to={'/register'}>Register</Button>
            <Button color="inherit" component={NavLink} to={'/login'}>Login</Button>
        </>
    );
};

export default AnonymMenu;