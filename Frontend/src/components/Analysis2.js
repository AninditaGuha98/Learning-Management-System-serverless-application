import React, { Component } from 'react'
import { Table, Container, Row, Col, Form, Button } from 'react-bootstrap'
import axios from 'axios';

class Analysis2 extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: ''
        }
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
    getSentiments = () => {
        var email = localStorage.getItem('email')
        axios.post('http://localhost:5000/analysis2', email).then((user) => {

        }).catch((error) => {

        })
    }

    render() {
        var email = localStorage.getItem('email')
        return (
            <React.Fragment>
                <div>
                    <Container>
                        <Form.Control type="email" onChange={e => this.onValueChange(e, 'email')} name="email" value={email} readOnly />
                        <Button variant="primary" type="submit" onClick={this.getSentiments}> Get Sentiments!</Button>
                    </Container>

                </div>
                <div>
                    <Container>
                        <div className="table-outer">
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>organization</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {this.renderTableData()} */}
                                </tbody>
                            </Table>
                        </div>
                    </Container>
                </div>
            </React.Fragment>
        )
    }
}

export default Analysis2
