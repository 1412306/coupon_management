import CouponModel from '../../../model/coupon';
import {call, put, takeLatest} from 'redux-saga/effects';

export const CREATE_COUPON = 'CREATE_COUPON';
export const CREATE_COUPON_SUCCESS = 'CREATE_COUPON_SUCCESS';
export const CREATE_COUPON_FAILURE = 'CREATE_COUPON_FAILURE';

export const LIST_COUPON = 'LIST_COUPON';
export const LIST_COUPON_SUCCESS = 'LIST_COUPON_SUCCESS';
export const LIST_COUPON_FAILURE = 'LIST_COUPON_FAILURE';

export const APPLY_COUPON = 'APPLY_COUPON';
export const APPLY_COUPON_SUCCESS = 'APPLY_COUPON_SUCCESS';
export const APPLY_COUPON_FAILURE = 'APPLY_COUPON_FAILURE';

export const EXTEND_COUPON = 'EXTEND_COUPON';
export const EXTEND_COUPON_SUCCESS = 'EXTEND_COUPON_SUCCESS';
export const EXTEND_COUPON_FAILURE = 'EXTEND_COUPON_FAILURE';

export const SUMMARY_COUPON = 'SUMMARY_COUPON';
export const SUMMARY_COUPON_SUCCESS = 'SUMMARY_COUPON_SUCCESS';
export const SUMMARY_COUPON_FAILURE = 'SUMMARY_COUPON_FAILURE';


export default [
    watchCouponCreate(), watchCouponList(), watchCouponApply(), watchCouponExtend(), watchCouponSummary()
]

function* watchCouponCreate() {
    yield takeLatest(CREATE_COUPON, fetchCouponCreate);
}

function* fetchCouponCreate(action) {
    try {
        const response = yield call(CouponModel.create);
        if (response.data) {
            const data = response.data;
            if(data.coupon){
                yield put({type: CREATE_COUPON_SUCCESS, data})
            }else {
                yield put({type: CREATE_COUPON_FAILURE, data})
            }
        }
    } catch (error) {
        yield put({type: CREATE_COUPON_FAILURE})
    }
}

function* watchCouponList() {
    yield takeLatest(LIST_COUPON, fetchListCoupon);
}

function* fetchListCoupon(action) {
    try {
        const response = yield call(CouponModel.list, action.code);
        if (response.data) {
            const data = response.data;
            if(data.coupon){
                yield put({type: LIST_COUPON_SUCCESS, data})
            }else {
                yield put({type: LIST_COUPON_FAILURE, data})
            }
        }
    } catch (error) {
        yield put({type: LIST_COUPON_FAILURE})
    }
}

function* watchCouponApply() {
    yield takeLatest(APPLY_COUPON, fetchApplyCoupon);
}

function* fetchApplyCoupon(action) {
    try {
        const response = yield call(CouponModel.apply, action.code);
        if (response.data) {
            const data = response.data;
            if(data.coupon){
                yield put({type: APPLY_COUPON_SUCCESS, data})
            }else {
                yield put({type: APPLY_COUPON_FAILURE, data})
            }
        }
    } catch (error) {
        yield put({type: APPLY_COUPON_FAILURE})
    }
}

function* watchCouponExtend() {
    yield takeLatest(EXTEND_COUPON, fetchExtendCoupon);
}

function* fetchExtendCoupon(action) {
    try {
        const response = yield call(CouponModel.extend, action.data);
        if (response.data) {
            const data = response.data;
            if(data.coupon){
                yield put({type: EXTEND_COUPON_SUCCESS, data})
            }else {
                yield put({type: EXTEND_COUPON_FAILURE, data})
            }
        }
    } catch (error) {
        yield put({type: EXTEND_COUPON_FAILURE})
    }
}

function* watchCouponSummary() {
    yield takeLatest(SUMMARY_COUPON, fetchSummaryCoupon);
}

function* fetchSummaryCoupon(action) {
    try {
        const response = yield call(CouponModel.summary);
        if (response.data) {
            const data = response.data;
            if(data.used && data.ready && data.expired){
                yield put({type: SUMMARY_COUPON_SUCCESS, data})
            }else {
                yield put({type: SUMMARY_COUPON_FAILURE, data})
            }
        }
    } catch (error) {
        yield put({type: SUMMARY_COUPON_FAILURE})
    }
}