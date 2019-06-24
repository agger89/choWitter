// 초기 state값, store안에 들어감
const initialState = {
    isLoggedIn: false,
    user: {},
};

// 액션의 이름
const LOG_IN = 'LOG_IN'; 
const LOG_OUT = 'LOG_OUT';

// 실제 액션
const loginAction = {
    type: LOG_IN,
    data: {
        nickname: '조니',
    }
};

const logoutAction = {
    type: LOG_OUT,
};

// setState라고 생각하면됨, action의 결과로 state를 바꿈
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN: {
            return {
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
        default:
            return state;
    }
};
