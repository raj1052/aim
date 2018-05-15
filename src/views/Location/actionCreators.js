import { HTTP } from '../../services';
import { asyncActionNames, buildAsyncActions } from '../Common/GlobalActionCreators';
import { Alert } from 'react-native'
import * as AppActions from '../../redux/AppActions';

// creating actions name and action creators
const actionNamesLocations = asyncActionNames('LOCATIONS');
const actionCreatorsLocations = buildAsyncActions(actionNamesLocations);

export function getLocations() {
    console.log("locations called------------>");
    return function (dispatch) {
        dispatch(AppActions.showLoader());
        HTTP('get', `device/get-user-locations`)
            .then((result) => {
                console.log("result------------>", result);
                dispatch(actionCreatorsLocations.success(result.data));
                dispatch(AppActions.hideLoader());
            }).catch((error) => {
                if (error) {
                    console.log("error----->", error)
                    Alert.alert(error);
                }
                dispatch(AppActions.hideLoader());
            })
    }
}

// export function deleteData(id){
//     return function (dispatch) {
//         dispatch(AppActions.showLoader());
//         return new Promise((resolve, reject) => {
//              HTTP('delete',`other/remove-holiday/${id}`)
//                 .then((result) => {
//                     dispatch(AppActions.hideLoader());
//                     notifyAlert('success',result.data.data.message);
//                     resolve();
//                 }).catch((error) => {
//                     reject();
//                     if (error.response) {
//                         notifyAlert('error',error.response.data.message);
//                     }
//                     dispatch(AppActions.hideLoader());
//                 })
//           })
//     };
// }

export function insertLocation(values) {
    return function(dispatch){
        dispatch(AppActions.showLoader());
        return new Promise((resolve, reject) => {
            HTTP('post','device/save-device-location',values)
                .then((result) => {
                    console.log("result------------------------------->", result);
                    dispatch(AppActions.hideLoader());
                    Alert.alert("Your location is successfully inserted");
                    this.props.navigation.navigate("Device", { name: 'Jane' })
                    // else
                    //     Alert(result.data.error.message);
                    resolve(true);
                }).catch((error) => {
                    Alert(error.response.data.message);
                    reject();
                    dispatch(AppActions.hideLoader());
                })
            })
    };
};

// export function clearFormData() {
//     return function(dispatch){
//         dispatch(EditFormActionNamesActionCreators.failure());
//     }
// }