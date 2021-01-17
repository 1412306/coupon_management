import Login from './login.container'
import config from '../../../config/config'

const routes = [
  {
    path: config.pathAdmin + '/login',
    component: Login,
    exact: true
  }
];

export default routes;