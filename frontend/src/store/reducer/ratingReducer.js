import {GET_PLACE_RATING_SUCCESS} from "../action/ratingAction";

const initialState = {
    placeRating: []
};

const ratingReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PLACE_RATING_SUCCESS:
            return {...state, placeRating: action.placeRating};
        default:
            return state
    }
};

export default ratingReducer;