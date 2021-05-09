// Roll : Document 컨테이너에서 각 문장을 감싸는 UI

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  documentModifyAction,
  documentSelectAction,
} from '../../modules/actions/documentActions';
import styled from 'styled-components';
import Editabletext from './Editabletext';
import { GoThumbsup } from 'react-icons/go';
import { GoThumbsdown } from 'react-icons/go';

const PositiveButton = () => {
  return <StyledThumbsUp />;
};

const NegativeButton = () => {
  return <StyledThumbsDown />;
};

export default function EditableTextWrapper({ data }) {
  const { content } = data;
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isButtonTriggerd, setIsButtonTriggerd] = useState(false);

  const editorModeToggleHandler = () => {
    setIsEditMode(!isEditMode);
  };

  const selectDocumentHandler = () => {
    dispatch(documentSelectAction(data.id));
  };

  const buttonEnterTriggerHandler = () => {
    setIsButtonTriggerd(true);
  };

  const buttonLeaveTriggerHandler = () => {
    setIsButtonTriggerd(false);
  };

  const setNewValue = (newValue) => {
    const updateData = {
      id: data.id,
      content: newValue,
      comments: data.comments,
    };
    dispatch(documentModifyAction(updateData));
  };

  return (
    <>
      {!isEditMode ? (
        <TextContainer
          onMouseEnter={buttonEnterTriggerHandler}
          onMouseLeave={buttonLeaveTriggerHandler}
          onDoubleClick={editorModeToggleHandler}
          onClick={selectDocumentHandler}
        >
          {content}
          {isButtonTriggerd ? (
            <UpDownIconWrapper>
              <PositiveButton />
              <NegativeButton />
              <Heart />
            </UpDownIconWrapper>
          ) : null}
        </TextContainer>
      ) : (
        <Editabletext
          editorModeToggleHandler={editorModeToggleHandler}
          setNewValue={setNewValue}
          content={content}
        />
      )}
    </>
  );
}

const TextContainer = styled.div`
  position: relative;
  word-break: keep-all;
  margin: 15px 30px 0px 10px;
  &:hover {
    background-color: #ffffbb;
  }
`;

const UpDownIconWrapper = styled.span`
  position: absolute;
  display: inline-block;
`;

const StyledThumbsUp = styled(GoThumbsup)`
  margin: 0px 0px 0px 10px;
`;
const StyledThumbsDown = styled(GoThumbsdown)`
  margin: 0px 0px 0px 10px;
`;

const Heart = styled.div`
  left: 55%;
  -webkit-transform: scale(0.8);
  -moz-transform: scale(0.8);
  transform: scale(0.8);
  opacity: 0.8;
  -webkit-animation: moveclouds 20s linear infinite,
    sideWays 4s ease-in-out infinite alternate;
  -moz-animation: moveclouds 20s linear infinite,
    sideWays 4s ease-in-out infinite alternate;

  @-webkit-keyframes moveclouds {
    0% {
      top: 500px;
    }
    100% {
      top: -500px;
    }
  }

  @keyframes moveclouds {
    0% {
      top: 500px;
    }
    100% {
      top: -500px;
    }
  }

  @-webkit-keyframes sideWays {
    0% {
      margin-left: 0px;
    }
    100% {
      margin-left: 50px;
    }
  }

  @keyframes sideWays {
    0% {
      margin-left: 0px;
    }
    100% {
      margin-left: 50px;
    }
  }
`;
