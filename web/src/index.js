import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import AuditFileUpload from './file-upload.js';
import './style.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      lintData: [],
    };
  }

  handleClick(file) {
    //http request to server send file to backend
    const endpoint = 'http://localhost:8000/api/fileAudit';
    const formData = new FormData();
    formData.append('file', file);

    this.showLoading();

    axios.post(endpoint, formData).then((res) => {
      console.log(res.data);
      this.setState({ lintData: res.data.reports });
      this.hideLoading();
    });
  }

  fileChanged(event) {
    this.setState({ selectedFile: event.target.files[0] });
    event.preventDefault();
  }

  showLoading() {
    document.getElementById('loader').style.display = 'block';
    document.getElementById('lintData').style.display = 'none';
  }

  hideLoading() {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('lintData').style.display = 'block';
  }

  renderlintData() {
    return (
      <div>
        {this.state.lintData.length > 0 && (
          <div className="container container-column">
            <h2>Lint Data - {this.state.selectedFile.name}</h2>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Severity</th>
                  <th>Line</th>
                  <th>Message</th>
                </tr>
              </thead>
              {this.state.lintData.map((lintObj, index) => (
                <tbody key={index}>
                  <tr
                    className={
                      lintObj.severity === 2
                        ? 'severity-err'
                        : lintObj.severity === 3
                        ? 'severity-warn'
                        : ''
                    }>
                    <td>{lintObj.severity}</td>
                    <td>
                      ({lintObj.line}, {lintObj.column})
                    </td>
                    <td>{lintObj.message}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        )}
      </div>
    );
  }

  render() {
    return (
      <div className="container max-height">
        <AuditFileUpload
          uploadClick={(file) => this.handleClick(file)}
          onFileChange={(event) => this.fileChanged(event)}
          file={this.state.selectedFile}
        />
        <div style={{ display: 'none' }} id="loader"></div>
        <div
          style={{ display: 'none' }}
          className="animate-bottom"
          id="lintData">
          {this.renderlintData()}
        </div>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
