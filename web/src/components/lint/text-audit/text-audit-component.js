import axios from 'axios';
import React from 'react';

import Editor from '@monaco-editor/react';
import { hideLoader, showLoader } from '../../../helpers/loaders';

export class TextAuditComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textData:
        '  function transferTo(address to, uint amount) public {\n    require(tx.origin == owner);\n    to.call.value(amount)();\n  }',
      hasError: false,
      darkThemeEnabled: true,
    };
  }

  handleClick() {
    this.setState({ hasError: false });
    if (this.state.textData === '' || undefined || null) {
      this.setState({ hasError: true });
      return;
    }
    const endpoint = 'http://localhost:8000/api/textAudit';
    var requestObj = {
      solCode: this.state.textData,
    };
    showLoader();

    axios.post(endpoint, requestObj).then(
      (res) => {
        console.log(res.data);
        this.props.polulateData(res.data.reports);
      },
      (error) => {
        this.setState({ hasError: true });
        hideLoader(true);
      },
    );
  }

  textChanged = (value, event) => {
    this.setState({ textData: value });
  };

  editorThemeChange = (event) => {
    if (event.target.checked === true) {
      this.setState({ editorTheme: 'vs-dark', darkThemeEnabled: true });
    } else this.setState({ editorTheme: 'light', darkThemeEnabled: false });
  };

  render() {
    return (
      <>
        {/* <textarea
          className="form-control sol-code-area"
          placeholder="Enter solidity code here"
          value={this.state.textData}
          onChange={this.textChanged}
          spellCheck="false"></textarea> */}
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            checked={this.state.darkThemeEnabled}
            onChange={this.editorThemeChange}
          />
          <label className="form-check-label" for="flexSwitchCheckDefault">
            Dark Theme
          </label>
        </div>

        <Editor
          className="sol-code-area"
          defaultLanguage="sol"
          defaultValue={this.state.textData}
          onChange={this.textChanged}
          theme={this.state.darkThemeEnabled ? 'vs-dark' : 'light'}
          options={{ minimap: { enabled: false }, fontSize: 18 }}
        />
        {this.state.hasError && (
          <span className="text-danger">Something wrong with entered code</span>
        )}
        <button className="btn btn-primary" onClick={() => this.handleClick()}>
          Audit code
        </button>
      </>
    );
  }
}
