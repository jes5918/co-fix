import MyPageListBody from '../containers/mypagelist/MyPageListBody';
import MyPageListHeader from '../containers/mypagelist/MyPageListHeaderer';
import React, { useEffect } from 'react';
import styled from 'styled-components';

const MyPageListWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 50px;
`;

function MyPageList() {
  useEffect(() => {
    // const pageHTML = document.documentElement.outerHTML;
    // console.log(pageHTML);
  }, []);
  return (
    <>
      <MyPageListWrapper>
        <MyPageListHeader>첨삭받은 리스트</MyPageListHeader>
        <MyPageListBody />
      </MyPageListWrapper>
    </>
  );
}

export default MyPageList;
