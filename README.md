<img src="https://capsule-render.vercel.app/api?type=waving&height=200&color=gradient&text=Netflix%20Clone&fontAlign=50&desc=with%20React&fontAlignY=35&textBg=false&animation=scaleIn&descAlignY=54" />

## 데모 사이트
[https://sngynhy.github.io/react-netflix-clone](https://sngynhy.github.io/react-netflix-clone)

![screenshot](./src/assets/img/main.png)

<br>

## 프로젝트 소개
<p>React 개인 공부용 넷플릭스 클론 프로젝트</p>

### 목표
<ol>
  <li>TMDB Open Api를 이용한 영화, TV, 넷플릭스 시리즈 등의 미디어 콘텐츠 제공</li>
  <li>TMDB에서 제공하는 데이터들을 활용하여 최대한 넷플릭스와 유사하게 UI/UX 구현</li>
  <li>각 콘텐츠의 상세 정보 제공 및 관련 콘텐츠 추천</li>
  <li>트레일러 영상 재생 기능</li>
  <li>제목, 장르, 인물별 콘텐츠 검색 기능</li>
</ol>

### 기간
2024-11-19 ~ 2025-01-15

<br>

## 기술 스택
### 라이브러리 & 언어
<div>
  <img alt="Javasctip" src="https://img.shields.io/badge/Javascript-black?&style=flat&logo=javascript&logoColor=F7DF1E" />
  <img alt="React" src="https://img.shields.io/badge/React-black?&style=flat&logo=react&logoColor=61DAFB" />
  <img alt="NPM" src="https://img.shields.io/badge/NPM-black?style=flat&logo=npm&logoColor=CB3837" />
  <img alt="React Router" src="https://img.shields.io/badge/React Router-black?style=flat&logo=reactrouter&logoColor=CA4245" />
  <img alt="React Query" src="https://img.shields.io/badge/React Query-black?style=flat&logo=reactquery&logoColor=FF4154" />
  <img alt="Styled Components" src="https://img.shields.io/badge/Styled Components-black?style=flat&logo=styledcomponents&logoColor=#DB7093" />
  <img alt="Zustand" src="https://img.shields.io/badge/Zustand-black?style=flat&logo=zustand&logoColor=white" />
  <img alt="React Youtube" src="https://img.shields.io/badge/React Youtube-black?style=flat&logo=reactyoutube&logoColor=FF0000" />
</div>

### 도구
<div>
  <img alt="VS Code" src="https://img.shields.io/badge/VS Code-007ACC?style=flat&logo=vscode&logoColor=2088FF" />
  <img alt="GitHub" src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white" />
  <img alt="GitHub Pages" src="https://img.shields.io/badge/GitHub Pages-222222?style=flat&logo=githubpages&logoColor=white" />
</div>

<!-- <img alt="" src="https://img.shields.io/badge/${아이콘}-${색상}?style=${뱃지스타일}&logo=${텍스트}&logoColor=${텍스트 색상}"

https://simpleicons.org/
/> -->

<br>

## 기능 구현 및 트러블 슈팅
### 1. TBDM API
- 넷플릭스, 영화, 시리즈 콘텐츠의 상세 정보, 이미지, Youtube Video Key, 추천 콘텐츠 등 프로젝트에 필요한 모든 데이터는 TBDM에서 제공하는 데이터를 활용
### 2. React Query
- Axios와 React Query를 활용해 HTTP 요청 처리와 데이터 캐싱, 동기화 등의 서버 상태 관리
- 한 번에 여러 데이터 호출 시 React Queries 훅을 이용해 쿼리 실행을 병렬로 처리
- select 속성에 각 데이터에 대한 메타 데이터 추가 및 데이터 필터링 처리
- useIsFetching 훅을 활용해 전역 로딩스패너 적용
- Custom Hook으로 구현
### 1. Youtube Player
- react-youtube 라이브러리를 활용해 Youtube 동영상 재생 기능 구현
### 3. React Router의 모달 라우트 활용
- 백그라운드가 유지되도록 URL 기반의 모달 상태 관리
### 4. Zustand
- 모달창 활성 상태, 동영상 플레이어 상태, 찜 리스트 등의 전역 상태 관리

<br>

## 추후 개선 사항
<ol>
  <li>반응형 적용 > 모바일 및 태블릿 버전</li>
  <li>콘텐츠 요약 정보 미리 보기 기능 > preview 모달</li>
  <li>검색 콘텐츠 출력 시 무한 스크롤 기능</li>
  <li>시리즈 UI 개선 > 시리즈 리스트 추가</li>
</ol>
