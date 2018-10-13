import {setAllAvailableHashtag, setFriendsList} from "./reduxFiles/actionCreator";

export function getFriendsList() {
    return function(dispatch, getState) {
        fetch('https://fishermen.tech/X/requestHandling.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "request": "getFriendList",
                "id": 2,
                "length": 100,
                "startFrom": 0
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                dispatch(setFriendsList(responseJson))
            })
            .catch((error) => {
                console.error(error);
        });
    }

}

export function getAllAvailableHashtag() {
    return function(dispatch, getState) {
        fetch('https://fishermen.tech/X/requestHandling.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "request": "searchAllAvailableHashtag"
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                dispatch(setAllAvailableHashtag(responseJson))
            })
            .catch((error) => {
                console.error(error);
            });
    }
}

export function signUpUser(
        username = "Hannah",
        phone = "",
        fcm_token = "000",
        apns_token = "0000",
        password = "111",
        email = "B@mail.com",
        fb_user_id = "yyy",
        google_user_id = "xxx",
        profile_pic_url = "http://128.199.183.12/x_profile_photos/User_main_6.jpg",
        type = 1,
        status_phone = "") {
    fetch('https://fishermen.tech/X/requestHandling.php', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "request": "addUser",
            "input" : {
                "username" : username,
                "phone" : phone,
                "fcm_token" : fcm_token,
                "apns_token": apns_token,
                "password" : password,
                "email" : email,
                "fb_user_id" : fb_user_id,
                "google_user_id" : google_user_id,
                "profile_pic_url" : profile_pic_url,
                "type" : type,
                "status_phone" : status_phone

            }
        }),
    }).then((response) => response.json())
        .then((responseJson) => {
            dispatch(setFriendsList(responseJson))
        })
        .catch((error) => {
            console.error(error);
        });
}