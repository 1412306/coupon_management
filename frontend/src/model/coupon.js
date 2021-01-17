import BaseModel from './base.js';

const CouponModel = {
  create: () => {
    return new Promise((resolve) => {
      let url = 'api/coupon/create';
      BaseModel.post(url, null, function (response) {
        resolve(response);
      })
    })
  },
  list: (code) => {
    return new Promise((resolve) => {
      let url = 'api/coupon/list';
      BaseModel.post(url, {code:code}, function (response) {
        resolve(response);
      })
    })
  },
  apply: (code) => {
    return new Promise((resolve) => {
      let url = 'api/coupon/apply';
      BaseModel.put(url, {code:code}, function (response) {
        resolve(response);
      })
    })
  },
  extend: (data) => {
    return new Promise((resolve) => {
      let url = 'api/coupon/extend';
      BaseModel.put(url, data, function (response) {
        resolve(response);
      })
    })
  },
  summary: () => {
    return new Promise((resolve) => {
      let url = 'api/coupon/summary';
      BaseModel.post(url, null, function (response) {
        resolve(response);
      })
    })
  }
};


export default CouponModel;