import MyPageListBody from '../containers/mypagelist/MyPageListBody';
import MyPageListHeader from '../containers/mypagelist/MyPageListHeaderer';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import useLoginUser from '../hook/useLoginUser';
export default function MyPageList() {
  const user = useLoginUser();
  return (
    <>
      <MyPageListWrapper>
        {user.authenticated ? (
          <MyPageListHeader>{user.credentials}</MyPageListHeader>
        ) : (
          <MyPageListHeader>첨삭받은 리스트</MyPageListHeader>
        )}
        <MyPageListBody />
      </MyPageListWrapper>
    </>
  );
}

const MyPageListWrapper = styled.div`
  width: 100vw;
  height: 100vh;
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
