import React, { Component } from 'react'
import { Table, Container, Row, Col, Form, Button } from 'react-bootstrap'
import axios from 'axios';

class Land_page extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            UserChat: null
        }
    }
    register = () => {
        this.props.history.push('/register')
    }

    login = () => {
        this.props.history.push('/login')
    }

    render() {
        var email = localStorage.getItem('email')
        return (
            <Container>
                <h1 style={{marginTop:'10px'}}>Learning Management System</h1>
            <div className="outer-box">
                
                <Row>
                    <Col>
                        <Button variant="primary" onClick={this.login}>Login</Button>
                    </Col>
                    <Col>
                        <Button variant="primary" onClick={this.register}>Register</Button>
                    </Col>
                </Row>
            </div>
        </Container>
        )
    }
}

export default Land_page
