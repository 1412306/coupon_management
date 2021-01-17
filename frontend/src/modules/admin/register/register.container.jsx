import {Form, Button} from 'react-bootstrap';
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {connect} from 'react-redux'
import * as actionTypes from './../../../store/actions/admin/register';


const Register = (props) => {
    console.log(props)
    const [username, setUsername] = useState('')
    const [email, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    useEffect(() => {
        setMessage(props.message)
    }, [props.message])
    useEffect(() => {
        setError(props.error)
    }, [props.error])
    const changePassword = (e) => {
        setPassword(e.target.value)
    }
    const changeEmail = (e) => {
        setMail(e.target.value)
    }
    const changeUsername = (e) => {
        setUsername(e.target.value)
    }
    const onSubmit = () => {
        props.register({email, password, username})
    }

    return (
        <Form className="form-register">
            <h1>Register</h1>
            <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" placeholder="Enter username" value={username} onChange={changeUsername}/>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={changeEmail}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={changePassword}/>
            </Form.Group>
            <Button variant="primary" type="button" onClick={onSubmit}>
                Submit
            </Button>
            <Link to={'/site/login'}><Button variant={"light"}>Login</Button></Link>
            <h5>{error}</h5>
            <h5>{message}</h5>
        </Form>
    );
};
const mapStateToProps = (state) => {
    const registerState = state.register;
    return {
        ...state, ...registerState
    }
}
const mapDispatchToProps = (dispatch) => ({
    register: (data) => {
        dispatch({type: actionTypes.USER_REGISTER, data})
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Register)