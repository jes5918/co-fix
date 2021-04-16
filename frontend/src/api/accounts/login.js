import { createInstance } from '../index.js';

const instance = createInstance();

function loginInstance(loginInfo, success, fail) {
  instance.post('accounts/login/', loginInfo).then(success).catch(fail);
}

export { loginInstance };
