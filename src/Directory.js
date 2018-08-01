import React, { Component } from 'react'
import { get } from 'lodash'

const fetchDocs = async () => {
  const res = await fetch('https://us-central1-spareroom-development-tools.cloudfunctions.net/listDocumentation');

  return res.json();
}

const parseDocText = docText => docText
  .replace('.json', '')
  .split('@')

export class Directory extends Component {
  async componentDidMount() {
    let docsList = await fetchDocs();

    docsList = docsList.map(([text, url]) => [
      parseDocText(text),
      url
    ])
    .reduce((acc, [ [name, version], url ]) => {
      if(!acc[name]) acc[name] = [];

      acc[name].push([ version, url ]);

      return acc;
    }, {})

    this.setState({
      docs: docsList
    })
  }

  get availableDocs() {
    return Object.keys(get(this.state, 'docs', {}))
  }

  get availableVersions() {
    const { docs, selectedDoc } = this.state || {};

    return get(docs, selectedDoc, []);
  }

  setSelectedVersion(url) {
    this.setState({ selectedVersion: url })

    const { onItemClick } = this.props;

    if(onItemClick) onItemClick(url);
  }

  setSelectedDoc(doc) {
    console.log('hit', doc);
    
    this.setState({
      selectedDoc: doc,
      selectedVersion: ''
    })
  }

  render() {
    const { docs, selectedDoc, selectedVersion } = this.state || {};

    return (
      <div>
        <select disabled={!docs} value={selectedDoc} onChange={({ target }) => this.setSelectedDoc(target.value)}>
          <option>Choose a doc...</option>
          { this.availableDocs.map(doc => <option key={doc}>{doc}</option>) }
        </select>
        <select disabled={!selectedDoc} value={selectedVersion} onChange={({ target }) => { this.setSelectedVersion(target.value) }}>
          <option>Select version...</option>
          { this.availableVersions.map(([ text, url ]) => <option key={text} value={url}>{text}</option>) }
        </select>
      </div>
    )
  }
}
