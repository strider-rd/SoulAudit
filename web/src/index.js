import React from 'react';
import ReactDOM from 'react-dom/client';
import FileUpload from './file-upload.js';
import './style.css';

class App extends React.Component {
  state = {
    selectedFile: null,
  };

  handleClick() {
    console.log('Clicked');
  }

  fileChanged(event) {
    console.log(event.target.files[0]);
    this.setState({ selectedFile: event.target.files[0].name });
  }

  fileData() {
    return this.render;
  }

  render() {
    return (
      <div className="max-height">
        <FileUpload
          uploadClick={() => this.handleClick()}
          onFileChange={(event) => this.fileChanged(event)}
          fileName={this.state.selectedFile}
        />
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
