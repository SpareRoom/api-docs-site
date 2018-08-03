import React, { PureComponent, Fragment } from 'react';
import { Button } from 'semantic-ui-react';

import loadGoogleApi from './google-api';

const { gapi } = window;

let user;

function* idGenerator() {
  let nextId = 0;
  while (true) {
    yield nextId += 1;
  }
}

const generator = idGenerator();

export class GoogleAuthButton extends PureComponent {
  static async handleAuthClick() {
    const GoogleApi = await loadGoogleApi();

    if (GoogleApi.isSignedIn()) {
      // User is authorized and has clicked 'Sign out' button.
      GoogleApi.signOut();
    } else {
      // User is not signed in. Start Google auth flow.
      GoogleApi.signIn();
    }
  }

  static async revokeAccess() {
    const GoogleApi = await loadGoogleApi();

    GoogleApi.revokeAccess();
  }

  static async signOut() {
    const GoogleApi = await loadGoogleApi();

    GoogleApi.signOut();
  }

  constructor(props) {
    super(props);

    this.state = {
      id: GoogleAuthButton.getNextId(),
      signedIn: false,
    };
  }

  async componentDidMount() {
    const GoogleApi = await loadGoogleApi();

    GoogleApi.listenForSignIn((signedIn => this.onSigninChange(signedIn)));

    GoogleAuthButton.user = GoogleApi.getCurrentUser();

    this.onSigninChange(true);

    gapi.signin2.render(this.signInId, {
      onsuccess: GoogleAuthButton.onSignIn,
    });
  }

  onSigninChange(signedIn) {
    this.setState({
      signedIn,
    });
  }

  static get user() {
    return user;
  }

  get signInId() {
    const { id } = this.state;

    return `SignInOut${id}`;
  }

  get revokeAccessId() {
    const { id } = this.state;

    return `RevokeAccess${id}`;
  }

  static set user(newUser) {
    window.user = newUser;
    user = newUser;
  }

  static getNextId() {
    return generator.next().value;
  }

  render() {
    const { signedIn } = this.state;
    return (
      <div className="flex items-center">
        <span id={this.signInId} />
        { signedIn && (
          <Fragment>
            <Button onClick={GoogleAuthButton.signOut}>
              Sign Out
            </Button>
            <Button color="red" className="mx2" id={this.revokeAccessId} onClick={GoogleAuthButton.revokeAccess}>
              Revoke Access
            </Button>
          </Fragment>
        )
        }
      </div>
    );
  }
}

export default GoogleAuthButton;
