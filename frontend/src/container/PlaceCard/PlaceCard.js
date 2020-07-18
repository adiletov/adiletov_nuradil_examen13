import React from 'react';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import {apiURL} from "../../apiURL";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {removePlace} from "../../store/action/placeAction";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        display: 'block'
    },
    media: {
        height: 140,
    },
});

const PlaceCard = ({place, user}) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <>
            <Card className={classes.root} >
                <CardActionArea component={NavLink} to={'/place/' + place._id} id="card">
                    <CardMedia
                        className={classes.media}
                        image={apiURL + '/uploads/' + place.mainPicture}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {place.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {place.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                {user && user.role === 'admin' &&
                <CardActions>
                    <Button onClick={() => dispatch(removePlace(place._id))} size="small" color="primary">
                        Delete
                    </Button>
                </CardActions>
                }
            </Card>
        </>
    );
};

export default PlaceCard;