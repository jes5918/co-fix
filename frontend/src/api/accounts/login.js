import { createInstance } from '../index.js';

const instance = createInstance();

function googleLoginInstance(loginInfo, success, fail) {
  instance.post('google/login/', loginInfo).then(success).catch(fail);
}

function githubLoginInstance(loginInfo, success, fail) {
  instance.post('github/login/', loginInfo).then(success).catch(fail);
}

export { googleLoginInstance, githubLoginInstance };
