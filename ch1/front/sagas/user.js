// saga pattern: 제일 아래 userSaga 함수에 yield all 안에 watchLogin 함수를 등록해놓고
// -> watchLogin에서는 takeLatest 또는 takeEvery 결정하고 -> 실제로 동작할 함수는 위에서 만들어주고 그걸 넣어준다

import {
  all, fork, takeLatest, takeEvery, call, put, delay,
} from 'redux-saga/effects';
import axios from 'axios';
import {
  LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
  SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
} from '../reducers/user';

function loginAPI() {
  // 서버에 요청을 보내는 부분
  return axios.post('/login');
}

function* login() {
  try {
    // yield: 중단점 역할
    yield delay(2000);
    // call: 함수를 동기적으로 호출
    // 서버에 요청해서 서버에서 로그인이 성공하면 다음줄 실행 (call로 하는 이유 동기적 실행)
    // yield call(loginAPI);
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
  // takeEvery: 액션을 여러번 동시에 실행해도 전부 실행된다.
  // ex) 버튼을 클릭으로 숫자를 증가시키는 이벤트를 만들때 적합하다.
  // LOG_IN_REQUEST 액션이 dispatch 되길 기다려서
  // dispatch될 떄 위에 만든 login 제너레이터함수를 호출합니다.
  yield takeEvery(LOG_IN_REQUEST, login);
}

function signUpAPI() {
  // 서버에 요청을 보내는 부분
  return axios.post('/signup');
}

function* signUp() {
  try {
    // yield: 중단점 역할
    // call: 함수를 동기적으로 호출
    // 서버에 요청해서 서버에서 로그인이 성공하면 다음줄 실행 (call로 하는 이유 동기적 실행)
    // yield call(signUpAPI);
    yield delay(2000);
    throw new Error('에러에러에러');
    // put: dispatch와 동일
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({ // put: dispatch와 동일
      type: SIGN_UP_FAILURE,
      error: e,
    });
  }
}

function* watchSignUp() {
  // takeEvery: 액션을 여러번 동시에 실행해도 전부 실행된다.
  // ex) 버튼을 클릭으로 숫자를 증가시키는 이벤트를 만들때 적합하다.
  // SIGN_UP_REQUEST 액션이 dispatch 되길 기다려서
  // dispatch될 떄 위에 만든 signUp 제너레이터함수를 호출합니다.
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  // all: 여러 사가 effects를 동시에 실행할 수 있게 한다.
  yield all([
    // fork: 함수를 비동기적으로 호출
    fork(watchLogin),
    fork(watchSignUp),
  ]);
}
