import { objectOf } from 'prop-types';
import React from 'react';
import { RedocStandalone } from 'redoc';

import { ResponsiveMessage } from './ResponsiveMessage.jsx';

export const DocViewer = ({ doc }) => {
  if (!doc) {
    return (
      <ResponsiveMessage>
        Select a document to see it here
      </ResponsiveMessage>
    );
  }

  return <RedocStandalone spec={doc} />;
};

DocViewer.propTypes = {
  doc: objectOf(() => true),
};

DocViewer.defaultProps = {
  doc: null,
};

export default DocViewer;
