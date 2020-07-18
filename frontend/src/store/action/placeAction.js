import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";
import {push} from "connected-react-router";

export const ADD_PLACE_SUCCESS = 'ADD_PLACE_SUCCESS';
export const ADD_PLACE_REQUEST = 'ADD_PLACE_REQUEST';
export const ADD_PLACE_ERROR = 'ADD_PLACE_ERROR';

export const GET_PLACES_SUCCESS = 'GET_PLACES_SUCCESS';
export const GET_PLACES_REQUEST = 'GET_PLACES_REQUEST';
export const GET_PLACES_ERROR = 'GET_PLACES_ERROR';

export const GET_PLACE_ID_SUCCESS = 'GET_PLACE_ID_SUCCESS';
export const GET_PLACE_ID_REQUEST = 'GET_PLACE_ID_REQUEST';
export const GET_PLACE_ID_ERROR = 'GET_PLACE_ID_ERROR';

export const ADD_IMAGES_SUCCESS = 'ADD_IMAGES_SUCCESS';
export const ADD_IMAGES_REQUEST = 'ADD_IMAGES_REQUEST';
export const ADD_IMAGES_ERROR = 'ADD_IMAGES_ERROR';

export const REMOVE_PLACE_SUCCESS = 'REMOVE_PLACE_SUCCESS';
export const REMOVE_PLACE_REQUEST = 'REMOVE_PLACE_REQUEST';
export const REMOVE_PLACE_ERROR = 'REMOVE_PLACE_ERROR';

export const addPlaceSuccess = () => ({type: ADD_PLACE_SUCCESS});
export const addPlaceRequest = () => ({type: ADD_PLACE_REQUEST});
export const addPlaceError = error => ({type: ADD_PLACE_ERROR, error});

export const getPlacesSuccess = places => ({type: GET_PLACES_SUCCESS, places});
export const getPlacesRequest = () => ({type: GET_PLACES_REQUEST});
export const getPlacesError = error => ({type: GET_PLACES_ERROR, error});

export const getPlaceIdSuccess = place => ({type: GET_PLACE_ID_SUCCESS, place});
export const getPlaceIdRequest = () => ({type: GET_PLACE_ID_REQUEST});
export const getPlaceIdError = error => ({type: GET_PLACE_ID_ERROR, error});

export const addImagesSuccess = place => ({type: ADD_IMAGES_SUCCESS, place});
export const addImagesRequest = () => ({type: ADD_IMAGES_REQUEST});
export const addImagesError = () => ({type: ADD_IMAGES_ERROR});

export const removePlaceSuccess = () => ({type: REMOVE_PLACE_SUCCESS});
export const removePlaceRequest = () => ({type: REMOVE_PLACE_REQUEST});
export const removePlaceError = error => ({type: REMOVE_PLACE_ERROR});

export const addPlace = placeData => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization' : 'Token ' + token}};
        try{
            dispatch(addPlaceRequest());
            const res = await axiosApi.post('/places', placeData, config);
            toast.success(res.data.message);
            dispatch(addPlaceSuccess());
            dispatch(push('/'))
        }catch (e) {
            dispatch(addPlaceRequest());
            if (e.response && e.response.data){
                dispatch(addPlaceError(e.response.data))
            }else{
                dispatch(addPlaceError({global: 'Server error!!!'}))
            }
        }
    }
};

export const getPlaces = () => {
    return async (dispatch) => {
        try{
            dispatch(getPlacesRequest());
            const res = await axiosApi.get('/places');
            dispatch(getPlacesSuccess(res.data))
        }catch (e) {
            dispatch(getPlacesRequest());
            if (e.response && e.response.data){
                dispatch(getPlacesError(e.response.data))
            }else{
                dispatch(getPlacesError({global: 'Server error!!!'}))
            }
        }
    }
};

export const getPlaceId = id => {
    return async (dispatch) => {
        try{
            dispatch(getPlaceIdRequest());
            const res = await axiosApi.get('/places/' + id);
            dispatch(getPlaceIdSuccess(res.data))
        }catch (e) {
            dispatch(getPlaceIdRequest());
            if (e.response && e.response.data){
                dispatch(getPlaceIdError(e.response.data))
            }else{
                dispatch(getPlaceIdError({global: 'Server error!!!'}))
            }
        }
    }
};

export const addImages = (images,id) => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization' : 'Token ' + token}};
        try{
            dispatch(addImagesRequest());
            const res = await axiosApi.post('/places/images', images, config);
            toast.success(res.data.message);
            dispatch(addImagesSuccess(res.data.place));
            dispatch(getPlaceId(id))
        }catch (e) {
            console.log(e)
        }
    }
};


export const removePlace = id => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization' : 'Token ' + token}};
        try{
            dispatch(removePlaceRequest());
            const res = await axiosApi.delete('/places/' + id, config);
            dispatch(removePlaceSuccess());
            dispatch(getPlaces());
            toast.success(res.data.message)
        }catch (e) {
            dispatch(removePlaceRequest());
            if (e.response && e.response.data){
                dispatch(removePlaceError(e.response.data))
            }else{
                dispatch(removePlaceError({global: 'Server error!!!'}))
            }
        }
    }
};

export const removeImage = (id, name) => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization' : 'Token ' + token}};
        try{
            const res = await axiosApi.post(`/places/images/${id}`, name, config);
            toast.success(res.data.message);
            dispatch(getPlaceId(id))
        }catch (e) {
            console.log(e)
        }
    }
};


