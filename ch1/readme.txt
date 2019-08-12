# next
    - 기존 리액트에서는 Router, Switch 태그로 페이지 라우터 체계 설정을 해줬는데 next는 알아서 처리. 단 pages 폴더 밑에 파일이 있어야함 
    - SSR(서버사이드렌더링): 서버에서 view를 렌더링, 초기 렌더링 시간 단축
    - code spliting: 모든 페이지를 불러오지 않고 사용자가 요청하는 페이지만 불러온다 (서버부담 덜고, 사용자 로딩시간 단축)
    - SEO(검색엔진최적화): 뷰 렌더링이 javascript engine으로 돌아가는 프로젝트는 정보를 표시해주지 않는다. 그걸 알아서 해준

# next의 구조
    - 기본적으로 next안에 내장되어있는 page들 _document, _app, _error
    - _document.js: html, header, body 담당
    - _app.js: root 담당
    - _error.js:
    - pages 폴더: 실제 컴포넌트 담당

# eslint setting
    {
        "parser": "babel-eslint", // eslint에서 babel 최신 문법 사용하기 위함
        "parserOptions": { // 파싱 옵션 설정
            "ecmaVersion": 2018, // 스크립트 2018기준
            "sourceType": "module", // import, export 사용하기 위함
            "ecmaFeatures": {
                "jsx": true // jsx 경고 방지
            }
        },
        "env": { // 개발환경
            "browser": true, // react는 브라우저에서 돌아가니까 true
            "node": true // 노드를 사용하니까 true
        },
        "extends": [
            "eslint:recommended", // eslint가 추천하는 기본 코딩스타일
            "plugin:react/recommended" // react 코딩을 할때 eslint가 추천하는 코딩 스타일
        ],
        "plugins": [
            "import", // import 문법 가능하게
            "react-hooks" // hooks 문법 가능하게
        ],
        "rules": {
            "no-underscore-dangle": 0, // 엄격한 airbnb룰을 안따르게
            "react/forbid-prop-types": 0,
            "react/jsx-filename-extension": 0, // file확장자 .js 가능하게
            "linebreak-style": 0 // 줄바꿈
        }
    }

# redux
    - Action: state를 바꾸는 행동 ex) 로그인 액션
    - Dispatch: Action을 실행 ex) 로그인 액션 dispatch
    - Reducer: Action의 결과로 state를 어떻게 바꿀지 정의

# redux-saga
    - redux는 비동기 동작이 가능하지 않기때문에 서버와 요청 응답을 비동기로 처리해야 할때 필요하다
    - ex) redux-saga에서 LOG_IN 액션이 실행되는지 대기 -> redux에서 LOG_IN 액션실행 -> redux-saga에서 비동기 동작 실행 서버에서 로그인이 성공인지 실패인지

# Login Cycle
    - LoginForm.js에 onSubmitForm 함수 실행 -> LOG_IN_REQUEST가 dispatch 됨 -> const reducer에  switch문에 LOG_IN_REQUEST가 걸리면서 리턴, 동시에 user saga에서 watchLogin 함수안에 LOG_IN_REQUEST가 실행되면서 login 함수가 실행 -> try catch 문에서 LOG_IN_SUCCESS가 걸리면서 다시 const reducer에 switch문에 LOG_IN_SUCCESS가 리턴  

# SignUp Cycle
    - signup.js에 onSubmitForm 함수 실행 -> SIGN_UP_REQUEST가 dispatch 됨 -> const reducer에  switch문에 SIGN_UP_REQUEST가 걸리면서 리턴, 동시에 user saga에서 watchSignUp 함수안에 SIGN_UP_REQUEST가 실행되면서 signUp 함수가 실행 -> try catch 문에서 SIGN_UP_SUCCESS가 걸리면서 다시 const reducer에 switch문에 SIGN_UP_SUCCESS가 리턴

# Article Write Cycle
    - PostForm.js에 onSubmitForm 함수 실행 -> ADD_POST_REQUEST가 dispatch 됨 -> const reducer에  switch문에 ADD_POST_REQUEST가 걸리면서 리턴, 동시에 post saga에서 watchAddPost 함수안에 ADD_POST_REQUEST가 실행되면서 addPost 함수가 실행 -> try catch 문에서 ADD_POST_SUCCESS가 걸리면서 다시 const reducer에 switch문에 ADD_POST_SUCCESS가 리턴

# Comment Write Cycle
    - PostCard.js에 onSubmitComment 함수 실행 -> ADD_COMMENT_REQUEST가 dispatch 됨 -> const reducer에 switch문에 ADD_COMMENT_REQUEST가 걸리면서 리턴, 동시에 post saga에서 watchAddComment 함수안에 ADD_COMMENT_REQUEST가 실행되면서 addComment 함수가 실행 -> try catch 문에서 ADD_POST_SUCCESS가 걸리면서 ADD_COMMENT_REQUEST가 dispatch 될때 넘어온 post.id를 다시 const reducer에 switch문에 ADD_COMMENT_SUCCESS으로 넘겨준다 -> findIndex 함수로 댓글을 등록한 post.id 찾고 리턴

# getInitialProps Cycle
    - 