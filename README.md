# choWitter

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