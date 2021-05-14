import { AuthorizationInstance } from '../index.js';

const Authinstance = AuthorizationInstance();

function getCommentRoomsInstance(success, fail) {
  Authinstance.get(`members/commentRooms`).then(success).catch(fail);
}

export { getCommentRoomsInstance };
