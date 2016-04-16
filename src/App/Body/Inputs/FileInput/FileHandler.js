import React from 'react';
import { processLicenseFile } from 'util';
import { processingDelay } from 'data/constants';

let fileReader;

export default class FileHandler extends React.Component {
  static propTypes = {
    requestResults: React.PropTypes.func
  };

  render() {
    return (
      <input type="file" onChange={this.onChange} style={style.fileInput} />
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
      fileReader.readAsText(event.target.files[0]);
    }
  };

  handleNewFile = (event) => {
    setTimeout(() => {
      this.props.requestResults(
        processLicenseFile(event.target.result)
      );
    }, processingDelay);
  };
}

const style = {
  fileInput: {
    opacity: 0,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    cursor: 'pointer',
    position: 'absolute',
    width: '100%',
    zIndex: 999
  }
};
