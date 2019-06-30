import { all, call } from 'redux-saga/effects';
import user from './user';
import post from './post';

// saga도 reducer와 마찬가지로
// rootSaga안에 user, post 사가들을 합쳐준다
export default function* rootSaga() {
  yield all([
    call(user),
    call(post),
  ]);
}
