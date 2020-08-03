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
            OnlineUsers:
                [
                    { name: 'Devam', organization: 'Dal', email: 'devam@email.com' },
                    { name: 'Harsh', organization: 'RBC', email: 'harsh@email.com' },
                    { name: 'Anindita', organization: 'CRA', email: 'anindita@email.com' },

                ],
            something: false,
            currUser: ''

        }

    }

    componentDidMount() {

        axios.get('http://localhost:5001/home', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('IdToken')
            }
        }).then((res) => {
            console.log(res)
            console.log(res)

            if (res.status === 200) {
                console.log(res)
                this.setState({ OnlineUsers: res.data.data, email: res.data.email })
                console.log(res.data.email)
                localStorage.setItem('email', res.data.email)
            }
            else if (res.status === 201) {
                console.log(res)
                this.setState({ OnlineUsers: res.data })
            }
        }).catch((error) => {
            this.props.history.push({
                pathname: '/login',
            })


        })
    }
    userLogout = e => {
        console.log(localStorage.getItem('email'))
        axios.post('http://localhost:5001/logout', { email: localStorage.getItem('email') }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('IdToken')
            }
        }).then((res) => {
            localStorage.removeItem('IdToken')
            localStorage.removeItem('email')
            this.props.history.push('/login')

        }).catch((error) => {
            console.log(error)
        })

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
    gotoBot = () => {
        this.props.history.push('/lex')
    }

    dataProcessing = () => {
        this.props.history.push('/dataProcessing')
    }

    analysisTwo = () => {
        this.props.history.push('/analysis2')
    }
    ChatPubSub = () => {
        this.props.history.push('/chat')
    }




    render() {
        var currentEmail = localStorage.getItem('email')
        return (

            <div>
                <h2> Welcome {currentEmail}</h2>
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
                                <Button variant="primary" onClick={this.gotoBot}>Ask Queries </Button>
                            </Col>
                            <Col>
                                <Button variant="primary" onClick={this.ChatPubSub}>Message Other Users </Button>
                            </Col>
                            <Col>
                                <Button variant="primary" onClick={this.dataProcessing}>Data Processing</Button>
                            </Col>
                            <Col>
                                <Button variant="primary" onClick={this.analysisOne}>Analysis 1</Button>
                            </Col>
                            <Col>
                                <Button variant="primary" onClick={this.analysisTwo}>Analysis 2</Button>
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
