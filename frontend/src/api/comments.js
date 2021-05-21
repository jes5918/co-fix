import { createInstance } from './index.js';

const instance = createInstance();

export const getAllComments = (
  commentRoomId,
  documentId,
  sentenceId,
  success,
  fail,
) => {
  instance
    .get(
      `commentRooms/${commentRoomId}/documents/${documentId}/sentences/${sentenceId}/comments`,
    )
    .then(success)
    .catch(fail);
};

export const createComment = (
  commentRoomId,
  documentId,
  sentenceId,
  CommentRequest,
  success,
  fail,
) => {
  instance
    .post(
      `commentRooms/${commentRoomId}/documents/${documentId}/sentences/${sentenceId}/comments`,
      CommentRequest,
    )
    .then(success)
    .catch(fail);
};

export const agreeComment = (
  commentRoomId,
  documentId,
  sentenceId,
  commentId,
  nickname,
  success,
  fail,
) => {
  instance
    .post(
      `commentRooms/${commentRoomId}/documents/${documentId}/sentences/${sentenceId}/comments/${commentId}/agree?nickname=${nickname}`,
    )
    .then(success)
    .catch(fail);
};
