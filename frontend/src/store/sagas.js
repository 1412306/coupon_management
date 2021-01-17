import register from './actions/admin/register';
import login from './actions/admin/login';
import coupon from './actions/admin/coupon';
import { all } from 'redux-saga/effects';

export default function* watcherSaga() {
  yield all([
    ...register,
    ...login,
    ...coupon
  ])
}