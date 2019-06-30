// saga pattern: 제일 아래 userSaga 함수에 yield all 안에 watchLogin 함수를 등록해놓고
// -> watchLogin에서는 takeLatest 또는 takeEvery 결정하고 -> 실제로 동작할 함수는 위에서 만들어주고 그걸 넣어준다

import {
  all, fork, takeLatest, call, put,
} from 'redux-saga/effects';
import { LOG_IN, LOG_IN_SUCCESS, LOG_IN_FAILURE } from '../reducers/user';

function loginAPI() {
  // 서버에 요청을 보내는 부분
}

function* login() {
  try {
    // yield: 중단점 역할
    // call: 함수를 동기적으로 호출
    // 서버에 요청해서 서버에서 로그인이 성공하면 다음줄 실행 (call로 하는 이유 동기적 실행)
    yield call(loginAPI);
    // put: dispatch와 동일
    yield put({
      type: LOG_IN_SUCCESS,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({ // put: dispatch와 동일
      type: LOG_IN_FAILURE,
    });
  }
}

function* watchLogin() {
  // takeLatest: 액션을 여러번 동시에 실행하게 되는 경우 마지막 액션만 실행되게 해준다.
  // ex) 유저가 로그인을 하려고 로그인 버튼을 여러번 눌렀을때 마지막 액션만 실행된다. 기존 클릭은 무시
  // LOG_IN 액션이 dispatch 되길 기다려서
  // dispatch될 떄 위에 만든 login 제너레이터함수를 호출합니다.
  yield takeLatest(LOG_IN, login);

  // takeEvery: 액션을 여러번 동시에 실행해도 전부 실행된다.
  // ex) 버튼을 클릭으로 숫자를 증가시키는 이벤트를 만들때 적합하다.
  // yield takeEvery(LOG_IN, login)
}

export default function* userSaga() {
  // all: 여러 사가 effects를 동시에 실행할 수 있게 한다.
  yield all([
    // fork: 함수를 비동기적으로 호출
    fork(watchLogin),
  ]);
}
