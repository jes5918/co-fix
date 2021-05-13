import axios from 'axios';
// API_KEY 받아오고
const API_BASE_URL = 'https://k4b104.p.ssafy.io/api/';

// AuthHeader가 필요하지 않은 일반적인 Instance
function createInstance() {
  const instance = axios.create({
    baseURL: API_BASE_URL,
  });
  return instance;
}

// Localstorage 에서 토큰을 받아오는 함수 -> refatoring 들어가야함
const getToken = async () => {
  let tempToken = '';
  try {
    await localStorage.getItem('jwt').then((jwt) => {
      tempToken = jwt;
    });
    if (tempToken) {
      return tempToken;
    }
  } catch (e) {
    console.error(e);
  }
};

// AuthHeader 필요한 Instance
function AuthorizationInstance() {
  const instance = axios.create({
    baseURL: API_BASE_URL,
  });

  instance.defaults.headers.post['Content-Type'] = 'multipart/form-data';
  instance.interceptors.request.use(
    async function (config) {
      // const accToken = await getToken();
      // const token = 'Bearer' + accToken;
      const temp =
        'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMiIsImlhdCI6MTYyMDgxMTQ0OCwiZXhwIjoxNjIwODE1MDQ4fQ.48aDd9slmfWS-JYnSo6RepHtWM_rwwv7Zp71tTrzydU';
      const token = 'Bearer ' + temp;

      config.headers = {
        Authorization: token,
      };
      return config;
    },
    function (error) {
      // 오류 요청을 보내기전 수행할 일
      // ...
      return Promise.reject(error);
    },
  );

  return instance;
}

export { createInstance, AuthorizationInstance };
