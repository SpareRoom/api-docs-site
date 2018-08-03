import React, { PureComponent } from 'react';

import loadGoogleApi from './google-api';

function* idGenerator() {
  let nextId = 0;
  while (true) {
    yield nextId += 1;
  }
}

const generator = idGenerator();

export class GoogleAuthButton extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      id: GoogleAuthButton.getNextId(),
    };
  }

  async componentDidMount() {
    const GoogleApi = await loadGoogleApi();

    GoogleApi.renderSigninButton(this.signInId);
  }

  get signInId() {
    const { id } = this.state;

    return `SignInOut${id}`;
  }

  static getNextId() {
    return generator.next().value;
  }

  render() {
    return <span id={this.signInId} />;
  }
}

export default GoogleAuthButton;
