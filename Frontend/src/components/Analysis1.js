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
        this.setState({ selectedFile: event.target.files });

    };

    // On file upload (click the upload button) 
    onFileUpload = () => {

        const formData = new FormData();
        let files = this.state.selectedFile;

        for (let i = 0; i < files.length; i++) {
            formData.append(`images[${i}]`, files[i])
        }
 
        console.log(this.state.selectedFile);
        var email = localStorage.getItem('email')
        axios({
            url: "http://127.0.0.1:5000/machine_learning?email="+email,
            method: 'POST',
            data: formData
        }).then((response) => {
            
            let data = JSON.parse(response.data);
            this.setState({
                length: data[0].length,
                titles: data[0],
                clusters: data[1]
            })
        });  
    };

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

    createTable = () => {
        let table = []
        let header = []
        header.push(<th style={{margin:"auto", border:'1px solid black'}}>Titles</th>)
        header.push(<th style={{margin:"auto", border:'1px solid black'}}>Clusters</th>)
        table.push(<thead style={{fontSize:'30px'}}>{header}</thead>)

        for (let i = 0; i < this.state.length; i++) {
          let children = []
          children.push(<td style={{margin:"auto", border:'1px solid black'}}>{this.state.titles[i]}</td>)
          children.push(<td style={{margin:"auto", border:'1px solid black'}}>{this.state.clusters[i]}</td>)
          table.push(<tr style={{fontSize:'20px'}}>{children}</tr>)
        }
        return table
      }

    render() {

        return (
            <div>
                <h1>
                    Upload File
            </h1>
                <h3>
                Analysis 1: Generate text clusters from titles of the files.
            </h3>
                <div style={{marginBottom: '20px'}}>
                    <input type="file" multiple onChange={this.onFileChange} />
                    <button onClick={this.onFileUpload}>
                        Upload!
                </button>
                </div>
                <table style={{margin:"auto", border:'1px solid black'}} striped bordered hover variant="dark">
                    {this.createTable()}
                </table>
            </div>

        );
    }
}

export default Analysis1