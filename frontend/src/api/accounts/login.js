import { createInstance } from '../index.js';

const instance = createInstance();

function googleLoginInstance(code, success, fail) {
  instance.get(`auth/google?code=${code}`).then(success).catch(fail);
}

function githubLoginInstance(code, success, fail) {
  instance.get(`auth/github?code=${code}`).then(success).catch(fail);
}

export { googleLoginInstance, githubLoginInstance };
