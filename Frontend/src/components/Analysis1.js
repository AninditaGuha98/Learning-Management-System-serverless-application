// import React, { Component } from 'react'
// import S3FileUpload from 'react-s3';
// import { Button, Row, Col, Container, Form } from 'react-bootstrap'
// import axios from 'axios'

// import { uploadFile } from 'react-s3';

// const config = {
//     bucketName: 'sample-devam',
//     region: 'us-east-1',
//     accessKeyId: 'ASIAX7AYFPY4YMBF2L5X',
//     secretAccessKey: 'eSuov1VfyJQpeu7KstWcvPA41L6pkGhW6epiOUiL',
// }

// class Analysis1 extends Component {
//     constructor(props) {
//         super(props)

//         this.state = {

//         }
//     }


//     uploadFile = (e) => {
//         console.log(e.target.files)
//         const formData = new FormData();
//         formData.append(
//             "myFile",
//             this.state.selectedFile,
//             this.state.selectedFile.name
//         );
//         // axios.post('', { email: 'harshgp44@gmail.com', file: '2' }).then((result) => {
//         //     console.log(result)
//         // }).catch((error) => {
//         //     console.log(error)
//         // })
//         console.log(e.target.files[0])
//         // var length = e.target.files.length;
//         // console.log(e.target.file[0: length - 1]
//         axios.post('http://127.0.0.1:5000/data_processing', { email: 'harshgp44@gmail.com', text: e.target.files[0] }).then((user) => {
//             console.log(user)

//             var img = user.body.image
//         }).catch((error) => {
//             console.log(error)
//         })
//     }

//     render() {
//         return (
//             <div>
//                 <Container>
//                     <Row>
//                         <Form>

//                             {/* <input type = "file" onChange = {this.uploadFile}>Upload Files</input> */}
//                             <Form.File
//                                 id="custom-file"
//                                 label="File Input"
//                                 custom
//                                 multiple
//                                 onChange={this.uploadFile}
//                             />
//                         </Form>
//                     </Row>
//                 </Container>
//             </div>
//         )
//     }
// }

// export default Analysis1
import axios from 'axios';

import React, { Component } from 'react';

class Analysis1 extends Component {

    state = {

        // Initially, no file is selected 
        selectedFile: null,
        image: null
    };

    // On file select (from the pop up) 
    onFileChange = event => {

        // Update the state 
        this.setState({ selectedFile: event.target.files[0] });

    };

    // On file upload (click the upload button) 
    onFileUpload = () => {

        // Create an object of formData 
        const formData = new FormData();

        // Update the formData object 
        formData.append(
            "Text",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        // Details of the uploaded file 
        console.log(this.state.selectedFile);

        // Request made to the backend api 
        // Send formData object 
        axios({
            url: "http://127.0.0.1:5000/data_processing?email=harshgp44@gmail.com",
            method: 'POST',
            responseType: 'blob',
            data: formData
        }).then((res) => res.json())
        .then((data) => {
            // console.log(img)
            var base64Flag = 'data:image/jpeg;base64,';
            var imageStr = this.arrayBufferToBase64(data.img.data.data);
            this.setState({
                image: base64Flag + imageStr
            })
        });
        
        
        
        
        // .then((data) => 
        //     console.log(data.json())
            // console.log("data:image/png;base64," + data)
            // const b64Data = btoa(
            //     new Uint8Array(data.data).reduce(
            //         (dataArray, byte) => {
            //             return dataArray + String.fromCharCode(byte);
            //         },
            //         ''
            //     )
            // );
            // const userAvatarData = {
            //     key: 'image',
            //     value: `data:image/png;base64,${b64Data}`
            // };
            // this.setState({
            //     image: data
            // })
            // return userAvatarData.value; // here we return the base64 image data to our component

        // );
    };

    // File content to be displayed after 
    // file upload is complete 
    fileData = () => {

        if (this.state.selectedFile) {

            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {this.state.selectedFile.name}</p>
                    <p>File Type: {this.state.selectedFile.type}</p>
                    <p>
                        Last Modified:{" "}
                        {this.state.selectedFile.lastModifiedDate.toDateString()}
                    </p>
                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h4>Choose before Pressing the Upload button</h4>
                </div>
            );
        }
    };

    render() {

        return (
            <div>
                <h1>
                    Upload File
            </h1>
                <h3>
                    File Upload using React!
            </h3>
                <div>
                    <input type="file" onChange={this.onFileChange} />
                    <button onClick={this.onFileUpload}>
                        Upload!
                </button>
                </div>
                {this.fileData()}
                <div>
                    <img className="myImg" alt="" width="300"
                        height="300" src={this.state.image} />
                </div>
            </div>

        );
    }
}

export default Analysis1