import React, { Component } from 'react';

import Directory from './Directory.jsx';
import { DocViewer } from './DocViewer.jsx';
import { GoogleAuthButton } from './GoogleAuthButton.jsx';
import { ResponsiveMessage } from './ResponsiveMessage.jsx';

import fetchApiDocument from './fetch-document';
import loadGoogleApi from './google-api';

import logo from './logo.png';
import './App.css';
import { SignOutButton } from './SignOutButton';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthorised: false,
      document: null,
    };

    loadGoogleApi().then((GoogleApi) => {
      this.setState({
        isAuthorised: GoogleApi.isSignedIn(),
      });

      GoogleApi.listenForSignIn(isAuthorised => this.setState({
        isAuthorised,
      }));
    });
  }

  async showDoc(document) {
    try {
      const GoogleApi = await loadGoogleApi();

      const doc = await fetchApiDocument(document, GoogleApi.getBearerToken());

      this.setState({
        document: doc,
      });
    } catch (error) {
      this.setState({
        document: null,
      });
    }
  }

  render() {
    const { document, isAuthorised } = this.state;

    return (
      <div className="App fullscreen">
        <header className="App-header">
          <div className="flex items-center m1 flex-auto justify-between">
            <div className="mx1 flex items-center">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">
                SpareDocs
              </h1>
            </div>
            <div className="flex items-center">
              { isAuthorised && <SignOutButton /> }
              <a href="https://www.netlify.com" className="flex">
                <img className="m1" src="https://www.netlify.com/img/global/badges/netlify-color-accent.svg" alt="netlify badge" style={{ maxHeight: '2.25rem' }} />
              </a>
            </div>
          </div>
          <div style={{ backgroundColor: '#eee' }}>
            <Directory disabled={!isAuthorised} onItemClick={url => this.showDoc(url)} />
          </div>
        </header>
        <div className={`${document ? '' : 'content-area'} doc-frame`} style={{ overflow: 'auto' }}>
          { isAuthorised
            ? <DocViewer doc={document} />
            : (
              <ResponsiveMessage>
                <p>
                  You must be signed in to view documentation
                </p>
                <div className="flex justify-center">
                  <GoogleAuthButton />
                </div>
              </ResponsiveMessage>
            )
          }
        </div>
      </div>
    );
  }
}

export default App;
