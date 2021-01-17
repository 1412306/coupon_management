import React, {Fragment, useEffect} from 'react';
import jwt from 'jwt-decode'
import {useHistory} from 'react-router'
import BaseModel from '../model/base'

const Middleware = (props) => {
    const history = useHistory()
    console.log(props)
    useEffect(() => {
        console.log('md2')
        if (window.location.pathname !== '/site/register') {
            const token = localStorage.getItem('access_token');
            const decoded = token ? jwt(token) : null;
            if (token && decoded.exp > Date.now() / 1000) {
                BaseModel.updateToken(token);
                history.push('/site')
            } else {
                localStorage.clear()
                history.push('/site/login')
            }
        }
    }, [])

    return props.children
}

export default Middleware