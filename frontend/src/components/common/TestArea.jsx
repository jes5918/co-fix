import React from 'react';
import styled from 'styled-components';

// Components
import EditorMenu from '../../containers/editor/EditorMenu';
import SideBar from '../dnd/SideBar';
import Container from '../dnd/Container';
import DropZone from '../dnd/DropZone';

// React DND
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Styled = {
  Space: styled.div`
    width: 100%;
    height: 93%;
    display: flex;
    flex-direction: row;
  `,
  WorkSpace: styled.div`
    width: 80%;
    height: 100%;
    background-color: lightgreen;
    display: flex;
  `,
  RightBar: styled.div`
    width: 20%;
    height: 100%;
    background-color: lightskyblue;
  `,
};

const TestArea = () => {
  const onSubmit = (searchWord) => {
    console.log('searchWord : ', searchWord);
  };
  return (
    <Styled.Space>
      <EditorMenu />
      <DndProvider backend={HTML5Backend}>
        <Styled.WorkSpace>
          <SideBar>
            <Container></Container>
          </SideBar>
          <DropZone></DropZone>
        </Styled.WorkSpace>
      </DndProvider>
      <Styled.RightBar></Styled.RightBar>
    </Styled.Space>
  );
};

export default TestArea;
