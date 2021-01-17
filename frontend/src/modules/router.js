import Register from './admin/register/register.route';
import Login from './admin/login/login.route';
import Coupon from './admin/coupon/coupon.route';

const routes = [
    ...Login,
    ...Register,
    ...Coupon
];

export default routes;