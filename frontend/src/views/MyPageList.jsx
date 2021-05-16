import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// hook
import useLoginUser from '../hook/useLoginUser';

// containers
import MyPageListBody from '../containers/mypagelist/MyPageListBody';
import MyPageListHeader from '../containers/mypagelist/MyPageListHeaderer';

// apis
import { getCommentRoomsInstance } from '../api/mypage/mypageList';

export default function MyPageList() {
  const [roomInfos, setRoomInfos] = useState('');
  const user = useLoginUser();

  useEffect(() => {
    getCommentRoomsInstance(
      (res) => {
        console.log(res.data.data);
        setRoomInfos(res.data.data);
      },
      (err) => {
        console.log(`err`, err);
      },
    );
  }, []);

  return (
    <Background>
      <MyPageListWrapper>
        {user.authenticated ? (
          <MyPageListHeader>
            <b>{user.credentials.member.name}</b> 님의 Co-Fix History
          </MyPageListHeader>
        ) : (
          <MyPageListHeader>
            <b>Test User</b> 님의 Co-Fix History
          </MyPageListHeader>
        )}
        <MyPageListBody roomInfos={roomInfos} />
      </MyPageListWrapper>
    </Background>
  );
}

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f9f5f4;
`;
const MyPageListWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 100px;
  background-color: #f9f5f4;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  animation-duration: 0.8s;
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
