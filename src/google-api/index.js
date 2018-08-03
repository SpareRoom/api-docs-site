import { memoize } from 'lodash';

const { gapi } = window;

const SCOPE = 'https://www.googleapis.com/auth/devstorage.read_only';

const docs = 'https://www.googleapis.com/discovery/v1/apis/storage/v1/rest';

const buildApi = (GoogleAuth) => {
  const getCurrentUser = () => GoogleAuth.currentUser.get();

  const getBearerToken = () => {
    const currentUser = getCurrentUser();

    if (!currentUser) return '';

    return currentUser.getAuthResponse().access_token;
  };

  return {
    isSignedIn: () => GoogleAuth.isSignedIn.get(),
    listenForSignIn: listener => GoogleAuth.isSignedIn.listen(listener),
    revokeAccess: () => GoogleAuth.disconnect(),
    signIn: () => GoogleAuth.signIn(),
    signOut: () => GoogleAuth.signOut(),
    getBearerToken,
    getCurrentUser,
    renderSigninButton: (id, options) => gapi.signin2.render(id, options),
  };
};

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

  return buildApi(GoogleAuth);
});
