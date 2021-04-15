







# 주니어 개발자들을 위한 포트폴리오 제작 플랫폼

> 주니어 개발자들을 위한 포트폴리오 제작 플랫폼
>
> 참고 : 미리캔버스, Wix

#### 🔨Built With

⭐ **Front-end** : <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/> <img src="https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=Redux&logoColor=white"/> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=black"/> <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/> <img src="https://img.shields.io/badge/Font Awesome-339AF0?style=flat-square&logo=Font Awesome&logoColor=white"/><img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/><img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white"/>

⭐ **Back-end** : <img src="https://img.shields.io/badge/Java-007396?style=flat-square&logo=Java&logoColor=white"/><img src="https://img.shields.io/badge/Spring-6DB33F?style=flat-square&logo=Spring&logoColor=white"/> <img src="https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=Redis&logoColor=white"/> <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white"/><img src="https://img.shields.io/badge/Swagger-85EA2D?style=flat-square&logo=Swagger&logoColor=black"/>

⭐ **CI / CD** : <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=Docker&logoColor=white"/> <img src="https://img.shields.io/badge/GitLab-FCA121?style=flat-square&logo=GitLab&logoColor=black"/><img src="https://img.shields.io/badge/Jenkins-D24939?style=flat-square&logo=Jenkins&logoColor=black"/> <img src="https://img.shields.io/badge/NGINX-269539?style=flat-square&logo=NGINX&logoColor=black"/><img src="https://img.shields.io/badge/Jira-0052CC?style=flat-square&logo=Jira&logoColor=white"/>

<img src="README.assets/system_arch.png" alt="system_arch" style="zoom: 45%;" />

#### 🧩 주요 기능

**SignIn**

- github, google을 통한 간편 로그인 (회원가입)

**Profile**

- 닉네임, 프로필 이미지 등 (회원 정보 조회 및 수정 기능)

**Portfolio Editor**

- 포트폴리오 편집 툴 기능
- 포트폴리오 pdf 추출 기능
- 포트폴리오 웹 페이지 구성 및 제작 기능

**Portfolio Page**

- url 기반으 웹 포트폴리오 페이지 조회 기능

**Portfolio Template**

- 기술 스택 별 포트폴리오 템플릿 필터링 기능
- 포트폴리오 찜 기능
- 찜한 포트폴리오 조회 기능



#### 👨‍👩‍👧‍👧 팀원 소개

|     Name     |                            명도균                            |                            김민혁                            |                            류건희                            |                            유진우                            |                            전의수                            |
| :----------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| **Profile**  | <img src = "https://user-images.githubusercontent.com/40309812/114838106-556f7d00-9e0f-11eb-9134-893efdff87e8.png" width="110px" height="120px"> | <img src = "https://user-images.githubusercontent.com/40309812/114838159-615b3f00-9e0f-11eb-94c0-2823fa3dca4e.jpg" width="90px" height="120px"> | <img src = "https://user-images.githubusercontent.com/70404643/112585083-7d854500-8e3c-11eb-8ed0-45f16d12b940.jpg" width="90px" height="120px"> | <img src = "https://user-images.githubusercontent.com/40309812/114838108-56081380-9e0f-11eb-8863-e77a78c6a442.png" width="110px" height="120px"> | <img src = "https://user-images.githubusercontent.com/40309812/114838115-57394080-9e0f-11eb-9497-4b590dcb4710.jpg" width="90px" height="120px"> |
|   **R&R**    |                           **팀장**                           |                           **팀원**                           |                           **팀원**                           |                           **팀원**                           |                           **팀원**                           |
|   **Git**    |             [Github](https://github.com/mingddo)             |           [Github](https://github.com/glenn93516)            |             [Github](https://github.com/RGunny)              |                              깃                              |             [Github](https://github.com/jes5918)             |
| **Position** |                              FE                              |                              BE                              |                              BE                              |                            포지션                            |                              FE                              |



#### 🌳 Convention

**Git**

- commitMessage

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

​	

**FE**

- 💻 **code**
  - **전체 format**

    - ESLint, prettier 사용

  - naming

    - React-native

    - Pascal case (ex. PascalCase) : 클래스

    - Camel case (ex. camelCase) : 기타




####  🧩 Wireframe

- AboutPage

![image-20210415182838141](README.assets/image-20210415182838141.png)

![image-20210415182847691](README.assets/image-20210415182847691.png)

![image-20210415182905013](README.assets/image-20210415182905013.png)

![image-20210415182924087](README.assets/image-20210415182924087.png)

![image-20210415182931128](README.assets/image-20210415182931128.png)



- 내 작업 문서 Page

![image-20210415182940663](README.assets/image-20210415182940663.png)



- 템플릿 페이지

![image-20210415182947928](README.assets/image-20210415182947928.png)



- 찜한 템플릿 페이지

![image-20210415182958821](README.assets/image-20210415182958821.png)



- 템플릿 미리보기 Modal

![image-20210415183006156](README.assets/image-20210415183006156.png)



- 포트폴리오 제작 페이지 (추후 업뎃 예정)

![image-20210415183016185](README.assets/image-20210415183016185.png)