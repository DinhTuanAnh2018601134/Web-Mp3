import { combineReducers } from "redux";
import playlistReducer from "./playlist";
import userReducer from "./user";

const rootReducer = combineReducers({
    playlist: playlistReducer,
    user: userReducer
})

export default rootReducer;