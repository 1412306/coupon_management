import LoginModel from '../../../model/login';
import {call, put, takeLatest} from 'redux-saga/effects';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

export default [
    watchUserLogin()
]

function* watchUserLogin() {
    yield takeLatest(USER_LOGIN, fetchUserLogin);
}

function* fetchUserLogin(action) {
    try {
        const response = yield call(LoginModel.login, action.data);
        if (response.data) {
            const data = response.data;
            if(data.accessToken){
                yield put({type: USER_LOGIN_SUCCESS, data})
            }else {
                yield put({type: USER_LOGIN_FAILURE, data})
            }
        }
    } catch (error) {
        console.log(error)
        yield put({type: USER_LOGIN_FAILURE})
    }
}