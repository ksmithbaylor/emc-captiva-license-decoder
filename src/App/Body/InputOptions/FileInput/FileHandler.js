import React from 'react';
import { processLicense } from 'processor';

export default class FileHandler extends React.Component {
  render() {
    return (
      <input
        type="file"
        onChange={this.onChange}
        style={invisibleFileInputStyle}
      />
    );
  }

  componentDidMount() {
    this.fileReader = new FileReader();
    this.fileReader.addEventListener('load', this.handleNewFile);
  }

  componentWillUnmount() {
    this.fileReader.removeEventListener('load', this.handleNewFile);
  }

  onChange = (event) => {
    if (event.target.files[0]) {
      this.fileReader.readAsText(event.target.files[0])
    }
  }

  handleNewFile = (event) => {
    // TODO: make timeout a constant
    setTimeout((() => (
      this.props.requestResults(
        processLicense(event.target.result)
      )
    )), 200)
  }
}

const invisibleFileInputStyle = {
  opacity: 0,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  cursor: 'pointer',
  position: 'absolute',
  width: '100%'
};
