import {createBrowserHistory} from "history";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {connectRouter, routerMiddleware} from "connected-react-router";
import thunk from "redux-thunk";
import {loadFromLocalStorage, saveToLocalStorage} from "./localStorage";
import userReducer from "./reducer/userReducer";
import placeReducer from "./reducer/placeReducer";
import ratingReducer from "./reducer/ratingReducer";


export const history = createBrowserHistory();

const rootReducer = combineReducers({
    router: connectRouter(history),
    users: userReducer,
    places : placeReducer,
    ratings: ratingReducer
});

const middleware = [
    thunk,
    routerMiddleware(history),
];
const persistedState = loadFromLocalStorage();


const store = createStore(rootReducer, persistedState, applyMiddleware(...middleware));
store.subscribe(() => {
    saveToLocalStorage({
        users: {
            user: store.getState().users.user
        }
    });
});
export default store;
