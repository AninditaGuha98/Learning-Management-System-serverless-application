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
    

    loadMessage = (e, label) => {
        e.preventDefault()
        var email = localStorage.getItem('email')
        axios.post('http://localhost:5000/listenMessage', { name: email }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('IdToken')
            }
        }).then((result) => {
            console.log(result)
            console.log(result.data.message)
            this.setState({
                chatMessage: result.data.message
            })
        }).catch((error) => {
            console.log(error)
        })
    }



    onValueChange = (e, label) => {
        this.setState({
            [e.target.name]: e.target.value
        });

    }

    

    createSub = () => {
        axios.post('http://localhost:5000/createSub', { subName: this.state.name }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('IdToken')
            }
        }).then((result) => {
            console.log(result)
        }).catch((error) => {

        })
    }

    // componentDidMount() {
        
    //     // let i = 0;
    //     // let interval = setInterval(() => {
    //     //   if (i<11) {
    //     //     this.getPerson(this.apiUrl + i);
    //     //     i++;
    //     //     console.log("waiting for the next call.");
    //     //   }
    //     //   else {
    //     //     clearInterval(interval)
    //     //   }
    
    //     // }, 5000);
    //     window.setInterval
    //     (function(){
            
    //         axios.post('http://127.0.0.1:5000/listenMessage').then((res) => {
    //             console.log(res.data.message)
    //         }).catch((error) => {
    //             console.log("error")
    //         })},5000);
    //         // do some stuff
    //         // setTimeout(arguments.callee, 2000);
    //     // })();
    //   }

      


    onMessageSend = (e) => {
        var email = localStorage.getItem('email')
        console.log(email)
        axios.post('http://127.0.0.1:5000/pubMessage', { message: this.state.message }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('IdToken')
            }
        }).then((result) => {
            console.log(result)
        }).catch((error) => {
            console.log(error)
        })
    }

    render() {


        return (
            <React.Fragment>
                {/* <div className="upperPart" hidden={this.state.showComp}>
                    <Container  >
                        <Row>
                            <Col>
                                <Form.Control type="text" placeholder="Enter Name" onChange={e => this.onValueChange(e, 'name')} name="name" />
                            </Col>
                            <Col>
                                <Button type="submit" variant="primary" onClick={this.createSub}>Submit</Button>
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
                </Container> */}
            <MessageBox>
                
            </MessageBox>
            </React.Fragment>
        )
    }
}

export default Chat
