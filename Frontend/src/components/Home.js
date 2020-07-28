import React, { Component } from 'react'
import { Button, Row, Col, Container, Table } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import './Home.css'
import axios from 'axios';
// import firebase from "./config/fbConfig";

class Home extends Component {
    constructor(props) {

        super(props)

        this.state = {
            OnlineUsers: [
                { name: 'Devam', organization: 'Dal', email: 'devam@email.com' },
                { name: 'Harsh', organization: 'RBC', email: 'harsh@email.com' },
                { name: 'Anindita', organization: 'CRA', email: 'anindita@email.com' },

            ],
            something: false

        }

    }

    componentDidMount() {

        axios.get('http://localhost:5000/home').then((res) => {
            console.log(this.state.OnlineUsers)
            console.log(res)
            this.setState({ OnlineUsers: res.data })
        }).catch((error) => {

        })
    }
    userLogout = e => {
        // firebase.auth().signOut();
        axios.get('http://localhost:5000/logout').then((res) => {
            
        }).catch((error) => {
            console.log(error)
        })
        // this.props.history.push('/')
    }

    renderTableData() {
        
        return this.state.OnlineUsers.map((users, index) => {
            const { name, organization, email } = users //destructuring
            return (
                <tr key={email}>
                    <td>{name}</td>
                    <td>{organization}</td>
                    <td>{email}</td>
                </tr>
            )
        })
    }
    analysisOne = () => {
        this.props.history.push('/analysis')
        
    }

    dataProcessing = () => {
        this.props.history.push('/dataProcessing')
    }

    render() {
        console.log(this.state.pet)
        console.log(this.state.email)

        return (
            
            <div>
                <h2> Welcome {this.state.currUser}</h2>
                <Container>
                    <div className="table-outer">
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>organization</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTableData()}
                            </tbody>
                        </Table>
                    </div>
                </Container>

                <Container>
                    <div className="outer-box">
                        <Row>
                            <Col>
                                <Button variant="primary" onClick={this.userLogout}>ChatBot </Button>
                            </Col>
                            <Col>
                                <Button variant="primary" onClick={this.userLogout}>Message Other Users </Button>
                            </Col>
                            <Col>
                                <Button variant="primary" onClick={this.dataProcessing}>Data Processing</Button>
                            </Col>
                            <Col>
                                <Button variant="primary" onClick={this.analysisOne}>Analysis 1</Button>
                            </Col>
                            <Col>
                                <Button variant="primary" onClick={this.userLogout}>Analysis 2</Button>
                            </Col>
                            <Col>
                                <Button variant="secondary" onClick={this.userLogout}>Logout</Button>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
            
        )
    }
}

export default withRouter(Home)
