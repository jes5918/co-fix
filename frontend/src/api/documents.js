import { AuthorizationInstance } from './index.js';

const instance = AuthorizationInstance();

function getDocuments(documentId, success, fail) {
  instance.get(`documents/${documentId}`).then(success).catch(fail);
}

function modifyDocuments(documentId, sentenceId, editInfo, success, fail) {
  instance
    .put(`/documents/${documentId}/sentences/${sentenceId}`, editInfo)
    .then(success)
    .catch(fail);
}

export { getDocuments, modifyDocuments };
