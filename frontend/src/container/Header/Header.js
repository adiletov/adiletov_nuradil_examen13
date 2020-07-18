import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AnonymMenu from "../../component/UI/AnonymMenu/AnonymMenu";
import {NavLink} from "react-router-dom";
import UserMenu from "../../component/UI/UserMenu/UserMenu";
import {useDispatch} from "react-redux";
import {logoutUser} from "../../store/action/userAction";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        color: '#fff',
        textDecoration: 'none',
    },
}));

const Header = ({user}) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography className={classes.title} component={NavLink} to={'/'}>
                    Cafe Critic
                </Typography>
                {
                    user ? <UserMenu user={user} logout={() => dispatch(logoutUser())}/> : <AnonymMenu/>
                }
            </Toolbar>
        </AppBar>
    );
};

export default Header;