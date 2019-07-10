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

// 공통된 api url 따로 분리
// axios.defaults.baseURL: 기본적으로 아래의 api 주소에 들어감
axios.defaults.baseURL = 'http://localhost:3065/api';

function loginAPI(loginData) {
  // 서버에 요청을 보내는 부분
  return axios.post('/user/login', loginData, {
    // 서로 다른 도메인간 쿠키값 읽어오기
    withCredentials: true,
  });
}

function* login(action) {
  try {
    // yield: 중단점 역할
    // yield delay(2000);
    // call: 함수를 동기적으로 호출
    // 서버에 요청해서 서버에서 로그인이 성공하면 다음줄 실행 (call로 하는 이유 동기적 실행)
    // put: dispatch와 동일
    const result = yield call(loginAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      // 백엔드에서 응답 온 정보
      data: result.data,
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

function signUpAPI(signUpData) {
  // 서버에 요청을 보내는 부분
  // 다른 서버이기 때문에 http://localhost:3065 붙여준다
  // post:
  // 첫번째 인자는 주소, 두번째 인자는 데이터
  return axios.post('/user/', signUpData);
}

function* signUp(action) {
  try {
    // yield: 중단점 역할
    // 서버에 요청해서 서버에서 로그인이 성공하면 다음줄 실행 (call로 하는 이유 동기적 실행)
    // call:
    // 함수를 동기적으로 호출
    // 첫번째는 함수,
    // 두번째는 인자
    // (signup.js 에서 SIGN_UP_REQUEST가 dispatch 될때 넘어온 데이터 제일 상단 signUp(action) 에서 받아온다)
    // (위에 signUpAPI(signUpData) 함수에 인자로 전달할수 있다)
    yield call(signUpAPI, action.data);
    // yield delay(2000);
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
