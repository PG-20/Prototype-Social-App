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



// export function signUpUser(obj) {
//     fetch('https://fishermen.tech/X/requestHandling.php', {
//         method: 'POST',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             "request": "addUser",
//             "input" : {
//                 "username" : obj.username,
//                 "phone" : obj.phone,
//                 "fcm_token" : obj.fcm_token,
//                 "apns_token": obj.apns_token,
//                 "password" : obj.password,
//                 "email" : obj.email,
//                 "fb_user_id" : obj.fb_user_id,
//                 "google_user_id" : obj.google_user_id,
//                 "profile_pic_url" : obj.profile_pic_url,
//                 "type" : obj.type,
//                 "status_phone" : obj.status_phone
//
//             }
//         }),
//     }).then((response) => response.json())
//         .then((responseJson) => {
//             dispatch(setFriendsList(responseJson))
//         })
//         .catch((error) => {
//             console.error(error);
//         });
// }