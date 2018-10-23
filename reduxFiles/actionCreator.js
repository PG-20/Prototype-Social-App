export const SET_FRIENDS_LIST = "SET_FRIENDS_LIST";
export const SET_ALL_AVAILABLE_HASHTAG = "SET_ALL_AVAILABLE_HASHTAG";
export const SET_USER_DETAILS = "SET_USER_DETAILS";

export function setFriendsList(data) {
    return {type: SET_FRIENDS_LIST, payload: data}
}

export function setAllAvailableHashtag(data) {
    return {type: SET_ALL_AVAILABLE_HASHTAG, payload: data}
}

export function setUserDetails(data) {
    return {type: SET_USER_DETAILS, payload: data}
}