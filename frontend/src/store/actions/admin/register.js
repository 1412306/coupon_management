import RegisterModel from '../../../model/register';
import {call, put, takeLatest} from 'redux-saga/effects';

export const USER_REGISTER = 'USER_REGISTER';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAILURE = 'USER_REGISTER_FAILURE';

export default [
    watchUserRegister()
]

function* watchUserRegister() {
    yield takeLatest(USER_REGISTER, fetchUserRegister);
}

function* fetchUserRegister(action) {
    try {
        const response = yield call(RegisterModel.register, action.data);
        if (response.data) {
            const data = response.data;
            if(data.user){
                yield put({type: USER_REGISTER_SUCCESS, data})
            }else {
                yield put({type: USER_REGISTER_FAILURE, data})
            }
        }
    } catch (error) {
        console.log(error)
        yield put({type: USER_REGISTER_FAILURE})
    }
}