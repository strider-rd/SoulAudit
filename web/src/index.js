import React from 'react';
import ReactDOM from 'react-dom/client';
import { FileAuditComponent } from './components/file-audit/file-audit-component';
import { TextAuditComponent } from './components/text-audit/text-audit-component';
import { hideLoader } from './helpers/loaders';
import './style.css';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auditor: '',
      lintData: [],
    };
  }

  selectAuditor() {
    var value = document.getElementById('auditor').value;
    console.log(value);
    this.setState({ auditor: value, lintData: [] });
  }

  populateLintData(data) {
    this.setState({ lintData: data });
    hideLoader();
  }

  renderlintData() {
    return (
      <div>
        {this.state.lintData.length > 0 && (
          <div className="container container-column">
            <h2>Lint Data</h2>
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
      <div className="container">
        <select
          className="auditor-select"
          name="auditor"
          id="auditor"
          onChange={() => this.selectAuditor()}>
          <option value={''}>How do you want to edit?</option>
          <option value={'File'}>Upload file to audit</option>
          <option value={'Text'}>Enter code to audit</option>
        </select>
        {this.state.auditor === 'File' && (
          <FileAuditComponent
            polulateData={(data) =>
              this.populateLintData(data)
            }></FileAuditComponent>
        )}
        {this.state.auditor === 'Text' && (
          <TextAuditComponent
            polulateData={(data) =>
              this.populateLintData(data)
            }></TextAuditComponent>
        )}
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
