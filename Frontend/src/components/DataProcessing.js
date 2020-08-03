// export default Analysis1
import axios from 'axios';

import React, { Component } from 'react';

class DataProcessing extends Component {

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

        const formData = new FormData();

        formData.append(
            "Text",
            this.state.selectedFile,
            this.state.selectedFile.name
        );
 
        console.log(this.state.selectedFile);
        var email = localStorage.getItem('email')
        axios({
            url: "http://127.0.0.1:5000/data_processing?email="+email,
            method: 'POST',
            data: formData
        }).then((response) => {
            this.setState({
                image: "data:image/png;base64," + response.data
     
            })

        });  
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
                Data Processing: Generate word cloud from the named entities of the uploaded files.
            </h3>
                <div>
                    <input type="file" onChange={this.onFileChange} />
                    <button onClick={this.onFileUpload}>
                        Upload!
                </button>
                </div>
                
                <div style={{marginTop: '40px'}}>
                    <img className="myImg" alt="" width="600"
                        height="600" src={this.state.image}/>
                </div>
            </div>

        );
    }
}

export default DataProcessing