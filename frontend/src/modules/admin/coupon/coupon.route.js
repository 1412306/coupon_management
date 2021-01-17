import Coupon from './coupon.container'
import config from '../../../config/config'

const routes = [
  {
    path: config.pathAdmin + '/',
    component: Coupon,
    exact: true
  }
];

export default routes;