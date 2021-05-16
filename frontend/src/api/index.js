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
const getToken = () => {
  try {
    return JSON.parse(localStorage.getItem('user')).token;
  } catch (e) {
    console.error(e);
  }
};

// AuthHeader 필요한 Instance
function AuthorizationInstance() {
  const instance = axios.create({
    baseURL: API_BASE_URL,
  });

  instance.interceptors.request.use(
    async function (config) {
      // const accToken = await getToken();
      const accToken =
        'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNyIsImlhdCI6MTYyMTE2MzA3NiwiZXhwIjoxNjIxMTY2Njc2fQ.Bk8B8qF3cg8RycwvnpDEZ55osXGm3UvqsM47QCW29bk';

      config.headers = {
        Authorization: 'Bearer ' + accToken,
      };
      return config;
    },
    function (error) {
      return Promise.reject(error);
    },
  );

  return instance;
}

export { createInstance, AuthorizationInstance };
