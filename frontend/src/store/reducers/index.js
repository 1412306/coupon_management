import {combineReducers} from 'redux'
import register from './admin/register'
import login from './admin/login'
import coupon from './admin/coupon'

const rootReducer = combineReducers({
  register,
  login,
  coupon
});

export default rootReducer
