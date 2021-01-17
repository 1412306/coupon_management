import BaseModel from './base.js';

const LoginModel = {
  login: (data) => {
    return new Promise((resolve) => {
      let url = 'api/authentication/login';
      BaseModel.post(url, data, function (response) {
        resolve(response);
      })
    })
  }
};


export default LoginModel;