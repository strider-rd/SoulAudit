import axios from 'axios';
import React from 'react';
import { hideLoader, showLoader } from '../../../helpers/loaders';

export class GitAuditComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gitRepoUrl: '',
      filesData: [],
    };
  }

  setRepoUrl = (e) => {
    this.setState({ gitRepoUrl: e.target.value });
  };

  getGitData = () => {
    const extractedString = this.extractGitHubRepoPath(this.state.gitRepoUrl);
    const baseUrl = `https://api.github.com/search/code?q=extension:sol+repo:${extractedString}`;
    showLoader();
    axios.get(baseUrl).then(
      (res) => {
        const innerData = [];
        res.data.items.map((item) =>
          innerData.push({ name: item.name, gitUrl: item.git_url }),
        );
        this.setState({ filesData: innerData });
        hideLoader();
      },
      (reject) => {
        hideLoader();
        console.error(reject);
      },
    );
  };

  extractGitHubRepoPath(url) {
    if (!url) return null;
    const match = url.match(
      /^https?:\/\/(www\.)?github.com\/(?<owner>[\w.-]+)\/(?<name>[\w.-]+)/,
    );
    if (!match || !(match.groups?.owner && match.groups?.name)) return null;
    return `${match.groups.owner}/${match.groups.name}`;
  }

  getAuditData(fileName, fileCode) {
    const endpoint = 'http://localhost:8000/api/textAudit';
    var requestObj = {
      solCode: fileCode,
    };
    showLoader();

    axios.post(endpoint, requestObj).then(
      (res) => {
        this.props.polulateData({ fileName: fileName, data: res.data.reports });
      },
      (error) => {
        hideLoader();
      },
    );
  }

  auditGitFile = (fileName, gitUrl) => {
    showLoader();
    axios.get(gitUrl).then(
      (res) => {
        hideLoader();
        const encodedContent = res.data.content;
        var decodedContent = atob(encodedContent);
        this.getAuditData(fileName, decodedContent);
      },
      (reject) => console.error(reject),
    );
  };

  render() {
    return (
      <>
        <div className="d-flex flex-column flex-gap">
          <input
            className="form-control"
            placeholder="Git Repo Url"
            value={this.state.gitRepoUrl}
            onChange={this.setRepoUrl}></input>
          <button className="btn btn-primary" onClick={this.getGitData}>
            Get Git Data
          </button>
          <div>
            {this.state.filesData.length > 0 &&
              this.state.filesData.map((item, index) => (
                <ul key={index}>
                  <li>
                    <h2>
                      {item.name}{' '}
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          this.auditGitFile(item.name, item.gitUrl)
                        }>
                        Lint this file
                      </button>
                    </h2>
                  </li>
                </ul>
              ))}
          </div>
        </div>
      </>
    );
  }
}
