import { Button } from 'semantic-ui-react';
import React from 'react';
import loadGoogleApi from './google-api';

const signOut = async () => {
  const GoogleApi = await loadGoogleApi();

  GoogleApi.signOut();
};

export const SignOutButton = () => (
  <Button onClick={signOut}>
    Sign Out
  </Button>
);

export default SignOutButton;
