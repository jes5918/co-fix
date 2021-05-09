import MyPageListBody from '../containers/mypagelist/MyPageListBody';
import MyPageListHeader from '../containers/mypagelist/MyPageListHeaderer';
import React, { useEffect } from 'react';
import styled from 'styled-components';

export default function MyPageList() {
  return (
    <>
      <MyPageListWrapper>
        <MyPageListHeader>첨삭받은 리스트</MyPageListHeader>
        <MyPageListBody />
      </MyPageListWrapper>
    </>
  );
}

const MyPageListWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 50px;
`;
