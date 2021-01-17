import BaseModel from './base.js';

const RegisterModel = {
  register: (data) => {
    return new Promise((resolve) => {
      let url = 'api/authentication/register';
      BaseModel.post(url, data, function (response) {
        resolve(response);
      })
    })
  }
};


export default RegisterModel;