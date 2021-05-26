import { AuthorizationInstance, createInstance } from './index.js';

const authInstance = AuthorizationInstance();
const instance = createInstance();

function createRoom(info, success, fail) {
  authInstance.post('commentRooms', info).then(success).catch(fail);
}

function getRoomInfo(pinNumber, success, fail) {
  instance.get(`commentRooms/${pinNumber}`).then(success).catch(fail);
}

function enterRoom(pinNumber, nickName, success, fail) {
  instance
    .get(`commentRooms/enter/${pinNumber}?nickname=${nickName}`)
    .then(success)
    .catch(fail);
}

function closeRoom(roomId, success, fail) {
  authInstance.patch(`commentRooms/${roomId}`).then(success).catch(fail);
}

function modifyRoom(roomId, maxCnt, title, success, fail) {
  authInstance
    .put(`commentRooms/${roomId}?memberLimit=${maxCnt}&roomTitle=${title}`)
    .then(success)
    .catch(fail);
}

export { createRoom, getRoomInfo, enterRoom, closeRoom, modifyRoom };
