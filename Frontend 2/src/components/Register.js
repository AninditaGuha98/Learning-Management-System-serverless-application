import React, { Component } from 'react'
// import TextField from '@material-ui/core/TextField';
// import firebase from "./config/fbConfig";
import { Container, Row, Col, Button, Form, DropdownButton, Dropdown } from 'react-bootstrap'
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import './Chat.css'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            password: '',
            email: '',
            organization: '',
            question: '',
            answer: '',
            error: '',
            user: {}
        }
    }




    onValueChange = (e, label) => {
        this.setState({
            [e.target.name]: e.target.value
        });

    }
    onHandleSelect = (e, label) => {
        this.setState({
            organization: e
        });
    }

    addUser = e => {
        let missingValues = 0
        e.preventDefault();
        const data = {
            name: this.state.name,
            password: this.state.password,
            email: this.state.email,
            organization: this.state.organization,
            question: this.state.question,
            answer: this.state.answer,
        }
        axios.post('http://localhost:5001/register', data).then((res) => {
            if (res.status === 200) {
                console.log(res.data.message)
                this.props.history.push('/login')
            }
            else if (res.status === 201) {
                console.log(res.data.error)
            }
            else if (res.status === 202) {
                console.log(res.data.error)
            }
        }).catch((error) => {
            console.log("error")
            console.log(error)
        })
    };


    render() {
        return (
            <div className = "register-outline">
                <h2>Register</h2>
                <div style={{ height: '20rem', width: '30rem', padding: '3rem', textAlign: 'left' }}>
                    <Form onSubmit={this.addUser}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control name="email" type="text" placeholder="Enter Email" onChange={e => this.onValueChange(e, 'email')} value={this.state.email} />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type="password" placeholder="Password" onChange={e => this.onValueChange(e, 'password')} value={this.state.password} />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name" type="text" placeholder="Enter Name" onChange={e => this.onValueChange(e, 'name')} value={this.state.name} />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Select Organization Name</Form.Label>
                            <DropdownButton id="dropdown-basic-button" title={this.state.organization} name="organization" onSelect={e => this.onHandleSelect(e, 'organization')} value={this.state.organization}>
                                <Dropdown.Item eventKey="DAL" >DAL</Dropdown.Item>
                                <Dropdown.Item eventKey="SMU" >SMU</Dropdown.Item>
                                <Dropdown.Item eventKey="Other" >Other</Dropdown.Item>
                            </DropdownButton>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Security Question</Form.Label>
                            <Form.Control name="question" type="text" placeholder="Enter Your Security Question" onChange={e => this.onValueChange(e, 'question')} value={this.state.question} />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Answer</Form.Label>
                            <Form.Control name="answer" type="password" placeholder="Enter Answer" onChange={e => this.onValueChange(e, 'answer')} value={this.state.answer} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                    </Button>
                    </Form>
                </div>
            </div>
        )
    }
}

export default withRouter(Register)
