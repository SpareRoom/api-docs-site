import React, { Component } from 'react';
import { get, startCase } from 'lodash';
import { func } from 'prop-types';
import { Select } from '../node_modules/semantic-ui-react';

const fetchDocs = async () => {
  try {
    const res = await fetch(process.env.REACT_APP_DOCS_URL);

    return res.json();
  } catch (error) {
    return [];
  }
};

const parseDocText = docText => docText
  .replace('.json', '')
  .split('@');

export default class Directory extends Component {
  async componentDidMount() {
    let docsList = await fetchDocs();

    docsList = docsList
      .map(([text, url]) => [
        parseDocText(text),
        url,
      ])
      .reduce((acc, [[name, version], url]) => {
        if (!acc[name]) acc[name] = [];

        acc[name].push([version, url]);

        return acc;
      }, {});

    this.setState({
      docs: docsList,
    });
  }

  static get propTypes() {
    return {
      onItemClick: func.isRequired,
    };
  }

  get availableDocs() {
    return Object.keys(get(this.state, 'docs', {}));
  }

  get availableVersions() {
    const { docs, selectedDoc } = this.state || {};

    return get(docs, selectedDoc, []);
  }

  setSelectedVersion(url) {
    this.setState({ selectedVersion: url });

    const { onItemClick } = this.props;

    if (onItemClick) onItemClick(url);
  }

  setSelectedDoc(doc) {
    this.setState({
      selectedDoc: doc,
      selectedVersion: '',
    });
  }

  render() {
    const { docs, selectedDoc, selectedVersion } = this.state || {};

    return (
      <div>
        <Select
          className="m1"
          disabled={!docs}
          value={selectedDoc}
          placeholder="Choose a doc..."
          onChange={(_, { value: doc }) => this.setSelectedDoc(doc)}
          options={
            this.availableDocs.map(doc => ({ key: doc, text: startCase(doc), value: doc }))
          }
        />
        <Select
          className="m1"
          disabled={!selectedDoc}
          value={selectedVersion}
          placeholder="Select version..."
          onChange={(_, { value: version }) => { this.setSelectedVersion(version); }}
          options={
            this.availableVersions
              .map(([text, url]) => ({ key: text, text: startCase(text), value: url }))
          }
        />
      </div>
    );
  }
}
