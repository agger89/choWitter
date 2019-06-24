// 초기 state값, store안에 들어감
// 여러곳에서 쓰이기 때문에 export를 해서 모듈로 만듬
export const initialState = {
    mainPosts: [],
};

// 액션의 이름
const ADD_POST = 'ADD_POST';
const ADD_DUMMY = 'ADD_DUMMY';

// 실제 액션
// 여러곳에서 쓰이기 때문에 export를 해서 모듈로 만듬
export const addPost = {
    type: ADD_POST,
};

// 여러곳에서 쓰이기 때문에 export를 해서 모듈로 만듬
export const addDummy = {
    type: ADD_DUMMY,
    data: {
        content: 'hello',
        UserId: 1,
        User: {
            nickname: '조니'
        },
    }
};

// setState라고 생각하면됨, action의 결과로 state를 바꿈
// 상단에 선언한 initialState가 리듀서안에 들어감
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            return {
                // 스프레드 문법: 새로운 배열,객체를 생성한다
                // 불변성, 예전 state와 지금 state가 달라졌는지
                ...state,
            };
        }
        case ADD_DUMMY: {
            return {
                ...state,
                mainPosts: [action.data, ...state.mainPosts],
            };
        }
    }
};

export default reducer;