import React from 'react';
import { Container, Segment } from 'semantic-ui-react';
import { RedocStandalone } from 'redoc';
import { objectOf } from 'prop-types';

export const DocViewer = ({ doc }) => {
  if (!doc) {
    return (
      <Container>
        <Segment style={{ borderRadius: '.25rem', margin: '1rem auto' }}>
          <p>
            Select a document to see it here
          </p>
        </Segment>
      </Container>
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
