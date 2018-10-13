import {SET_ALL_AVAILABLE_HASHTAG, SET_FRIENDS_LIST} from "./actionCreator";

const initialState = {
    friendsList: {},
    allAvailableHashtag: {}
}

export default function rootReducer(state = initialState, action) {
    switch(action.type) {
        case SET_FRIENDS_LIST:
            return {
                ...state,
                friendsList: action.payload
            };
        case SET_ALL_AVAILABLE_HASHTAG:
            return {
                ...state,
                allAvailableHashtag: action.payload
            };
        default :
            return {
                ...state
            };
    }
}