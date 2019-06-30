const dummyUser = {
  nickname: '조니',
  Post: [],
  Followings: [],
  Followers: [],
};

// 초기 state값, store안에 들어감
// 여러곳에서 쓰이기 때문에 export를 해서 모듈로 만듬
export const initialState = {
  isLoggedIn: false,
  user: null,
  signUpData: {},
};

// 액션의 이름
export const SIGN_UP = 'SIGN_UP';
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

// 실제 액션
// 여러곳에서 쓰이기 때문에 export를 해서 모듈로 만듬
// 아래 reducer에 action에 넣을 데이터가 동적인 경우에는
// action을 함수로 만들어서 인자로 데이터를 받는다.
export const signUpAction = data => ({
  type: SIGN_UP,
  data,
});
export const loginAction = {
  type: LOG_IN,
};
export const logoutAction = {
  type: LOG_OUT,
};

// setState라고 생각하면됨, action의 결과로 state를 바꿈
// 상단에 선언한 initialState가 리듀서안에 들어감
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN: {
      return {
        // 스프레드 문법: 새로운 배열,객체를 생성한다
        // 불변성, 예전 state와 지금 state가 달라졌는지
        ...state,
        isLoggedIn: true,
        user: dummyUser,
      };
    }
    case LOG_OUT: {
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    }
    case SIGN_UP: {
      return {
        ...state,
        signUpData: action.data,
      };
    }
    // 액션이 아무것도 해당되지 않을때 기본값
    default: {
      return {
        ...state,
      };
    }
  }
};

export default reducer;
