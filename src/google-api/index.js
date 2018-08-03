import { memoize } from 'lodash';

const { gapi } = window;

const SCOPE = 'https://www.googleapis.com/auth/devstorage.read_only';

const docs = 'https://www.googleapis.com/discovery/v1/apis/storage/v1/rest';

export default memoize(async () => {
  await new Promise((resolve) => {
    gapi.load('client:auth2', resolve);
  });

  await gapi.client.init({
    // apiKey: 'YOUR_API_KEY',
    discoveryDocs: [docs],
    clientId: process.env.REACT_APP_CLIENT_ID,
    scope: SCOPE,
  });

  const GoogleAuth = await gapi.auth2.getAuthInstance();

  return {
    listenForSignIn: listener => GoogleAuth.isSignedIn.listen(listener),
    getCurrentUser: () => GoogleAuth.currentUser.get(),
    signIn: () => GoogleAuth.signIn(),
    signOut: () => GoogleAuth.signOut(),
    revokeAccess: () => GoogleAuth.disconnect(),
    isSignedIn: () => GoogleAuth.isSignedIn.get(),
  };
});
