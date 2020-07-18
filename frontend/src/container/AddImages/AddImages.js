import React, {Component} from 'react';
import FormElement from "../../component/UI/Form/FormElement";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {connect} from "react-redux";
import {addImages} from "../../store/action/placeAction";

class AddImages extends Component {
    state = {
        images: [],
        reviewImages: [],
        count: 1
    };

    fileChangeHandler = (e, i) => {
        let blob = new Blob([e.target.files[0]], {type: `application/json/${e.target.files[0].type}`});
        let url = URL.createObjectURL(blob);

        let reviewImages = [...this.state.reviewImages];
        let images = [...this.state.images];

        if (this.state.images[i]) {
            images[i] = e.target.files[0];
            reviewImages[i] = url;
            this.setState({images, reviewImages});
        } else {
            reviewImages.push(url);
            images.push(e.target.files[0]);
            this.setState({images, reviewImages, count: this.state.count + 1});
        }
    };


    submitChangeHandler = () => {
        const formData = new FormData();

        Object.keys(this.state).forEach(key => {
                if (key === 'images') {
                    this.state[key].forEach(file =>
                    formData.append(key, file)
                    )
                }
            }
        );
        formData.append('placeId', this.props.placeId);
        this.props.addImages(formData, this.props.placeId);
    };

    render() {
        let arrForm = [];
        for (let i = 0; i < this.state.count; i++) {
            arrForm.push(<FormElement
                    propertyName="reviewImages"
                    value={this.state.reviewImages[i] || ''}
                    type="file"
                    onChange={(event) => this.fileChangeHandler(event, i)}
                />
            )
        }
        let disabledBtn = true;
        if (this.state.count > 1){
            disabledBtn = false
        }

        return (
            <>
                <Grid container direction="column">
                    <Grid item xs>
                        <Grid container>
                            {arrForm.map((el, i) => <Grid key={i} item xs>{el}</Grid>)}
                        </Grid>
                    </Grid>
                    <Grid item xs>
                        <Button disabled={disabledBtn} variant="contained" color="primary" onClick={() => this.submitChangeHandler()}>Add
                            photo</Button>
                    </Grid>
                </Grid>
            </>
        );
    }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
    addImages: (images, id) => dispatch(addImages(images, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddImages);