![logo](README.assets/logo.png)

> 실시간 온라인 공동 첨삭 플랫폼

#### 🔨Built With

⭐ **Front-end** :  <img src="https://img.shields.io/badge/React-17.0.2-61DAFB?style=flat-square&logo=React&logoColor=black"/> <img src="https://img.shields.io/badge/Redux-4.1.0-764ABC?style=flat-square&logo=Redux&logoColor=white"/> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=black"/> <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/> <img src="https://img.shields.io/badge/Font Awesome-339AF0?style=flat-square&logo=Font Awesome&logoColor=white"/>

⭐ **Back-end** : <img src="https://img.shields.io/badge/Java-11-007396?style=flat-square&logo=Java&logoColor=white"/> <img src="https://img.shields.io/badge/Spring-2.4.4-6DB33F?style=flat-square&logo=Spring&logoColor=white"/> <img src="https://img.shields.io/badge/Gradle-6.8.3-green?style=flat-square&logo=Gradle&logoColor=white"> <img src="https://img.shields.io/badge/MySQL-8.0.21-4479A1?style=flat-square&logo=MySQL&logoColor=white"/> <img src="https://img.shields.io/badge/Swagger-2.9.2-85EA2D?style=flat-square&logo=Swagger&logoColor=black"/> <img src = "https://img.shields.io/badge/Elastic%20Stack-7.12.1-00bfb3?style=flat-square&logo=elastic-stack">

⭐ **CI / CD** : <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=Docker&logoColor=white"/> <img src="https://img.shields.io/badge/GitLab-FCA121?style=flat-square&logo=GitLab&logoColor=black"/> <img src="https://img.shields.io/badge/Jenkins-D24939?style=flat-square&logo=Jenkins&logoColor=black"/> <img src="https://img.shields.io/badge/NGINX-269539?style=flat-square&logo=NGINX&logoColor=black"/> <img src="https://img.shields.io/badge/Jira-0052CC?style=flat-square&logo=Jira&logoColor=white"/>

#### 🧩 주요 기능

**SignIn**

- github, google을 통한 간편 로그인 (회원가입)

**Co-Fix**

- 실시간 글에 대한 comment
- Comment에 대한 agree 기능
- 문장에 대한 평가 기능 ( Fix 고쳐야할 부분 )
- 문장 직접 수정 기능
- Pin-Code 복사 기능
- 음성 및 화상 통화기능
- 복사 (ctrl + c 및 html ) 방지

**Create Co-Fix**

- 제목 입력
- 인원 설정
- 첨삭 텍스트 입력

**Join Co-Fix**

- 저작권 및 서비스 이용 안내
- Pincode 입력

**History**

- 이제까지 첨삭한 pjt 목록 조회
- 상세 결과 페이지로 이동

**History Detail**

- co-fix 결과 화면
- 첨삭이 필요한 문장 표시
- 고쳐야 하는 문장 표시
- 원본, 수정본 비교기능
- 각 문장 마다 comment 모아서 한 번에 볼 수 있는 기능

#### 👨‍👩‍👧‍👧 팀원 소개

|     Name     |                                                                      명도균                                                                      |                                                                     김민혁                                                                      |                                                                     류건희                                                                      |                                                                      유진우                                                                      |                                                                     전의수                                                                      |
| :----------: | :----------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------: |
| **Profile**  | <img src = "https://user-images.githubusercontent.com/40309812/114838106-556f7d00-9e0f-11eb-9134-893efdff87e8.png" width="110px" height="120px"> | <img src = "https://user-images.githubusercontent.com/40309812/114838159-615b3f00-9e0f-11eb-94c0-2823fa3dca4e.jpg" width="90px" height="120px"> | <img src = "https://user-images.githubusercontent.com/70404643/112585083-7d854500-8e3c-11eb-8ed0-45f16d12b940.jpg" width="90px" height="120px"> | <img src = "https://user-images.githubusercontent.com/40309812/114838108-56081380-9e0f-11eb-8863-e77a78c6a442.png" width="110px" height="120px"> | <img src = "https://user-images.githubusercontent.com/40309812/114838115-57394080-9e0f-11eb-9497-4b590dcb4710.jpg" width="90px" height="120px"> |
|   **R&R**    |                                                                     **팀장**                                                                     |                                                                    **팀원**                                                                     |                                                                    **팀원**                                                                     |                                                                     **팀원**                                                                     |                                                                    **팀원**                                                                     |
|   **Git**    |                                                       [Github](https://github.com/mingddo)                                                       |                                                     [Github](https://github.com/glenn93516)                                                     |                                                       [Github](https://github.com/RGunny)                                                       |                                                     [Github](https://github.com/phoenix9373)                                                     |                                                      [Github](https://github.com/jes5918)                                                       |
| **Position** |                                                                        FE                                                                        |                                                                       BE                                                                        |                                                                       BE                                                                        |                                                                        FE                                                                        |                                                                       FE                                                                        |

#### 🙌 시스템 아키텍쳐

![cofix_system_architecture-3](README.assets/cofix_system_architecture-3.png)

#### 🙌 데이터 구조 및 API 명세

📄 [데이터 구조](https://www.notion.so/27dce9f30e9344e2974f5278d3614265)
📄 [API 명세](https://www.notion.so/API-9988a1a948734b9c9a1dd25b8713b9c0)

#### 🙌포트번호

`https://k4b104.p.ssafy.io`도메인 - FE, BE 총괄

```bash
--- docker 설치
 $ sudo apt-get update
 $ sudo apt-get install \
     apt-transport-https \
     ca-certificates \
     curl \
     gnupg \
     lsb-release
 $ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
 $ echo \
   "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
 $ sudo apt-get update
 $ sudo apt-get install docker-ce docker-ce-cli containerd.io

 --- docker-compose 설치
 $ sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
 $ sudo chmod +x /usr/local/bin/docker-compose
 $ docker-compose build
 $ docker-compose up -d
```

```
80 & 443 : 웹서비스 접속
9090 : 젠킨스
5601: kibana
```

`https://k4b1041.p.ssafy.io`도메인 - OpenVidu backend server (실시간 화상)

```bash
docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-server-kms:2.17.0
```

```
4443 : OpenVidu Server
```



#### 🎉 Co-Fix with Live Meeting

- create

![asdaasd](https://i.ibb.co/BCtDmDg/xum27v.webp)



- pinCode

![pincodeImage](https://i.ibb.co/rtGqXYN/pin.webp)



- Co-Fix

![co-fix](https://files.catbox.moe/mvejh4.webp)



- 화상채팅

![openvidu](https://files.catbox.moe/i1927e.webp)



- History

![ezgif.com-gif-maker](https://files.catbox.moe/7ykhku.webp)



- RoomSetting

![setting](https://files.catbox.moe/tidptn.webp)



#### 🎴일정관리

**1주차 4. 12 ~ 4.16**

- common
  - 아이디어 회의 및 도출
  - WireFrame
  - 기술스택 논의

**2주차 4. 19 ~ 4.23**

- Frontend
  - components 제작
  - 소셜로그인 완성 및 백엔드 통신
  - Redux 셋팅
- Backend

  - 소셜로그인 완성 (월요일)
  - 에러 코드 정하기(월요일)
  - `@ControllerAdvice` 적용
  - 로깅
    - log 파일로 저장
    - ELK 적용
  - DB 세팅
  - ERD + DB 테이블 완성 (금요일)

  - EC2 나오면 (수요일 예상)
    - 당일 배포 마무리

- common

  - 금요일 첫 번째 발표 준비

**3주차 4.26 ~ 4.30**

- Frontend
  - 기획
- Backend
  - 해시태그 등 기타 기능 (1)
  - 포트폴리오, 템플릿
- common

**4주차 5.3 ~ 5.7**

- Frontend

  - 컴포넌트 제작

- Backend

  - ERD

- common

  - 1차 코드작성 완료

**5주차 5.10 ~ 5.14**

- Frontend

  - 기본 페이지 Frame
  - api 기본 통신 세팅

- Backend
  - 리팩토링
  - 테스트 (부하테스트 같은거)
  - API 수정 요청 들어오는거 고쳐주기
- common
  - 시연 세팅 + 시나리오

**6주차 5.15 ~ 5.28**

- common
  - UCC제작
  - 최종 PPT제작 및 발표 준비

#### 🌳 Convention

**Git**

- 기본전략

  - [우아한 형제들 Git Flow 참고 ](https://woowabros.github.io/experience/2017/10/30/baemin-mobile-git-branch-strategy.html)

  - Git Repository 구성 (분산형 워크플로우)

  - Main Upstream Remote Repository를 기본으로 두고, 개발자 개인의 Fork Repository를 이용

  - 모두가 공유하고 있는 Repository에서 실험하기에는 위험, Forked한 Repository를 두면 부담 없이 원하는 실험들을 해볼 수 있음

  - 분산형 워크 플로우 그래프

    ![image-20210420213923328](README.assets/image-20210420213923328.png)

  - Git rebase 전략을 사용하여 Git Graph의 단순화 작업을 통해 사후 관리 용이하도록 함.

  - Origin Branch에 Push 하기 전에 `git --rebase upstream develop`을 통해 내가 작업한 커밋을 upstream repo의 최신 커밋에 rebase하여 `git push origin [feature branch]` 하고, 원격 repo 에서 Pull Request를 날려 최종적으로 Upstream Develop에 코드리뷰 후 Merge함.

    ![image-20210420214440913](README.assets/image-20210420214440913.png)

  - 위와 같은 GIt 전략을 사용한 결과물

  ![image-20210420215114763](README.assets/image-20210420215114763.png)

- Branch

```
master -> develop -> feat/(FE/BE)-(branch name)-(status)
```

- commit

```
1. 작업을 시작하기 전에 JIRA 티켓을 생성합니다.
2. 하나의 티켓은 되도록 하나의 커밋으로 합니다.
3. 커밋 그래프는 최대한 단순하게 가져갑니다.
4. 서로 공유하는 브랜치의 커밋 그래프는 함부로 변경하지 않습니다.
5. 리뷰어(같은 Position)에게 꼭 리뷰를 받습니다.
6. 자신의 Pull Request는 스스로 merge 합니다.
```

- commitMessage (template)

```
[feat/FE] : 제목
##### 제목은 최대 50 글자까지만 입력 ############## -> |

######## 본문은 한 줄에 최대 72 글자까지만 입력 ########################### -> |

#   feat       : 새로운 기능 추가
#   fix        : 버그 수정
#   refactor   : 코드 리팩토링
#   style      : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
#   docs       : 문서 수정
#   test       : 테스트 코드, 리팩토링 테스트 코드 추가
#   chore      : 빌드 업무 수정, 패키지 매니저 수정
# ------------------
#     제목 첫 글자를 대문자로
#     제목은 명령문으로
#     제목 끝에 마침표(.) 금지
#     제목과 본문을 한 줄 띄워 분리하기
#     본문은 "어떻게" 보다 "무엇을", "왜"를 설명한다.
#     본문에 여러줄의 메시지를 작성할 땐 "-"로
```

**FE**

- 💻 **code**

  - **전체 format**

    - ESLint, prettier 사용

  - naming

    - React

    - Pascal case (ex. PascalCase) : 클래스

    - Camel case (ex. camelCase) : 기타

**BE**

- 📂 **패키지 구조**

  ```bash
  backend
  ├─ .gitignore
  ├─ build.gradle
  ├─ Dockerfile
  ├─ ...
  └─ src
    ├─ main
    │  ├─ java
    │  │   └─ com.ssafy.devfolio
    │  │       ├─ member        : 멤버 관련
    │  │       │    ├─  MemberController.java
    │  │       │    └─  ...
    │  │       ├─ pubsub   : Redis pub/sub 관련
    │  │       ├─ commentroom   : 첨삭방 관련
    │  │       ├─ sentence      : 문장 관련
    │  │       ├─ comment       : 문장에 대한 의견 관련
    │  │       ├─ aspect        : 로깅 AOP 관련
    │  │       ├─ config        : 설정 파일 (swagger, security, redis, ...)
    │  │       │    ├─  security
    │  │       │    └─  ...
    │  │       ├─ exception     : 예외 처리 관련
    │  │       ├─ response      : API 응답 관련
    │  │       ├─ utils         : 유틸 폴더 (Jwt, ...)
    │  │       └─ DevfolioApplication.java
    │  └─ resources
    │     ├─ application.yml    : 설정 파일
    │     └─ ...
    └─ test                     : 테스트 폴더
  
  ```







#### 🧩 Wireframe

- Home

  ![웹 1920 – 11](README.assets/웹 1920 – 11.png)

![웹 1920 – 12](README.assets/웹 1920 – 12.png)

![웹 1920 – 14](README.assets/웹 1920 – 14-1620616547490.png)

- Co-Fix 만들기

![웹 1920 – 5](README.assets/웹 1920 – 5.png)

![웹 1920 – 8](README.assets/웹 1920 – 8.png)

![웹 1920 – 9](README.assets/웹 1920 – 9.png)

- Co-Fix 참여하기

![웹 1920 – 15](README.assets/웹 1920 – 15.png)

![웹 1920 – 10](README.assets/웹 1920 – 10.png)
