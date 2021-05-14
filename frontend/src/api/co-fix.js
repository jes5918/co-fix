import { AuthorizationInstance, createInstance } from './index.js';

const Authinstance = AuthorizationInstance();
const BasInstance = createInstance();

function createRoom(info, success, fail) {
  Authinstance.post('commentRooms', info).then(success).catch(fail);
}

function getRoomInfo(pinNumber, success, fail) {
  BasInstance.get(`commentRooms/${pinNumber}`).then(success).catch(fail);
}

function closeRoom(roomId, success, fail) {
  Authinstance.patch(`commentRooms/${roomId}`).then(success).catch(fail);
}

function modifyRoom(roomId, maxCnt, title, success, fail) {
  Authinstance.put(
    `commentRooms/${roomId}?memberLimit=${maxCnt}&roomTitle=%${title}`,
  )
    .then(success)
    .catch(fail);
}

export { createRoom, getRoomInfo, closeRoom, modifyRoom };
