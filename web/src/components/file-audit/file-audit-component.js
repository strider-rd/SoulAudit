import axios from 'axios';
import React from 'react';
import { showLoader } from '../../helpers/loaders.js';
import AuditFileUpload from './file-upload.js';

export class FileAuditComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
    };
  }

  handleClick(file) {
    //http request to server send file to backend
    const endpoint = 'http://localhost:8000/api/fileAudit';
    const formData = new FormData();
    formData.append('file', file);

    showLoader();

    axios.post(endpoint, formData).then(
      (res) => {
        console.log(res.data);
        this.props.polulateData(res.data.reports);
      },
      (error) => {},
    );
  }

  fileChanged(event) {
    this.setState({ selectedFile: event.target.files[0] });
    event.preventDefault();
  }

  render() {
    return (
      <AuditFileUpload
        uploadClick={(file) => this.handleClick(file)}
        onFileChange={(event) => this.fileChanged(event)}
        file={this.state.selectedFile}
      />
    );
  }
}
