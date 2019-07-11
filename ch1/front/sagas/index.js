import { all, call } from 'redux-saga/effects';
import axios from 'axios';
import user from './user';
import post from './post';

// 공통된 api url 따로 분리
// axios.defaults.baseURL: 기본적으로 post.js와 user.js에서
// post와 get으로 통신할때 주소 앞에 들어감
axios.defaults.baseURL = 'http://localhost:3065/api';

// saga도 reducer와 마찬가지로
// rootSaga안에 user, post 사가들을 합쳐준다
export default function* rootSaga() {
  yield all([
    call(user),
    call(post),
  ]);
}
