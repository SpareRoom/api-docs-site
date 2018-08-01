import React, { Component } from 'react';
import { RedocStandalone } from 'redoc'

import { Directory } from './Directory'

import logo from './logo.png';
import './App.css';

class App extends Component {
  showDoc(url) {
    this.setState({
      docUrl: url
    })
  }

  render() {
    const { docUrl } = this.state || {};

    return (
      <div className="App fullscreen">
        <header className="App-header">
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">SpareDocs</h1>
          </span>
          <Directory onItemClick={url => this.showDoc(url)} />
        </header>
        { docUrl ? 
        <RedocStandalone className="doc-frame border-none" specUrl={docUrl} />
        :
        <p>Select a document to see it here</p>
        }
      </div>
    );
  }
}

export default App;
