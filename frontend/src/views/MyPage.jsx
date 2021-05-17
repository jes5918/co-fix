import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// library
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

// apis
import { getDocuments } from '../api/documents';
import { getAllComments } from '../api/comments';
import { commentSetAction } from '../modules/actions/commentActions';

// redux
import { documentGetAction } from '../modules/actions/documentActions';

// containers
import ScreenSlideDivider from '../containers/ScreenSlideDivider';
import MyDocumentContainer from '../containers/mypage/MyDocumentContainer';
import CommentContainer from '../containers/CommentContainer';
import MypageLeft from '../containers/mypage/MyPageLeft';

// components
import CalcContentLength from '../containers/mypage/CalcContentLength';

// 커스터마이징 탭
const CustomTab = ({ children }) => (
  <Tab
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '0px 15px 0px 0px',
      padding: '10px',
      borderRadius: '50%',
      border: '0',
      bottom: '0',
      width: '45px',
      height: '45px',
      boxShadow: '2px 2px 4px 2px rgba(0, 0, 0, 0.3)',
      fontWeight: 'bold',
      fontSize: '20px',
      background: '#ffffff',
    }}
    onMouseEnter={(e) =>
      (e.target.style.background =
        'linear-gradient(to bottom, #fef9d7, #d299c2)')
    }
    onMouseLeave={(e) => (e.target.style.background = '#ffffff')}
  >
    {children}
  </Tab>
);

CustomTab.tabsRole = 'Tab';

export default function MyPage({ match }) {
  const roomId = match.params.roomid;
  const documentId = match.params.documentid;
  const [tabIndex, setTabIndex] = useState(0);
  const [documentInfo, setDocumentInfo] = useState([]);
  const [originalContent, setOriginalContent] = useState([]);
  const [modifiedContent, setModifiedContent] = useState([]);
  const [commentInfo, setCommentInfo] = useState([]);
  const [onFocusedSentence, setOnFocusedSentence] = useState();

  // 중간 divderbar
  const [splitPosX, setSplitPosX] = useState(() => {
    const SavedSplitX = localStorage.getItem('myPageSplitPosX');
    return SavedSplitX ? parseInt(SavedSplitX, 10) : 600;
  });
  const [windowWidthSize, setWindowWidthSize] = useState(window.innerWidth);
  const isHalfScreen = windowWidthSize > screen.width / 1.85;
  const isMobileScreen = windowWidthSize > screen.width / 3;
  const dispatch = useDispatch();
  const sentences = useSelector((state) => {
    return state.document.data;
  });

  // sentence 클릭 -> comment 조회
  const onHandleClickSentence = (sentenceId) => {
    console.log(`sentenceId`, sentenceId);
    setOnFocusedSentence(sentenceId);
    getAllComments(
      roomId,
      documentId,
      sentenceId,
      (res) => {
        dispatch(commentSetAction(res.data.data));
        setCommentInfo(res.data.data);
      },
      (err) => {
        console.log(`err`, err);
      },
    );
  };

  useEffect(() => {
    getDocuments(
      roomId,
      documentId,
      (res) => {
        dispatch(documentGetAction(res.data.data));
        setDocumentInfo(res.data.data);
        let tempOrigin = '';
        let tempModify = '';
        res.data.data.forEach((d) => {
          tempOrigin += d.originalContent;
          tempOrigin += '\n';
          tempModify += d.modifiedContent;
          tempModify += '\n';
        });
        setOriginalContent(tempOrigin);
        setModifiedContent(tempModify);
      },
      (err) => {
        console.log(`err`, err);
      },
    );
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidthSize(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <BackGround>
      <StyledTabs
        selectedIndex={tabIndex}
        onSelect={(index) => setTabIndex(index)}
      >
        <TabList style={TabListStyle}>
          <CustomTab>1</CustomTab>
          <CustomTab>2</CustomTab>{' '}
          {isHalfScreen ? (
            <>
              {windowWidthSize && tabIndex === 0 ? (
                <TagName>자소서 / 첨삭 결과 </TagName>
              ) : (
                <TagName>원본 자소서 / 수정 자소서</TagName>
              )}
            </>
          ) : null}
        </TabList>
        <MyPageContainer>
          <MyPageHeader>
            {isMobileScreen ? (
              <>{sentences && <MyPageTitle>{sentences.title}</MyPageTitle>}</>
            ) : (
              <MyPageTitle></MyPageTitle>
            )}
          </MyPageHeader>

          <TabPanel>
            <ScreenSlideDivider setSplitPosX={setSplitPosX}>
              <>
                <Scrollbars style={{ width: '100%', height: '100%' }}>
                  <MyDocumentContainer
                    sentences={sentences}
                    roomId={roomId}
                    documentId={documentId}
                    onHandleClickSentence={onHandleClickSentence}
                  />
                </Scrollbars>
                {sentences && (
                  <CalcContentLength
                    datas={sentences}
                    splitPosX={splitPosX}
                    windowWidthSize={windowWidthSize}
                  />
                )}
              </>
              <Scrollbars style={{ width: '100%', height: '100%' }}>
                <CommentContainer sentenceId={onFocusedSentence} />
              </Scrollbars>
            </ScreenSlideDivider>
          </TabPanel>
          <TabPanel>
            <ScreenSlideDivider setSplitPosX={setSplitPosX}>
              <>
                <Scrollbars style={{ width: '100%', height: '100%' }}>
                  <MypageLeft content={originalContent} />
                </Scrollbars>
                <CalcContentLength
                  sentences={originalContent}
                  splitPosX={splitPosX}
                  windowWidthSize={windowWidthSize}
                />
              </>
              <>
                <Scrollbars style={{ width: '100%', height: '100%' }}>
                  <MypageLeft content={modifiedContent} />
                </Scrollbars>
                <CalcContentLength
                  sentences={modifiedContent}
                  splitPosX={splitPosX}
                  windowWidthSize={windowWidthSize}
                />
              </>
            </ScreenSlideDivider>
          </TabPanel>
        </MyPageContainer>
      </StyledTabs>
    </BackGround>
  );
}

// 백그라운드
const BackGround = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  padding-top: 86px;
  background: linear-gradient(to top, #fef9d7, #d299c2);
`;

// 왼쪽 위에 탭 스타일
const TabListStyle = {
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '-4px 9vw',
  border: 'none',
  zIndex: 300,
  padding: '0px',
};

// 탭 태그 네임
const TagName = styled.div`
  padding: 10px 30px;
  border-radius: 20px;
  background-color: #ffffff;
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.1);
  font-weight: bold;
  font-size: 18px;
  font-family: 'S-CoreDream-6Bold';
`;

const StyledTabs = styled(Tabs)`
  animation-duration: 1s;
  animation-name: fadeInUp;
  @keyframes fadeInUp {
    from {
      transform: translate3d(0, 50px, 0);
      opacity: 0;
    }

    to {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }
`;

// 안쪽 컨텐츠 컨테이너
const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
  height: 80vh;
  margin: 0px auto;
  font-family: 'S-CoreDream-5Medium';
  font-size: 18px;
  /* box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.3); */
  border-radius: 20px;
`;

// 제목
const MyPageHeader = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const MyPageTitle = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  height: 50px;
  font-size: 21px;
  font-weight: bold;
`;
