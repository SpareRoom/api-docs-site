import { Button, Icon } from 'semantic-ui-react';
import React from 'react';
import loadGoogleApi from './google-api';

const signOut = async () => {
  const GoogleApi = await loadGoogleApi();

  GoogleApi.signOut();
};

export const SignOutButton = () => (
  <Button color="linkedin" onClick={signOut}>
    <Icon name="google" />
    Sign Out
  </Button>
);

export default SignOutButton;
