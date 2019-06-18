# choWitter

next
 - 기존 리액트에서는 <Router><Switch>로 페이지 라우터 체계 설정을 해줬는데 next는 알아서 해준다 (서버사이드 랜더링)
 - code spliting: 모든 페이지를 불러오지 않고 사용자가 요청하는 페이지만 불러온다 (서버부담 덜고, 사용자 로딩시간 단축)

- eslint setting
{
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
    ]
}