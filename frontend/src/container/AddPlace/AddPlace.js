import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import FormElement from "../../component/UI/Form/FormElement";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {addPlace} from "../../store/action/placeAction";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";

class AddPlace extends Component {
    state = {
        title: '',
        description: '',
        mainPicture: '',
        reviewImage: '',
        checkbox: false
    };

    inputChangeHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    fileChangeHandler = e => {
        let blob = new Blob([e.target.files[0]], {type: `application/json/${e.target.files[0].type}`});
        let url = URL.createObjectURL(blob);

        this.setState({[e.target.name]: e.target.files[0], reviewImage: url})
    };

    checkboxChangeHandler = e => {
        this.setState({checkbox: e.target.checked})
    };

    submitChangeHandler = e => {
        e.preventDefault();
        const formData = new FormData();

        Object.keys(this.state).filter(el => el !== 'reviewImage')
            .map(key => formData.append(key, this.state[key]));

        this.props.addPlace(formData);
    };

    errorHandler = fieldName => {
        return this.props.error &&
            this.props.error.errors &&
            this.props.error.errors[fieldName] &&
            this.props.error.errors[fieldName].properties &&
            this.props.error.errors[fieldName].properties.message
    };


    render() {
        let disabledButton = true;
        if (this.state.checkbox){
            disabledButton = false
        }
        return (
            <Grid container justify="center">
                <Grid item xs>
                    <Grid container direction="column">
                        <form onSubmit={this.submitChangeHandler}>
                            {
                                this.props.error && this.props.error.global &&
                                <Alert severity="error">{this.props.error.global}</Alert>
                            }
                            <Grid item xs>
                                <FormElement
                                    value={this.state.title}
                                    propertyName="title"
                                    label="Title"
                                    onChange={this.inputChangeHandler}
                                    autocomplete="new-title"
                                    error={this.errorHandler('title')}
                                />
                            </Grid>
                            <Grid item xs>
                                <FormElement
                                    type="textarea"
                                    value={this.state.description}
                                    propertyName="description"
                                    label="Description"
                                    onChange={this.inputChangeHandler}
                                    autocomplete="new-description"
                                    multiline={true}
                                    error={this.errorHandler('description')}
                                    rows={4}
                                />
                            </Grid>
                            {
                                this.props.error && this.props.error.error &&
                                <Alert severity="error">{this.props.error.error}</Alert>
                            }
                            <Grid item xs>
                                <FormElement
                                    type='file'
                                    propertyName="mainPicture"
                                    value={this.state.reviewImage}
                                    onChange={this.fileChangeHandler}
                                />
                            </Grid>
                            <Grid item xs>
                                <Typography>При посещении и использовании данного сайта,
                                    Вы согласны соблюдать следующие условия</Typography>
                                <Checkbox
                                    checked={this.state.checkbox}
                                    onChange={this.checkboxChangeHandler}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                            </Grid>
                            <Grid item xs>
                                <Button variant="contained" disabled={disabledButton}  fullWidth color="primary" type="submit">Add</Button>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    error: state.places.error
});

const mapDispatchToProps = dispatch => ({
    addPlace: (placeData) => dispatch(addPlace(placeData))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPlace);