import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

// hook
import useLoginUser from '../hook/useLoginUser';
import useMyPageList from '../hook/useMyPageList';
import { setMyPageList } from '../modules/actions/mypagelistActions';

// containers
import MyPageListBody from '../containers/mypagelist/MyPageListBody';
import MyPageListHeader from '../containers/mypagelist/MyPageListHeaderer';

// apis
import { getCommentRoomsInstance } from '../api/mypage/mypageList';

export default function MyPageList() {
  const dispatch = useDispatch();
  const RoomInfos = useMyPageList();
  const user = useLoginUser();

  useEffect(() => {
    getCommentRoomsInstance(
      (res) => {
        console.log('리덕스 저장하자', res.data.data);
        dispatch(setMyPageList(res.data.data));
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
            <b>{user.credentials.member.name}</b> 님의 <b>Co-Fix History</b>
          </MyPageListHeader>
        ) : (
          <MyPageListHeader>
            <b>Test User</b> 님의 <b>Co-Fix History</b>
          </MyPageListHeader>
        )}
        <MyPageListBody RoomInfos={RoomInfos} />
      </MyPageListWrapper>
    </Background>
  );
}

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(to left, #fef9d7, #d299c2);
  /* background-color: #f9f5f4; */
`;
const MyPageListWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 60px;
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
