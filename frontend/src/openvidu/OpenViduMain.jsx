import React, { Component } from 'react';
import { OpenVidu } from 'openvidu-browser';
import styled from 'styled-components';
import axios from 'axios';
import { Scrollbars } from 'react-custom-scrollbars-2';

// Icons
import { BiExit } from 'react-icons/bi';
import { GoScreenFull } from 'react-icons/go';
import { RiFullscreenExitLine } from 'react-icons/ri';

// 컴포넌트
import UserVideoComponent from './UserVideoComponent';

// OpenVidu Server
const OPENVIDU_SERVER_URL = process.env.REACT_APP_OPENVIDU_SERVER_URL;
const OPENVIDU_SERVER_SECRET = process.env.REACT_APP_OPENVIDU_SERVER_SECRET;

export default class OpenViduMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mySessionId: props.pinNumber,
      myUserName: localStorage.getItem('nickName')
        ? localStorage.getItem('nickName')
        : 'Participant' + Math.floor(Math.random() * 100),
      session: undefined,
      mainStreamManager: undefined,
      publisher: undefined,
      subscribers: [],
      isInsertMode: false,
      isSpeackList: [],
      isFullScreen: false,
    };
    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.fullScreenHandler = this.fullScreenHandler.bind(this);
  }
  // react hooks
  componentDidMount() {
    window.addEventListener('beforeunload', this.onbeforeunload);
    window.addEventListener('popstate', this.onbeforeunload);
  }

  componentWillUnmount() {
    this.onbeforeunload();
    window.removeEventListener('beforeunload', this.onbeforeunload);
    window.removeEventListener('popstate', this.onbeforeunload);
  }

  // 함수들
  onbeforeunload(event) {
    this.leaveSession();
  }

  handleChangeSessionId(e) {
    this.setState({
      mySessionId: e.target.value,
    });
  }

  handleChangeUserName(e) {
    this.setState({
      myUserName: e.target.value,
    });
  }

  handleMainVideoStream(stream) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream,
      });
    }
  }

  deleteSubscriber(streamManager) {
    let subscribers = this.state.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({
        subscribers: subscribers,
      });
    }
  }

  // 세션에 참가하는 함수
  joinSession() {
    this.OV = new OpenVidu();
    this.OV.setAdvancedConfiguration({
      publisherSpeakingEventsOptions: {
        interval: 100, // Frequency of the polling of audio streams in ms (default 100)
        threshold: -50, // Threshold volume in dB (default -50)
      },
    });
    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        var mySession = this.state.session;
        mySession.on('streamCreated', (event) => {
          var subscriber = mySession.subscribe(event.stream, undefined);
          var subscribers = this.state.subscribers;
          subscribers.push(subscriber);
          this.setState({
            subscribers: subscribers,
          });
        });

        mySession.on('publisherStartSpeaking', (event) => {
          let temp = this.state.isSpeackList;
          temp.push(event.connection.connectionId);
          this.setState({
            isSpeackList: temp,
          });
        });

        mySession.on('publisherStopSpeaking', (event) => {
          let temp = this.state.isSpeackList;
          let index = temp.indexOf(event.connection.connectionId, 0);
          if (index > -1) {
            temp.splice(index, 1);
            this.setState({
              isSpeackList: temp,
            });
          }
        });

        mySession.on('streamDestroyed', (event) => {
          this.deleteSubscriber(event.stream.streamManager);
        });
        this.getToken().then((token) => {
          mySession
            .connect(token, { clientData: this.state.myUserName })
            .then(() => {
              let publisher = this.OV.initPublisher(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: undefined, // The source of video. If undefined default webcam
                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                resolution: '480x320', // The resolution of your video
                frameRate: 60, // The frame rate of your video
                insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                mirror: true, // Whether to mirror your local video or not
              });
              publisher.on('publisherStartSpeaking', (event) => {});

              mySession.publish(publisher);
              this.setState({
                mainStreamManager: publisher,
                publisher: publisher,
              });
            })
            .catch(() => {});
        });
      },
    );
    const videoContainer = document.getElementById('videoContainer');
    videoContainer.addEventListener('fullscreenchange', (event) => {
      if (document.fullscreenElement) {
        this.setState({
          isFullScreen: true,
        });
      } else {
        this.setState({
          isFullScreen: false,
        });
      }
    });
  }

  // 세션에서 나가는 함수 언마운트
  leaveSession() {
    const videoContainer = document.getElementById('videoContainer');
    videoContainer.removeEventListener('fullscreenchange', (event) => {
      if (document.fullscreenElement) {
        this.setState({
          isFullScreen: true,
        });
      } else {
        this.setState({
          isFullScreen: false,
        });
      }
    });
    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: this.props.pinNumber,
      myUserName: localStorage.getItem('nickName')
        ? localStorage.getItem('nickName')
        : 'Participant' + Math.floor(Math.random() * 100),
      mainStreamManager: undefined,
      publisher: undefined,
      isInsertMode: false,
      isSpeackList: [],
      isFullScreen: false,
    });
  }

  fullScreenHandler() {
    const videoContainer = document.getElementById('videoContainer');
    if (!document.fullscreenElement) {
      this.setState({
        isFullScreen: true,
      });
      videoContainer.requestFullscreen().catch((err) => {
        alert(
          `Error attempting to enable full-screen mode2: ${err.message} (${err.name})`,
        );
      });
    } else {
      document.exitFullscreen();
      this.setState({
        isFullScreen: false,
      });
    }
  }

  render() {
    return (
      <Main.wrapper isMode={this.props.isToggle} id="videoContainer">
        <Main.insertModeWrapper onClick={this.props.setIsToggle}>
          <Main.Icon>{this.props.isToggle ? '>' : '<'}</Main.Icon>
        </Main.insertModeWrapper>
        {this.state.session === undefined ? (
          <WaitingRoom.container>
            <WaitingRoom.button onClick={this.joinSession}>
              CO-FIX Live
            </WaitingRoom.button>
            {/* <WaitingRoom.button onClick={this.test}>
              Live Co-Fix Popup
            </WaitingRoom.button> */}
          </WaitingRoom.container>
        ) : null}

        {this.state.session !== undefined ? (
          <Session.container>
            <Session.header>
              <Header.title>{this.props.roomTitle}</Header.title>
              <Header.buttonWrapper>
                <Header.fullButton onClick={this.fullScreenHandler}>
                  {!this.state.isFullScreen ? (
                    <Header.fullIcon />
                  ) : (
                    <Header.exitfullIcon />
                  )}
                </Header.fullButton>
                <Header.leaveButton onClick={this.leaveSession}>
                  <Header.Icon />
                </Header.leaveButton>
              </Header.buttonWrapper>
            </Session.header>
            {/* {this.state.mainStreamManager !== undefined ? (
              <Session.streamContainer>
                <UserVideoComponent
                  streamManager={this.state.mainStreamManager}
                  isPublisher={false}
                  isSpeak={'Main'}
                />
              </Session.streamContainer>
            ) : null} */}
            <Session.videoContainer>
              <Scrollbars style={{ width: '100%', height: '100%' }}>
                <Session.gridBox isFullScreen={this.state.isFullScreen}>
                  {this.state.publisher !== undefined ? (
                    <Session.streamContainer
                      onClick={() =>
                        this.handleMainVideoStream(this.state.publisher)
                      }
                    >
                      <UserVideoComponent
                        streamManager={this.state.publisher}
                        isPublisher={true}
                        isSpeak={'Main'}
                      />
                    </Session.streamContainer>
                  ) : null}

                  {this.state.subscribers.map((sub, i) => (
                    <Session.streamContainer
                      key={i}
                      onClick={() => this.handleMainVideoStream(sub)}
                    >
                      <UserVideoComponent
                        streamManager={sub}
                        isPublisher={false}
                        isSpeak={this.state.isSpeackList.includes(
                          sub.stream.connection.connectionId,
                        )}
                      />
                    </Session.streamContainer>
                  ))}
                </Session.gridBox>
              </Scrollbars>
            </Session.videoContainer>
          </Session.container>
        ) : null}
      </Main.wrapper>
    );
  }

  // ===========OpenVidu Server 관련 함수========================
  getToken() {
    return this.createSession(this.state.mySessionId).then((sessionId) =>
      this.createToken(sessionId),
    );
  }

  createSession(sessionId) {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
          headers: {
            Authorization:
              'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          resolve(response.data.id);
        })
        .catch((response) => {
          var error = Object.assign({}, response);
          if (error.response.status === 409) {
            resolve(sessionId);
          } else {
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  OPENVIDU_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  OPENVIDU_SERVER_URL +
                  '"',
              )
            ) {
              window.location.assign(
                OPENVIDU_SERVER_URL + '/accept-certificate',
              );
            }
          }
        });
    });
  }

  createToken(sessionId) {
    return new Promise((resolve, reject) => {
      var data = {};
      axios
        .post(
          OPENVIDU_SERVER_URL +
            '/openvidu/api/sessions/' +
            sessionId +
            '/connection',
          data,
          {
            headers: {
              Authorization:
                'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
              'Content-Type': 'application/json',
            },
          },
        )
        .then((response) => {
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  }
}

// styled-components
const Main = {
  wrapper: styled.div`
    position: absolute;
    right: 0;
    top: 0;
    width: 20%;
    height: 100%;
    box-shadow: rgba(149, 157, 165, 0.7) 0px 8px 24px;
    border-radius: 20px;
    /* margin-right: 15px; */
    background-color: #f4f4f4;
    z-index: 2;
    transition: all 0.7s ease-in-out;
    transform: ${(props) =>
      !props.isMode ? 'translateX(95%)' : 'translateX(0%)'};
  `,
  insertModeWrapper: styled.div`
    cursor: pointer;
    position: absolute;
    left: -10%;
    top: 46%;
    width: 10%;
    height: 8%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: -4px 3px 8px 0px rgba(149, 157, 165, 0.5);
    border-radius: 10px 0px 0px 10px;
    z-index: 1;
    background-color: #f4f4f4;
    &:hover {
      background-color: #ebe9e9;
    }
  `,
  Icon: styled.div`
    font-size: 24px;
    font-weight: bold;
  `,
};

const WaitingRoom = {
  container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    z-index: 50;
  `,
  button: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px;
    width: fit-content;
    height: fit-content;
    background: linear-gradient(to bottom, #fef9d7, #d299c2);
    box-shadow: 3px 3px 6px 3px rgba(100, 50, 20, 0.3);
    border-radius: 15px;
    font-weight: bold;
    font-family: 'S-CoreDream-5Medium';
    font-size: 21px;
    padding: 15px 30px;
    &:hover {
      background: linear-gradient(to bottom, #fffdeb, #c79bbb);
    }
  `,
};
const Session = {
  container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: baseline;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 10px;
  `,
  header: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    height: 5%;
    margin: 0px;
  `,
  videoContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;
    width: 100%;
    height: 95%;
    background-color: transparent;
    overflow: hidden;
  `,
  gridBox: styled.div`
    display: grid;
    grid-template-columns: ${({ isFullScreen }) =>
      isFullScreen ? 'repeat(3, 1fr)' : '1fr'};
    grid-row-start: 1;
    grid-gap: 0.5rem;
    margin: 0;
    padding: 0;
    /* box-sizing: border-box; */
  `,
  streamContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 0px 0px;
    width: 100%;
    height: auto;
    min-width: 300px;
  `,
};

const Header = {
  title: styled.div`
    line-height: 50px;
    font-size: 20px;
    height: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 65%;
  `,
  buttonWrapper: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 35px;
  `,
  leaveButton: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    background-color: transparent;
    box-shadow: 2px 2px 6px 2px rgba(100, 50, 20, 0.3);
    border-radius: 50%;
    font-weight: bold;
    font-family: 'S-CoreDream-5Medium';
    font-size: 16px;
    background-color: #e60e0e;
    color: #ffffff;
    &:hover {
      background-color: #da1717;
    }
  `,
  fullButton: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    width: 35px;
    height: 35px;
    background-color: transparent;
    box-shadow: 2px 2px 6px 2px rgba(100, 50, 20, 0.3);
    border-radius: 50%;
    font-weight: bold;
    font-family: 'S-CoreDream-5Medium';
    font-size: 16px;
    background-color: #ffffff;
    color: #ffffff;
    &:hover {
      background-color: #d1d1d1;
    }
  `,
  fullIcon: styled(GoScreenFull)`
    width: 22px;
    height: 22px;
    color: #000000;
  `,
  exitfullIcon: styled(RiFullscreenExitLine)`
    width: 22px;
    height: 22px;
    color: #000000;
  `,
  Icon: styled(BiExit)`
    width: 21px;
    height: 21px;
  `,
};
