import React, { Component } from 'react'
import './Chat.css'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import axios from 'axios'
import 'react-chat-elements/dist/main.css';
import { MessageBox } from 'react-chat-elements';

class Chat extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            showComp: false,
            message: '',
            chatMessage: false
        }
    }

    componentDidMount() {
        this.loadMessage();
        this.interval = setInterval(() => {
          this.loadMessage();
        }, 5000);
      }


    loadMessage = (e, label) => {
        var email = localStorage.getItem('email')
        axios.post('http://localhost:5002/getmessage?email='+email).then((result) => {
            console.log(result)
            console.log(result.data)
            var ul = document.getElementById("messageList");
            for (var i = 0; i < result.data.length; i++) {
                var name = result.data[i];
                var li = document.createElement('li');
                li.appendChild(document.createTextNode(name));
                ul.appendChild(li)
            }
        }).catch((error) => {
            console.log(error)
        })
    }



    onValueChange = (e, label) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    setSubscriber = () => {
        var email = localStorage.getItem('email')
        var name = this.state.name
        axios.post('http://127.0.0.1:5002/setsubscriber?email='+name).then((result) => {
            console.log(result)
        }).catch((error) => {
            console.log(error)
        })
    }


    onMessageSend = (e) => {
        e.preventDefault();
        var email = localStorage.getItem('email')
        console.log(this.state.message)
        axios.post('http://127.0.0.1:5002/sendmessage?email=' + email, { message: this.state.message })
        .then((result) => {
            console.log(result)
        }).catch((error) => {
            console.log(error)
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className="upperPart" hidden={this.state.showComp}>
                    <Container>
                        <Row>
                            <Col>
                                <Form.Control type="text" placeholder="Enter Name" onChange={e => this.onValueChange(e, 'name')} name="name" />
                            </Col>
                            <Col>
                                <Button type="submit" variant="primary" onClick={this.setSubscriber}>Submit</Button>
                            </Col>
                        </Row>

                    </Container>
                </div>
                <div className="messagePart">
                    <Container>
                        <Form>
                            <Row>
                                <Col> <h4>
                                    Enter Your Message
                            </h4>
                                </Col>
                                <Col>
                                    <Form.Control as="textarea" rows="5" onChange={e => this.onValueChange(e, 'message')} name="message" />
                                </Col>
                            </Row>
                            <Row style={{ justifyContent: 'center', marginTop: '1rem' }}>
                                <Button variant="primary" type="submit" onClick={this.onMessageSend}>
                                    Send Message
                            </Button>
                            </Row>
                        </Form>
                    </Container>
                </div>
                <Container>
                    {this.state.chatMessage ? (<p>
                        {this.state.chatMessage}
                    </p>
                    ) : (<div></div>)}
                </Container>
                <Container>
                    <Button variant="success" type="submit" onClick={this.loadMessage} style={{ marginTop: '2rem' }}> Get Messages</Button>
                    <ul id = "messageList" style={{marginTop:'10px',listStyle:'none',border:'1px solid black'}}>
                    </ul>
                    
                </Container>

            </React.Fragment>
        )
    }
}

export default Chat
