import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import RatingCard from "../../component/UI/RatingCard/RatingCard";
import {useDispatch} from "react-redux";
import {removeRating} from "../../store/action/ratingAction";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        marginBottom: '5px'
    },
    title: {
        fontSize: 14,
    },
    comment: {
        border: '1px solid #ccc',
        padding: '7px'
    }
});

const RatingRecipe = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <>
            <Grid container direction="column">
                <Grid item xs>
                    <RatingCard name="Quality To Food" value={props.rating.qualityToFood} bool={true}/>
                    <RatingCard name="Service Quality" value={props.rating.serviceQuality} bool={true}/>
                    <RatingCard name="Interior" value={props.rating.interior} bool={true}/>
                </Grid>
                {
                    props.rating && props.rating.comments && props.rating.comments.map((comment, i) =>
                        comment.comment.length > 1 &&
                        <Grid item xs key={i}>
                            <Card className={classes.root}>
                                <CardContent>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        On : {comment.datetime}
                                    </Typography>
                                    <Typography variant="h5">
                                        {comment.fullName} said :
                                    </Typography>
                                    <Typography variant="body2" className={classes.comment} component="p">
                                        {comment.comment}
                                    </Typography>
                                    <RatingCard name="Quality To Food" value={comment.qualityToFood} bool={true}/>
                                    <RatingCard name="Service Quality" value={comment.serviceQuality} bool={true}/>
                                    <RatingCard name="Interior" value={comment.interior} bool={true}/>
                                </CardContent>
                                {
                                    props.user && props.user.role === 'admin' &&
                                    <CardActions>
                                        <Button size="small" onClick={() => dispatch(removeRating(comment.id, props.id))}>DELETE</Button>
                                    </CardActions>
                                }

                            </Card>
                        </Grid>
                    )
                }
            </Grid>
        </>
    );
};

export default RatingRecipe;