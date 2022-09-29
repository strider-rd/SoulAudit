import axios from 'axios';
import React from 'react';
import { hideLoader, showLoader } from '../../helpers/loaders';

export class TextAuditComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textData: '',
      hasError: false,
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
        hideLoader();
      },
    );
  }

  textChanged = (e) => {
    this.setState({ textData: e.target.value });
  };

  render() {
    return (
      <div className="d-flex flex-column">
        <textarea
          className="form-control"
          placeholder="Enter solidity code here"
          value={this.state.textData}
          onChange={this.textChanged}></textarea>
        {this.state.hasError && (
          <span className="error-text">Something wrong with entered code</span>
        )}
        <button className="btn btn-primary" onClick={() => this.handleClick()}>
          Audit code
        </button>
      </div>
    );
  }
}
