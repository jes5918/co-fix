import { AuthorizationInstance } from '../index.js';

const authInstance = AuthorizationInstance();

function getCommentRoomsInstance(success, fail) {
  authInstance.get(`members/commentRooms`).then(success).catch(fail);
}

export { getCommentRoomsInstance };
