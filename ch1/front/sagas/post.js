import { all, fork, delay, put, takeLatest } from 'redux-saga/effects';
import { ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE } from '../reducers/post';

function* addPost() {
  try {
    yield delay(2000);
    yield put({
      type: ADD_POST_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: ADD_POST_FAILURE,
    });
  }
}

function* watchAddPost() {
  // takeLatest: 액션을 여러번 동시에 실행하게 되는 경우 마지막 액션만 실행되게 해준다.
  // ex) 유저가 로그인을 하려고 로그인 버튼을 여러번 눌렀을때 마지막 액션만 실행된다. 기존 클릭은 무시
  // ADD_POST_REQUEST 액션이 dispatch 되길 기다려서
  // dispatch될 떄 위에 만든 addPost 제너레이터함수를 호출합니다.
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
  ]);
}
