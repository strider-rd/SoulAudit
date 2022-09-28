import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import FileUpload from './file-upload.js';
import './style.css';

class App extends React.Component {
  state = {
    selectedFile: null,
    lintObj: {
      column: 0,
      fix: null,
      line: 0,
      message: '',
      ruleId: '',
      severity: 0,
    },
    lintData: [],
  };

  handleClick(file) {
    console.log(file);
    //http request to server send file to backend
    const endpoint = 'http://localhost:8000/api/fileAudit';
    const formData = new FormData();
    formData.append('file', file);

    axios.post(endpoint, formData).then((res) => {
      console.log(res.data);
      this.setState({ lintData: res.data });
    });
  }

  fileChanged(event) {
    this.setState({ selectedFile: event.target.files[0] });
    event.preventDefault();
  }

  renderlintData() {
    return (
      <div className="container">
        {this.state.lintData.length > 0 && (
          <div>
            <h2>Lint Data</h2>
            {this.state.lintData.map((lintObj, index) => (
              <div className="container">
                <tr>
                  ({lintObj.line}, {lintObj.column}) - {lintObj.message}
                </tr>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  render() {
    return (
      <div className="container max-height">
        <FileUpload
          uploadClick={(file) => this.handleClick(file)}
          onFileChange={(event) => this.fileChanged(event)}
          file={this.state.selectedFile}
        />
        {this.renderlintData()}
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
