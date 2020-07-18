import {
    ADD_IMAGES_SUCCESS,
    ADD_PLACE_ERROR,
    ADD_PLACE_REQUEST,
    ADD_PLACE_SUCCESS, GET_PLACE_ID_ERROR, GET_PLACE_ID_REQUEST, GET_PLACE_ID_SUCCESS, GET_PLACES_ERROR,
    GET_PLACES_REQUEST,
    GET_PLACES_SUCCESS, REMOVE_PLACE_ERROR, REMOVE_PLACE_REQUEST, REMOVE_PLACE_SUCCESS
} from "../action/placeAction";

const initialState = {
    places: [],
    place: {},
    loadPlaces : false,
    errorPlaces: null,
    loadPlace: false,
    errorPlace: null,
    error: null,
    load: false,
    removeError : null,
    removeLoad: false
};

const placeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE_SUCCESS:
            return {...state, error: null, load: false};
        case ADD_PLACE_REQUEST:
            return {...state, load: true};
        case ADD_PLACE_ERROR:
            return {...state, load: false, error: action.error};
        case GET_PLACES_SUCCESS:
            return {...state, places: action.places, loadPlaces: false, errorPlaces: null};
        case GET_PLACES_REQUEST:
            return {...state, loadPlaces: true};
        case GET_PLACES_ERROR:
            return {...state, loadPlaces: false, errorPlaces: action.error};
        case GET_PLACE_ID_SUCCESS:
            return {...state, place: action.place, errorPlace: null, loadPlace: false};
        case GET_PLACE_ID_REQUEST:
            return {...state, loadPlace: true};
        case GET_PLACE_ID_ERROR:
            return {...state, errorPlace: action.error, loadPlace: false};
        case ADD_IMAGES_SUCCESS:
            return {...state, place: action.place};
        case REMOVE_PLACE_SUCCESS:
            return {...state, removeError: null, removeLoad: false};
        case REMOVE_PLACE_REQUEST:
            return {...state, removeLoad: true};
        case REMOVE_PLACE_ERROR:
            return {...state, removeError: action.error, removeLoad: false};
        default:
            return state
    }
};

export default placeReducer