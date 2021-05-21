import { AuthorizationInstance, createInstance } from './index.js';

const instance = AuthorizationInstance();
const basInstance = createInstance();

function getDocuments(roomId, documentId, success, fail) {
  basInstance
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
  instance
    .put(
      `commentRooms/${commentRoomId}/documents/${documentId}/sentences/${sentenceId}`,
      editInfo,
    )
    .then(success)
    .catch(fail);
}

export { getDocuments, modifyDocuments };
