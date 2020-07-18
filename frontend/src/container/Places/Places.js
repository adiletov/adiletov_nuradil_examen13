import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getPlaces} from "../../store/action/placeAction";
import Grid from "@material-ui/core/Grid";
import PlaceCard from "../PlaceCard/PlaceCard";

const Places = () => {
    const dispatch = useDispatch();
    const places = useSelector(state => state.places.places);
    const user = useSelector(state => state.users.user);

    useEffect(() => {
        dispatch(getPlaces())
    }, [dispatch]);

    return (
        <Grid container wrap="wrap">
            {
                places && places.map(place =>
                    <Grid item xs={4} key={place._id} style={{marginBottom: '10px'}}>
                    <PlaceCard place={place} user={user}/>
                </Grid>)
            }
        </Grid>
    );
};

export default Places;