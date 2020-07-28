import React, { Component } from 'react'
import './Chat.css'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import axios from 'axios'

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

    // async componentDidMount() {
    //     axios.post('http://localhost:5000/listenMessage', { name: 'Devam'}).then((result) => {
    //         this.setState({
    //             chatMessage: result.data.message
    //         })
    //         console.log(this.state.chatMessage)
    //     }).catch((error) => {
    //         console.log(error)
    //     })
    // }
    loadMessage = (e, label) => {
        e.preventDefault()
        axios.post('http://localhost:5000/listenMessage', { name: 'Devam'}).then((result) => {
            // this.setState({
            //     chatMessage: result.data.message
            // })
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

    createTopic = () => {
        axios.post('http://localhost:5000/createSub', { subName: this.state.name }).then((result) => {
            console.log(result)
        }).catch((error) => {

        })
    }

    onMessageSend = () => {
        axios.post('http://localhost:5000/pubMessage', { message: this.state.message }).then((result) => {
            console.log(result)
        }).catch((error) => {
            console.log(error)
        })
    }

    render() {


        return (
            <React.Fragment>
                <div className="upperPart" hidden={this.state.showComp}>
                    <Container  >
                        <Row>
                            <Col>
                                <Form.Control type="text" placeholder="Enter Name" onChange={e => this.onValueChange(e, 'name')} name="name" />
                            </Col>
                            <Col>
                                <Button type="submit" variant="primary" onClick={this.createTopic}>Submit</Button>
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
                    {this.state.chatMessage ? ( <p>
                        { this.state.chatMessage }
                        </p>
                    ) : (<div></div>)}
                </Container>
                <Container>
                    <Button variant = "success" type = "submit" onClick = {this.loadMessage} style ={{marginTop:'2rem'}}> Get Messages</Button>
                </Container>

            </React.Fragment>
        )
    }
}

export default Chat
