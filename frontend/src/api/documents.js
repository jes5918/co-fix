import { AuthorizationInstance, createInstance } from './index.js';

const authInstance = AuthorizationInstance();
const instance = createInstance();

function getDocuments(roomId, documentId, success, fail) {
  instance
    .get(`commentRooms/${roomId}/documents/${documentId}`)
    .then(success)
    .catch(fail);
}

function modifyDocuments(
  commentRoomId,
  documentId,
  sentenceId,
  editInfo,
  success,
  fail,
) {
  authInstance
    .put(
      `commentRooms/${commentRoomId}/documents/${documentId}/sentences/${sentenceId}`,
      editInfo,
    )
    .then(success)
    .catch(fail);
}

export { getDocuments, modifyDocuments };
