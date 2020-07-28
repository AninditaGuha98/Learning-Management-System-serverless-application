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
        axios.post('http://localhost:5000/analysis2', email).then((response) => {
            let data = JSON.parse(response.data);
            let data2 = [{
                "chat": "harsh-someone",
                "user1" : "Harsh",
                "sentiment1":"POSITIVE",
                "user2":"Someone",
                "sentiment2":"NEGATIVE"
            },{
                "chat": "harsh-someone",
                "user1" : "Annu",
                "sentiment1":"POSITIVE",
                "user2":"Harsh",
                "sentiment2":"NEGATIVE"
            }]
            this.setState({
               chatlist: data2,
               len: data2.length
            })
        }).catch((error) => {

        })
    }

    createTable = () => {
        let table = []
        let header = []
        header.push(<th style={{margin:"auto", border:'1px solid black'}}>Chats</th>)
        header.push(<th style={{margin:"auto", border:'1px solid black'}}>User</th>)
        header.push(<th style={{margin:"auto", border:'1px solid black'}}>Sentiment</th>)
        table.push(<thead style={{fontSize:'30px'}}>{header}</thead>)

        for (let i = 0; i < this.state.len; i++) {
          let children = []
          children.push(<td style={{margin:"auto", border:'1px solid black'}}>{this.state.chatlist[i]["chat"]}</td>)
          children.push(<td style={{margin:"auto", border:'1px solid black'}}>{this.state.chatlist[i]["user1"]}</td>)
          children.push(<td style={{margin:"auto", border:'1px solid black'}}>{this.state.chatlist[i]["sentiment"]}</td>)
          table.push(<tr style={{fontSize:'20px'}}>{children}</tr>)
          let children2 = []
          children.push(<td style={{margin:"auto", border:'1px solid black'}}>{this.state.chatlist[i]["chat"]}</td>)
          children.push(<td style={{margin:"auto", border:'1px solid black'}}>{this.state.chatlist[i]["user2"]}</td>)
          children.push(<td style={{margin:"auto", border:'1px solid black'}}>{this.state.chatlist[i]["sentiment2"]}</td>)
          table.push(<tr style={{fontSize:'20px'}}>{children2}</tr>)
        }
        return table
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
                        {/* <div className="table-outer">
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>organization</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderTableData()}
                                </tbody>
                            </Table>

                        </div> */}
                         <table style={{margin:"auto", border:'1px solid black'}} striped bordered hover variant="dark">
                         {this.createTable()}
                     </table>
                    </Container>
                </div>
            </React.Fragment>
        )
    }
}

export default Analysis2