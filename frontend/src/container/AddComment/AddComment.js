import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import FormElement from "../../component/UI/Form/FormElement";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {connect} from "react-redux";
import {addRating} from "../../store/action/ratingAction";

class AddComment extends Component {
    state = {
        comment: '',
        qualityToFood: 0,
        serviceQuality: 0,
        interior: 0
    };

    inputChangeHandler = e => {
        let value = e.target.value;
        if (e.target.name !== 'comment'){
            value = parseInt(e.target.value)
        }
        this.setState({[e.target.name]: value})
    };
    submitChangeHandler = e => {
        e.preventDefault();

        const newObj = {};
        Object.keys(this.state).map(key =>
            newObj[key] = this.state[key]
        );
        newObj.placeId = this.props.placeId;
        this.props.addRating(newObj);
    };
    disabledButton = () => {
        if (this.state.serviceQuality >= 1){
            return false
        }else if ( this.state.qualityToFood >= 1){
            return false
        }else if(this.state.interior >= 1){
            return false
        }else if (this.state.comment.length){
            return false
        }else{
            return true
        }
    };

    render() {
        return (
            <>
                <Grid container direction="column" spacing={2} style={{border: '1px solid #ccc', padding: '10px'}}>
                    <form onSubmit={this.submitChangeHandler}>
                        <Grid item xs>
                            <FormElement
                                propertyName="comment"
                                value={this.state.comment}
                                onChange={this.inputChangeHandler}
                                label="Comment"
                            />
                        </Grid>
                        <Grid item xs>
                            <Typography component="legend">Quality to food</Typography>
                            <FormElement
                                value={this.state.qualityToFood}
                                propertyName="qualityToFood"
                                onChange={this.inputChangeHandler}
                            />
                        </Grid>
                        <Grid item xs>
                            <Typography component="legend">Service quality</Typography>
                            <FormElement
                                value={this.state.serviceQuality}
                                propertyName="serviceQuality"
                                onChange={this.inputChangeHandler}
                            />
                        </Grid>
                        <Grid item xs>
                            <Typography component="legend">Interior</Typography>
                            <FormElement
                                value={this.state.interior}
                                propertyName="interior"
                                onChange={this.inputChangeHandler}
                            />
                        </Grid>
                        <Grid item xs>
                            <Button type="submit" color="primary" variant="contained" disabled={this.disabledButton()}>Add comment</Button>
                        </Grid>
                    </form>
                </Grid>
            </>
        );
    }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    addRating: (ratingData) => dispatch(addRating(ratingData))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddComment);