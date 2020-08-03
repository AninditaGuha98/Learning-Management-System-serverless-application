import React, { Component } from 'react'
import { Table, Container, Row, Col, Form, Button } from 'react-bootstrap'
import axios from 'axios';

class Analysis2 extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            UserChat: null
        }
    }

    renderTableData() {
        return this.state.UserChat.map((users, index) => {
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
        console.log(email)
        axios.post('http://localhost:5001/analysis2', {email : email}).then((response) => {
            console.log(response.data)
            let data = response.data
            this.setState({
               chatlist: data,
               len: data.length
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
          children.push(<td style={{margin:"auto", border:'1px solid black'}}>{this.state.chatlist[i]["sentiment1"]}</td>)
          table.push(<tr style={{fontSize:'20px'}}>{children}</tr>)
          let children2 = []
          children2.push(<td style={{margin:"auto", border:'1px solid black'}}>{this.state.chatlist[i]["chat"]}</td>)
          children2.push(<td style={{margin:"auto", border:'1px solid black'}}>{this.state.chatlist[i]["user2"]}</td>)
          children2.push(<td style={{margin:"auto", border:'1px solid black'}}>{this.state.chatlist[i]["sentiment2"]}</td>)
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
                         <table style={{margin:"auto", border:'1px solid black', marginTop: '20px'}} striped bordered hover variant="dark">
                         {this.createTable()}
                     </table>
                    </Container>
                </div>
            </React.Fragment>
        )
    }
}

export default Analysis2
