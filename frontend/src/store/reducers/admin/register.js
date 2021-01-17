import * as actionTypes from '../../actions/admin/register';

const initialState = {
  fetching: false,
  user: null,
  error: null,
  message: null
};

const register = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_REGISTER:
      return { ...state, fetching: true }
    case actionTypes.USER_REGISTER_SUCCESS:
      return { ...state, fetching: false, user: action.data.user, message: action.data.message, error: null }
    case actionTypes.USER_REGISTER_FAILURE:
      return { ...state, fetching: false, error: action.data.error, user: null, message: null }
    default:
      return state;
  }
};

export default register;