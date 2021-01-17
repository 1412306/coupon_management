import Register from './register.container'
import config from '../../../config/config'

const routes = [
  {
    path: config.pathAdmin + '/register',
    component: Register,
    exact:true
  }
];

export default routes;