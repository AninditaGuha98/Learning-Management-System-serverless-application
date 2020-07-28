import React, { Component } from 'react'
import S3FileUpload from 'react-s3';
import { Button, Row, Col, Container, Form } from 'react-bootstrap'
import axios from 'axios'

import { uploadFile } from 'react-s3';

const config = {
    bucketName: 'sample-devam',
    region: 'us-east-1',
    accessKeyId: 'ASIAX7AYFPY4YMBF2L5X',
    secretAccessKey: 'eSuov1VfyJQpeu7KstWcvPA41L6pkGhW6epiOUiL',
}

class Analysis1 extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }


    uploadFile = (e) => {
        console.log(e.target.files)
        // axios.post('', { email: 'harshgp44@gmail.com', file: '2' }).then((result) => {
        //     console.log(result)
        // }).catch((error) => {
        //     console.log(error)
        // })
        console.log(e.target.files.fileList)
        var length = e.target.files.length;
        // console.log(e.target.file[0: length - 1]
            S3FileUpload.uploadFile(e.target.files, config).then((data) => {
                console.log(data)
            }).catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Form>

                            {/* <input type = "file" onChange = {this.uploadFile}>Upload Files</input> */}
                            <Form.File
                                id="custom-file"
                                label="File Input"
                                custom
                                multiple
                                onChange={this.uploadFile}
                            />
                        </Form>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Analysis1
