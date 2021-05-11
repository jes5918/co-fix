import { createInstance } from './index.js';

const instance = createInstance();

function createRoom(info, success, fail) {
  instance.post('commentRooms', info).then(success).catch(fail);
}

export { createRoom };
