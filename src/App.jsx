import { RedocStandalone } from 'redoc';
import React, { Component } from 'react';

import Directory from './Directory.jsx';

import logo from './logo.png';
import 'semantic-ui-css/semantic.css';
import './App.css';
import {
  Segment, Container,
} from '../node_modules/semantic-ui-react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  showDoc(url) {
    this.setState({
      docUrl: url,
    });
  }

  render() {
    const { docUrl } = this.state;

    return (
      <div className="App fullscreen">
        <header className="App-header">
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">
              SpareDocs
            </h1>
          </span>
          <Directory onItemClick={url => this.showDoc(url)} />
        </header>
        <div className={`${docUrl ? '' : 'content-area'} doc-frame`} style={{ overflow: 'auto' }}>
          { docUrl
            ? <RedocStandalone specUrl={docUrl} />
            : (
              <Container>
                <Segment style={{ borderRadius: '.25rem', margin: '1rem auto' }}>
                  <p>
                    Select a document to see it here
                  </p>
                </Segment>
              </Container>
            )
          }
        </div>
      </div>
    );
  }
}

export default App;
