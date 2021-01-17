import {Form, Button} from 'react-bootstrap';
import {useEffect, useState} from "react";
import {connect} from 'react-redux'
import * as actionTypes from './../../../store/actions/admin/login';
import {useHistory, Link} from "react-router-dom";
import BaseModel from "../../../model/base";

const Login = (props) => {
    const history = useHistory()
    const [email, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [error,setError] = useState('')
    const [message,setMessage] = useState('')

    useEffect(()=>{
        setMessage(props.message)
    },[props.message])

    useEffect(()=>{
        setMessage(props.error)
    },[props.error])

    const changePassword = (e) => {
        setPassword(e.target.value)
    }
    const changeEmail = (e) => {
        setMail(e.target.value)
    }
    const onSubmit = () => {
        props.login({email, password})
    }
    useEffect(() => {
        if (props.accessToken) {
            BaseModel.updateToken(props.accessToken);
            localStorage.setItem("access_token", props.accessToken);
            localStorage.setItem("refresh_token", props.refreshToken);
            setTimeout(() => {
                history.push(`/site`)
            }, 500)
        }
    }, [props.accessToken])

    return (
        <Form className="form-login">
            <h1>Login</h1>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={changeEmail}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={changePassword}/>
            </Form.Group>
            <Button variant="primary" type="button" onClick={onSubmit}>
                Login
            </Button>
            <Link to={'/site/register'}><Button variant={"light"}>Register new account</Button></Link>
            <h5>{error}</h5>
            <h5>{message}</h5>
        </Form>
    );
};
const mapStateToProps = (state) => {
    const loginState = state.login;
    return {
        ...state, ...loginState
    }
}
const mapDispatchToProps = (dispatch) => ({
    login: (data) => {
        dispatch({type: actionTypes.USER_LOGIN, data})
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Login)