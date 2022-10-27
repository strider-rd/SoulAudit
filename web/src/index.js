import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeComponent from './components/home/home-component';
import LintComponent from './components/lint/lint-component';
import NavComponent from './components/nav/nav-component';
import './style.css';
class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <NavComponent title="Soul Auditor"></NavComponent>
          <div className="px-4 my-5 text-center">
            <Routes>
              <Route path="/" element={<HomeComponent />} />
              <Route path="/lint" element={<LintComponent />} />
            </Routes>
          </div>
        </Router>
      </>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
