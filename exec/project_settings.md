# 프로젝트 세팅 방법

### 1. Https Key 받기

Https key를 받아 서버의 `/etc/letsencrypt/live/도메인 이름`에 저장합니다
만약 도메인 이름이 k4b104.p.ssafy.io와 다르다면 `/nginx/default.conf`파일의 저장 경로를 수정해야합니다.

### 2. DB 설정

Redis 컨테이너를 생성해 실행해줘야합니다
redis의 password는 cofix로 설정되어있습니다

- 컨테이너 빌드
  `sudo docker build -t cofix-redis redis`
- 컨테이너 실행
  `sudo docker run -d --name cofix-redis -p 6379:6379 cofix-redis`

### 3. nginx, frontend, backend 실행

이제 나머지 컨테이너를 실행하면 됩니다
`docker-compose up -d`
