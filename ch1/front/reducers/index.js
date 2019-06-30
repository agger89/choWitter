// reducer를 하나로 합쳐준다
import { combineReducers } from 'redux';
import user from './user';
import post from './post';

// 루트 리듀서 안에 user, post 리듀서를 합쳐준다.
const rootReducer = combineReducers({
  user,
  post,
});

export default rootReducer;