import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getPlaceId, removeImage} from "../../store/action/placeAction";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import {apiURL} from "../../apiURL";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AddComment from "../AddComment/AddComment";
import {getRatingId} from "../../store/action/ratingAction";
import RatingPlace from "../RatingPlace/RatingPlace";
import AddImages from "../AddImages/AddImages";
import {Button} from "@material-ui/core";

const useStyles = makeStyles({
    image: {
        width: '100%',
        height: '200px'
    }
});

const Place = props => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const placeData = useSelector(state => state.places.place);
    const user = useSelector(state => state.users.user);
    const ratingPlace = useSelector(state => state.ratings.placeRating);

    useEffect(() => {
        dispatch(getPlaceId(props.match.params.id));
        dispatch(getRatingId(props.match.params.id))
    }, [dispatch, props.match.params.id]);

    return (
        <div>
            {placeData && placeData.mainPicture &&
            <Grid container direction="column" spacing={2}>

                <Grid item xs>
                    <Grid container>
                        <Grid item xs>
                            <Grid container direction="column">
                                <Grid item xs>
                                    <Typography variant="h4">{placeData.title}</Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography>{placeData.description}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={3}>
                            <Avatar className={classes.image} src={apiURL + '/uploads/' + placeData.mainPicture}
                                    variant="square"/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs>
                    <Divider/>
                </Grid>
                <Grid item xs>
                    <Grid container>
                        {placeData.images && placeData.images.map((image, i) =>
                            <Grid item xs={1} key={i}><Avatar
                                style={{width: '100px', height: '100px'}}
                                variant="square" src={apiURL + '/uploads/' + image}
                            />
                                {user && user.role === 'admin' && <Button
                                    onClick={() => dispatch(removeImage(placeData._id, {name :image}))}>X</Button>}
                            </Grid>)}
                    </Grid>
                </Grid>
                {user && user._id !== placeData.userId._id && <Grid item xs>
                    <AddComment placeId={placeData._id}/>
                </Grid>}
                {
                    ratingPlace && <Grid item xs>
                        <RatingPlace rating={ratingPlace} id={placeData._id} user={user}/>
                    </Grid>
                }

                <Grid item xs>
                    <Divider/>
                </Grid>
                {user && user._id === placeData.userId._id && <Grid item xs>
                    <AddImages placeId={placeData._id}/>
                </Grid>}

            </Grid>
            }
        </div>
    );
};

export default Place;