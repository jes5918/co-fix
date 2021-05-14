import { AuthorizationInstance, createInstance } from './index.js';

const instance = AuthorizationInstance();
const basInstance = createInstance();

function createRoom(info, success, fail) {
  instance.post('commentRooms', info).then(success).catch(fail);
}

function getRoomInfo(pinNumber, success, fail) {
  basInstance.get(`commentRooms/${pinNumber}`).then(success).catch(fail);
}

function enterRoom(pinNumber, nickName, success, fail) {
  basInstance
    .get(`commentRooms/enter/${pinNumber}?nickname=${nickName}`)
    .then(success)
    .catch(fail);
}

function closeRoom(roomId, success, fail) {
  instance.patch(`commentRooms/${roomId}`).then(success).catch(fail);
}

function modifyRoom(roomId, maxCnt, title, success, fail) {
  instance
    .put(`commentRooms/${roomId}?memberLimit=${maxCnt}&roomTitle=%${title}`)
    .then(success)
    .catch(fail);
}

export { createRoom, getRoomInfo, enterRoom, closeRoom, modifyRoom };
