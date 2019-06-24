// reducer를 하나로 합쳐준다
import { combineReducers } from 'redux';
import user from './user';
import post from './post';

// 자식 리듀서를 루트 리듀서 안에다가 넣어줌
const rootReducer = combineReducers({
    user,
    post
});

export default rootReducer;