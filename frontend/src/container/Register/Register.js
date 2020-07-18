import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import FormElement from "../../component/UI/Form/FormElement";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {registerUser} from "../../store/action/userAction";


class Register extends Component {
    state = {
        username: '',
        password: '',
        fullName: ''
    };

    inputChangeHandler = e => {
        this.setState({[e.target.name] : e.target.value})
    };
    submitChangeHandler = e => {
        e.preventDefault();
        this.props.registerUser({...this.state})
    };
    errorHandler = fieldName => {
        return this.props.error &&
            this.props.error.errors &&
            this.props.error.errors[fieldName] &&
            this.props.error.errors[fieldName].properties &&
            this.props.error.errors[fieldName].properties.message
    };

    render() {
        return (
            <>
                <Grid container justify="center" alignItems="center" style={{height: '100vh'}}>
                    <Grid item xs={3}>
                        <Grid container direction="column">
                            <form onSubmit={this.submitChangeHandler}>
                                <Grid item xs>
                                    <FormElement
                                        propertyName="username"
                                        value={this.state.username}
                                        onChange={this.inputChangeHandler}
                                        label="Username"
                                        autocomplete="new-username"
                                        error={this.errorHandler('username')}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <FormElement
                                        type="password"
                                        propertyName="password"
                                        value={this.state.password}
                                        onChange={this.inputChangeHandler}
                                        label="Password"
                                        autocomplete="new-password"
                                        error={this.errorHandler('password')}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <FormElement
                                        propertyName="fullName"
                                        value={this.state.fullName}
                                        onChange={this.inputChangeHandler}
                                        label="Full Name"
                                        autocomplete="new-fullName"
                                        error={this.errorHandler('fullName')}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <Button variant="contained"
                                            color="primary" type="submit"
                                            fullWidth
                                            id="register"
                                    >Register</Button>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                </Grid>
            </>
        );
    }
}

const mapStateToProps = state => ({
    user : state.users.user,
    error: state.users.registerError
});
const mapDispatchToProps = dispatch =>({
    registerUser: (userData) => dispatch(registerUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);