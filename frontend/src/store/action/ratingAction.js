import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";

export const ADD_PLACE_SUCCESS = 'ADD_PLACE_SUCCESS';
export const GET_PLACE_RATING_SUCCESS = 'GET_RECIPE_RATING_SUCCESS';

export const getRecipeRatingSuccess = placeRating => ({type: GET_PLACE_RATING_SUCCESS, placeRating});

export const addRating = ratingData => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization' : 'Token ' + token}};
        try{
            const res = await axiosApi.post('/ratings', ratingData, config);
            toast.success(res.data.message);
            dispatch(getRatingId(ratingData.placeId))
        }catch (e) {

        }
    }
};


export const getRatingId = id => {
    return async (dispatch) => {
        try{
            const res = await axiosApi.get('/ratings/' + id);
            dispatch(getRecipeRatingSuccess(res.data));
        }catch (e) {
            console.log(e)
        }
    }
};

export const removeRating = (id, placeId) => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization' : 'Token ' + token}};
        try{
            const res = await axiosApi.delete('/ratings/remove/' + id, config);
            toast.success(res.data.message);
            dispatch(getRatingId(placeId))
        }catch (e) {
            console.log(e)
        }
    }
};