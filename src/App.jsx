import { RedocStandalone } from 'redoc';
import React, { Component } from 'react';
import { Segment, Container } from 'semantic-ui-react';

import Directory from './Directory.jsx';

import logo from './logo.png';
import './App.css';

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
        <header className="App-header p1">
          <span className="flex items-center m1">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">
              SpareDocs
            </h1>
            <a href="https://www.netlify.com" className="flex">
              <img src="https://www.netlify.com/img/global/badges/netlify-color-accent.svg" alt="netlify badge" style={{ maxHeight: '2.25rem', marginLeft: '2rem' }} />
            </a>
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
