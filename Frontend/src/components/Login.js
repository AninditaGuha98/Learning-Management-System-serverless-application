import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom';
// import firebase from "./config/fbConfig";
import axios from 'axios'


class login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        }
    }

    onValueChange = (e, label) => {
        this.setState({
            [e.target.name]: e.target.value
        });

    }

    loginUser = e => {
        e.preventDefault();
        var data = { email: this.state.email, password: this.state.password }
        axios.post('http://localhost:5000/login', data).then((res) => {
            // console.log(res)
            if (res.status === 201) {
                console.log(res)
                this.props.history.push('/security')
            }
        })
            .catch((error) => {
                console.log(error)
            })
        // firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
        //     console.log("Success Sign In")
        //     this.props.history.push('/home')
        // }).catch((error) => {
        //     console.log(error)
        // })
    }

    render() {
        console.log("Render")
        return (
            <div style={{ height: '20rem', width: '30rem', padding: '3rem', textAlign: 'left' }}>
                <Form onSubmit={this.loginUser}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" placeholder="Enter Username" onChange={e => this.onValueChange(e, 'email')} name="email" />
                        <Form.Text className="text-muted">
                            We'll never share your details with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={e => this.onValueChange(e, 'password')} name="password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}

export default withRouter(login);
