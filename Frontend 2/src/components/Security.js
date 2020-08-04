import React, { Component } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

class Security extends Component {
    constructor(props) {
        super(props)

        this.state = {
            question: '',
            answer: '',
            OriginalAnswer: '',
            email: '',
            IdToken : props.location.state
        }
    }

    componentDidMount() {
        localStorage.setItem('IdToken', this.state.IdToken)
        console.log(this.state.IdToken)
        axios.get('http://localhost:5001/security', {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('IdToken')  
            }})
            .then((res) => {
                console.log(res)
                this.setState({
                    OriginalAnswer: res.data.data.answer,
                    question: res.data.data.question,
                    email: res.data.email
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }
    
    verifyuser = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5001/securityPost', { answer: this.state.answer, OriginalAnswer: this.state.OriginalAnswer, email: this.state.email }, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('IdToken')  
            }})
            .then((res) => {
                this.props.history.push('/home')
                localStorage.setItem('email', this.state.email)
            })
            .catch((error) => {
                console.log(error)
            })
        // var question 
    }


    onValueChange = (e, label) => {
        this.setState({
            [e.target.name]: e.target.value
        });

    }

    render() {
        console.log(this.state)
        return (
            <div style={{ height: '20rem', width: '30rem', padding: '3rem', textAlign: 'left' }}>
                <Form onSubmit={this.verifyuser}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Security Question</Form.Label>
                        <Form.Control type="text" placeholder="Security" value={this.state.question} name="question" readOnly />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Answer</Form.Label>
                        <Form.Control type="password" placeholder="Answer" onChange={e => this.onValueChange(e, 'answer')} name="answer" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>


        )
    }
}

export default withRouter(Security)
