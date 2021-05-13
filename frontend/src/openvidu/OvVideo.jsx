import React, { Component } from 'react';
import styled from 'styled-components';

export default class OpenViduVideoComponent extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidUpdate(props) {
    if (props && !!this.videoRef) {
      this.props.streamManager.addVideoElement(this.videoRef.current);
    }
  }

  componentDidMount() {
    if (this.props && !!this.videoRef) {
      this.props.streamManager.addVideoElement(this.videoRef.current);
    }
  }

  render() {
    const isSpeak = this.props.isSpeak;
    return <V.Video autoPlay={true} ref={this.videoRef} isSpeak={isSpeak} />;
  }
}

const V = {
  Video: styled.video`
    width: 100%;
    height: auto;
    border: ${(props) => (props.isSpeak ? '6px solid #56acf3' : 'None')};
    border-radius: 15px;
    margin: 0;
    padding: 0;
  `,
};
