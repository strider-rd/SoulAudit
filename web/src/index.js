import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import FileUpload from './file-upload.js';
import './style.css';

class App extends React.Component {
  state = {
    selectedFile: null,
  };

  handleClick(file) {
    console.log(file);
    //http request to server send file to backend
    const endpoint = 'http://localhost:8000/api/fileAudit';
    const formData = new FormData();
    formData.append('file', file);

    axios.post(endpoint, formData).then((res) => {
      console.log(res.data);
    });
  }

  fileChanged(event) {
    this.setState({ selectedFile: event.target.files[0] });
    event.preventDefault();
  }

  render() {
    return (
      <div className="max-height">
        <FileUpload
          uploadClick={(file) => this.handleClick(file)}
          onFileChange={(event) => this.fileChanged(event)}
          file={this.state.selectedFile}
        />
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
