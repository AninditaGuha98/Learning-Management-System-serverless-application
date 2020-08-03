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
        email = "aninditaguha9@gmail.com"
        axios.post('http://localhost:5000/getmessage?email='+email).then((result) => {
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
<<<<<<< HEAD

    

    createSub = () => {
        axios.post('http://localhost:5000/createSub', { subName: this.state.name }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('IdToken')
            }
        }).then((result) => {
=======
    
    setSubscriber = () => {
        var email = localStorage.getItem('email')
        var name = this.state.name
        email = "harshgp44@gmail.com"
        axios.post('http://127.0.0.1:5000/setsubscriber?email='+name).then((result) => {
>>>>>>> 794f39f4b826a322cfe3c7fffb6a63187fd3d952
            console.log(result)
        }).catch((error) => {
            console.log(error)
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
<<<<<<< HEAD
        console.log(email)
        axios.post('http://127.0.0.1:5000/pubMessage', { message: this.state.message }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('IdToken')
            }
        }).then((result) => {
=======
        email = "harshgp44@gmail.com"
        console.log(this.state.message)
        axios.post('http://127.0.0.1:5000/sendmessage?email=' + email, { message: this.state.message })
        .then((result) => {
>>>>>>> 794f39f4b826a322cfe3c7fffb6a63187fd3d952
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
<<<<<<< HEAD
                </Container> */}
            <MessageBox>
                
            </MessageBox>
=======
                    <ul id = "messageList" style={{marginTop:'10px',listStyle:'none',border:'1px solid black'}}>
                    </ul>
                    
                </Container>

>>>>>>> 794f39f4b826a322cfe3c7fffb6a63187fd3d952
            </React.Fragment>
        )
    }
}

export default Chat
