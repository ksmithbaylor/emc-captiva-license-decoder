import React from 'react';
import { processLicense } from 'processor';
import { processingDelay } from 'data/constants';

let fileReader;

// TODO: import only what's needed from React and other packages
export default class FileHandler extends React.Component {
  render() {
    return (
      <input type="file" onChange={this.onChange} style={fileInputStyle} />
    );
  }

  componentDidMount() {
    fileReader = new FileReader();
    fileReader.addEventListener('load', this.handleNewFile);
  }

  componentWillUnmount() {
    fileReader.removeEventListener('load', this.handleNewFile);
  }

  onChange = (event) => {
    if (event.target.files[0]) {
      fileReader.readAsText(event.target.files[0])
    }
  }

  handleNewFile = (event) => {
    setTimeout((() => (
      this.props.requestResults(
        processLicense(event.target.result)
      )
    )), processingDelay)
  }
}

const fileInputStyle = {
  opacity: 0,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  cursor: 'pointer',
  position: 'absolute',
  width: '100%'
};
