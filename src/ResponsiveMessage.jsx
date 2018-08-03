import React from 'react';
import { Container, Segment } from 'semantic-ui-react';
import { node } from 'prop-types';

export const ResponsiveMessage = ({ children }) => (
  <Container>
    <Segment style={{ borderRadius: '.25rem', margin: '1rem auto' }}>
      <p>
        {children}
      </p>
    </Segment>
  </Container>
);

ResponsiveMessage.propTypes = {
  children: node,
};

ResponsiveMessage.defaultProps = {
  children: null,
};

export default ResponsiveMessage;
