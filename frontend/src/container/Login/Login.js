import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import FormElement from "../../component/UI/Form/FormElement";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {loginUser} from "../../store/action/userAction";
import Alert from "@material-ui/lab/Alert";


class Login extends Component {
    state = {
        username: '',
        password: ''
    };

    inputChangeHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    };
    submitChangeHandler = e => {
        e.preventDefault();
        this.props.loginUser({...this.state})
    };

    render() {
        return (
            <Grid container justify="center" alignItems="center" style={{height: '100vh'}}>
                <Grid item xs={3}>
                    <Grid container direction="column">
                        <form onSubmit={this.submitChangeHandler}>
                            {
                                this.props.error && <Grid item xs>
                                    <Alert severity="error">{this.props.error}</Alert>
                                </Grid>
                            }
                            <Grid item xs>
                                <FormElement
                                    propertyName="username"
                                    value={this.state.username}
                                    onChange={this.inputChangeHandler}
                                    label="Username"
                                    autocomplete="new-username"
                                />
                            </Grid>
                            <Grid item xs>
                                <FormElement
                                    propertyName="password"
                                    type="password"
                                    value={this.state.password}
                                    label="Password"
                                    autocomplete="new-password"
                                    onChange={this.inputChangeHandler}
                                />
                            </Grid>
                            <Grid item xs>
                                <Button variant="contained" id="login" color="primary" type="submit" fullWidth>Login</Button>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    error: state.users.loginError
});
const mapDispatchToProps = dispatch => ({
    loginUser: (userData) => dispatch(loginUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);