import { createInstance } from './index.js';

const instance = createInstance();

function createRoom(info, success, fail) {
  instance.post('commentRooms', info).then(success).catch(fail);
}

export { createRoom };

//임시로 만들어놓은 페이지입니다 없어질꺼에요.
