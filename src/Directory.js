import React, { Component } from 'react'
import { textInputs } from '../node_modules/polished';

const fetchDocs = async () => {
  const res = await fetch('https://us-central1-spareroom-development-tools.cloudfunctions.net/listDocumentation');

  return res.json();
}

export class Directory extends Component {
  async componentDidMount() {
    const docsList = await fetchDocs();

    this.setState({
      docs: docsList
    })
  }

  render() {
    const { docs } = this.state || {};

    if(!docs) return <p>Loading...</p>

    const { onItemClick } = this.props;

    return (
      <ul>
        { docs.map(([ text, url ]) => <li key={text}><a onClick={() => onItemClick(url)}>{text}</a></li>) }
      </ul>
    )
  }
}
