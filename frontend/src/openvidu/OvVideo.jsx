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
    return <V.Video autoPlay={true} ref={this.videoRef} />;
  }
}

const V = {
  Video: styled.video`
    width: 100%;
    height: auto;
    border-radius: 20px;
    margin: 0;
    padding: 0;
  `,
};
