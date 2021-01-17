import {Form, Button, Table, InputGroup, FormControl, Badge, Modal, Col} from 'react-bootstrap';
import {useEffect, useState} from "react";
import {connect} from 'react-redux'
import * as actionTypes from './../../../store/actions/admin/coupon';

const couponStatus =
    {
        READY: 1,
        USED: 2,
        EXPIRED: 3,
    }

const FormatDateTime = (props) => {
    const newDate = new Date(props.date)
    return newDate.toLocaleString('en-GB')
}

const Label = (props) => {
    return <p><Badge variant={props.variant}>{props.text}</Badge>{' '}</p>
}

const ConfirmTimeExtend = (props) => {
    const [show, setShow] = useState(false);
    const {coupon} = props
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [duration, setDuration] = useState(15)
    const [type, setType] = useState(1)
    const [newExpiration, setNewExpiration] = useState(props.expired_at)

    const changeDuration = (e) => {
        setDuration(e.target.value)
    }
    const changeType = (e) => {
        setType(e.target.value)
    }
    const extendCoupon = () => {
        props.extend(coupon.code, newExpiration)
    }
    const CalExpirationDate = (currentExpiration, duration, type) => {
        let extendTime = 0;
        type = parseInt(type)
        switch (type) {
            case 1:
                extendTime = duration * 60 * 1000;
                break;
            case 2:
                console.log('aa')
                extendTime = duration * 60 * 60 * 1000;
                break;
            case 3:
                extendTime = duration * 24 * 60 * 60 * 1000;
                break;
        }
        return new Date(currentExpiration.getTime() + extendTime)
    }
    useEffect(() => {
        const d = CalExpirationDate(new Date(coupon.expired_at), duration, type)
        setNewExpiration(d)
    }, [type, duration])
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Extend expiration
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Extend expiration date</Modal.Title>
                </Modal.Header>
                <Modal.Body><p>Coupon: <strong>{coupon.code}</strong></p><p>Expiration at: <FormatDateTime
                    date={coupon.expired_at}/></p>
                    <Form>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Number</Form.Label>
                                <Form.Control value={duration} onChange={changeDuration}/>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>State</Form.Label>
                                <Form.Control as="select" value={type} onChange={changeType}>
                                    <option value={1}>Minutes</option>
                                    <option value={2}>Hours</option>
                                    <option value={3}>Days</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                    </Form>
                    <p>New expiration: <FormatDateTime
                        date={newExpiration}/></p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={extendCoupon}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

const Coupon = (props) => {
    console.log(props)
    const [search, setSearch] = useState('')
    const changeSearch = (e) => {
        setSearch(e.target.value)
    }
    const [summaryData, setSummaryData] = useState(props.summaryData)
    useEffect(() => {
        setSummaryData(props.summaryData)
    }, [props.summarizing])

    const applyCoupon = (code) => {
        props.apply(code)
    }
    const extendCoupon = (code, newExpiration) => {
        props.extend({code, newExpiration})
    }
    const clearSearch = (e) => {
        setSearch('')
        props.list()
    }
    const createCoupon = () => {
        props.create()
    }
    const checkCoupon = () => {
        props.list(search)
    }
    useEffect(() => {
        props.list(search)
    }, [props.coupon, props.applying, props.extending])

    useEffect(() => {
        props.summary()
    }, [props.coupon, props.applying])

    const {coupons} = props

    const CouponAction = (props) => {
        const {coupon} = props
        if (coupon.status === couponStatus.USED) {
            return <td><Label variant={"success"} text={"used"}/></td>
        }
        const expiredTime = new Date(coupon.expired_at)
        if (expiredTime.getTime() < Date.now()) {
            return <td><Label variant={"secondary"} text={"expired"}/></td>
        }
        return <td><Button className="mr-sm-1" variant={"light"} onClick={() => applyCoupon(coupon.code)}>Apply</Button><ConfirmTimeExtend
            coupon={coupon} extend={extendCoupon}/></td>

    }

    return (<div>
            <Form inline>
                <InputGroup className="my-5 mr-sm-2">
                    <InputGroup.Prepend>
                        <InputGroup.Text>Coupon</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl placeholder="" value={search} onChange={changeSearch}/>
                </InputGroup>
                <Button type="button" className="my-5 mr-sm-1" onClick={checkCoupon}>
                    Check
                </Button>
                <Button variant={"secondary"} type="button" className="my-5 mr-sm-3" onClick={clearSearch}>
                    Clear
                </Button>
                <Button variant="success" type="button" className="my-5 mr-sm-5" onClick={createCoupon}>
                    Generate new coupon
                </Button>

            </Form>
            <Form inline>
                <div className="mt-15 mr-sm-2"><Label variant={"success"} text={"Used | " + summaryData.used}/></div>
                <div className="mt-15 mr-sm-2"><Label variant={"secondary"} text={"Expired | " + summaryData.expired}/>
                </div>
                <div className="mt-15 mr-sm-2"><Label variant={"primary"} text={"Available | " + summaryData.ready}/>
                </div>
                <div className="mt-15 mr-sm-2"><Label variant={"warning"}
                                                      text={"Total | " + parseInt(summaryData.ready + summaryData.expired + summaryData.used)}/>
                </div>
            </Form>
            <Form className="form-coupon">

                <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Code</th>
                        <th>Expiration Time</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {coupons.map((coupon, index) => (
                        <tr key={coupon._id}>
                            <td>{index + 1}</td>
                            <td>{coupon.code}</td>
                            <td>
                                <FormatDateTime date={coupon.expired_at}></FormatDateTime>
                            </td>
                            <CouponAction coupon={coupon}/>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Form>
        </div>
    );
};
const mapStateToProps = (state) => {
    const couponState = state.coupon;
    return {
        ...state, ...couponState
    }
}
const mapDispatchToProps = (dispatch) => ({
    create: () => {
        dispatch({type: actionTypes.CREATE_COUPON})
    },
    list: (code = null) => {
        dispatch({type: actionTypes.LIST_COUPON, code})
    },
    apply: (code = null) => {
        dispatch({type: actionTypes.APPLY_COUPON, code})
    },
    extend: (data) => {
        dispatch({type: actionTypes.EXTEND_COUPON, data})
    },
    summary: () => {
        dispatch({type: actionTypes.SUMMARY_COUPON})
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Coupon)