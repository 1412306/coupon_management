const path = require('path');
const _ = require('lodash')
const config = global.config
const CouponBusiness = require(path.resolve('./src/api/coupon/coupon.business'));
const coupon_status = require("./coupon.constant").coupon_status || {};
const {v4: uuidv4} = require('uuid');

const create = async (req, res) => {
    try {
        const code = uuidv4();
        const couponBusiness = new CouponBusiness()
        const expiredDate = new Date(Date.now() + config.couponLife)
        let newCoupon = await couponBusiness.create({code, expired_at: expiredDate});
        return res.status(200).json({coupon: newCoupon, message: 'Create new coupon success!'});
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            error: 'Something went wrong!'
        });
    }
}

const list = async (req, res) => {
    try {
        const {code} = req.body
        const couponBusiness = new CouponBusiness()
        let coupons = await couponBusiness.getAll(code);
        return res.status(200).json({coupon: coupons, message: 'Get list success!'});
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            error: 'Something went wrong!'
        });
    }
}

const summary = async (req, res) => {
    try {
        const couponBusiness = new CouponBusiness()
        let used = await couponBusiness.count('USED');
        let expired = await couponBusiness.count('EXPIRED');
        let ready = await couponBusiness.count('READY');

        return res.status(200).json({used, expired, ready, message: 'Summary success!'});
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            error: 'Something went wrong!'
        });
    }
}

const apply = async (req, res) => {
    try {
        const {code} = req.body
        const couponBusiness = new CouponBusiness()
        let coupons = await couponBusiness.findByCode(code);
        if (coupons.length) {
            const coupon = coupons[0]
            if (coupon.status === coupon_status.USED) {
                return res.status(200).json({message: 'Coupon used before!'});
            }
            if (coupon.expired_at.getTime() < Date.now()) {
                return res.status(200).json({message: 'Coupon expired!'});
            }
            await couponBusiness.apply(coupon._id);
            return res.status(200).json({message: 'Apply coupon success!'});
        } else {
            return res.status(200).json({message: 'Coupon not found!'});
        }


    } catch (error) {
        console.log(error)
        return res.status(500).send({
            error: 'Something went wrong!'
        });
    }
}

const extend = async (req, res) => {
    try {
        let {code, newExpiration} = req.body;
        newExpiration = new Date(newExpiration)
        const couponBusiness = new CouponBusiness();
        let coupons = await couponBusiness.findByCode(code);
        if (coupons.length) {
            const coupon = coupons[0]
            if (coupon.status === coupon_status.USED) {
                return res.status(200).json({message: 'Can not extend used coupon'});
            }
            if (coupon.expired_at.getTime() < Date.now()) {
                return res.status(200).json({message: 'Can not extend expired coupon'});
            }
            if (coupon.expired_at.getTime() > newExpiration.getTime()) {
                return res.status(200).json({message: 'New expiration must be longer than current expiration'});
            }
            await couponBusiness.extend(coupon._id, newExpiration);
            return res.status(200).json({message: 'Extend coupon success!'});
        } else {
            return res.status(200).json({message: 'Coupon not found!'});
        }


    } catch (error) {
        console.log(error)
        return res.status(500).send({
            error: 'Something went wrong!'
        });
    }
}

module.exports = {
    create,
    list,
    apply,
    extend,
    summary
}
