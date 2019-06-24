// 초기 state값, store안에 들어감
// 여러곳에서 쓰이기 때문에 export를 해서 모듈로 만듬
export const initialState = {
    isLoggedIn: false,
    user: {},
};

// 액션의 이름
const LOG_IN = 'LOG_IN'; 
const LOG_OUT = 'LOG_OUT';

// 실제 액션
// 여러곳에서 쓰이기 때문에 export를 해서 모듈로 만듬
export const loginAction = {
    type: LOG_IN,
    data: {
        nickname: '조니',
    }
};

// 여러곳에서 쓰이기 때문에 export를 해서 모듈로 만듬
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
                user: action.data,
            }
        }
        case LOG_OUT: {
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            }
        }
        // 액션이 아무것도 해당되지 않을때 기본값
        default: {
            return {
                ...state,
            }
        }
    }
};

export default reducer;