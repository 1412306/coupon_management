import * as actionTypes from '../../actions/admin/coupon';
import {act} from "@testing-library/react";

const initialState = {
    extending: false,
    fetching: false,
    coupon: null,
    error: null,
    message: null,
    coupons: [],
    applying: false,
    summarizing: false,
    summaryData: {
        used: 0,
        ready: 0,
        expired: 0
    }
};

const coupon = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_COUPON:
            return {...state, fetching: true}
        case actionTypes.CREATE_COUPON_SUCCESS:
            return {
                ...state,
                fetching: false,
                coupon: action.data.coupon,
                message: action.data.message,
                error: null
            }
        case actionTypes.CREATE_COUPON_FAILURE:
            return {
                ...state,
                fetching: false,
                error: action.data.error,
                coupon: null,
                message: null
            }
        case actionTypes.LIST_COUPON:
            return {...state, fetching: true}
        case actionTypes.LIST_COUPON_SUCCESS:
            return {
                ...state,
                fetching: false,
                coupons: action.data.coupon,
                message: action.data.message,
                error: null
            }
        case actionTypes.LIST_COUPON_FAILURE:
            return {
                ...state,
                fetching: false,
                error: action.data.error,
                coupons: [],
                message: null
            }
        case actionTypes.APPLY_COUPON:
            return {...state, fetching: true, applying: true}
        case actionTypes.APPLY_COUPON_SUCCESS:
            return {
                ...state,
                applying: false,
                fetching: false,
            }
        case actionTypes.APPLY_COUPON_FAILURE:
            return {
                ...state,
                applying: false,
                fetching: false,
            }
        case actionTypes.EXTEND_COUPON:
            return {...state, fetching: true, extending: true}
        case actionTypes.EXTEND_COUPON_SUCCESS:
            return {
                ...state,
                extending: false,
                fetching: false,
            }
        case actionTypes.EXTEND_COUPON_FAILURE:
            return {
                ...state,
                extending: false,
                fetching: false,
            }
        case actionTypes.SUMMARY_COUPON:
            return {...state, fetching: true, summarizing: true}
        case actionTypes.SUMMARY_COUPON_SUCCESS:
            return {
                ...state,
                summarizing: false,
                summaryData: {
                    used: action.data.used,
                    expired: action.data.expired,
                    ready: action.data.ready
                }
            }
        case actionTypes.SUMMARY_COUPON_FAILURE:
            return {
                ...state,
                summarizing: false,
                summaryData: {
                    used: 0,
                    expired: 0,
                    ready: 0,
                }
            }
        default:
            return state;
    }
};

export default coupon;