import * as actionTypes from '../../actions/admin/login';

const initialState = {
    fetching: false,
    accessToken: null,
    refreshToken: null,
    error: null,
    message: null
};

const login = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN:
            return {...state, fetching: true}
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                fetching: false,
                accessToken: action.data.accessToken,
                refreshToken: action.data.refreshToken, 
                message: action.data.message, 
                error: null
            }
        case actionTypes.USER_LOGIN_FAILURE:
            return {
                ...state,
                fetching: false,
                error: action.data.error,
                accessToken: null,
                refreshToken: null,
                message: null
            }
        default:
            return state;
    }
};

export default login;