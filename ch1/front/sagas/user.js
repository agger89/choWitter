// saga pattern: 제일 아래 userSaga 함수에 yield all 안에 watchLogin 함수를 등록해놓고
// -> watchLogin에서는 takeLatest 또는 takeEvery 결정하고 -> 실제로 동작할 함수는 위에서 만들어주고 그걸 넣어준다

import {
  all, fork, takeEvery, call, put,
} from 'redux-saga/effects';
import axios from 'axios';
import {
  LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
  LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
  SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
  LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE,
} from '../reducers/user';

function logInAPI(logInData) {
  // 서버에 요청을 보내는 부분
  return axios.post('/user/login', logInData, {
    // 서로 다른 도메인간 쿠키값 읽어오기
    withCredentials: true,
  });
}

function* logIn(action) {
  try {
    // yield: 중단점 역할
    // 서버에 요청해서 서버에서 로그인이 성공하면 다음줄 실행 (call로 하는 이유 동기적 실행)
    // call:
    // 함수를 동기적으로 호출
    // 첫번째는 함수,
    // 두번째는 인자
    // (LOG_IN_REQUEST가 dispatch 될때 넘어온 데이터 제일 상단 logIn(action) 에서 받아온다)
    // (위에 logInAPI(logInData) 함수에 인자로 전달할수 있다)
    // 서버의 응답은 result
    // action은 LOG_IN_REQUEST가 dispatch될때 보내준 action.data
    const result = yield call(logInAPI, action.data);
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

function* watchLogIn() {
  // takeEvery: 액션을 여러번 동시에 실행해도 전부 실행된다.
  // ex) 버튼을 클릭으로 숫자를 증가시키는 이벤트를 만들때 적합하다.
  // LOG_IN_REQUEST 액션이 dispatch 되길 기다려서
  // dispatch될 떄 위에 만든 login 제너레이터함수를 호출합니다.
  yield takeEvery(LOG_IN_REQUEST, logIn);
}

function logOutAPI() {
  // 로그아웃 할떄는 위에 로그인 처럼 데이터를 인자로 넣을 필요가 없다
  // 쿠키값만 보내주면 됨
  // data가 없더라도 두번째 인자에 {} 빈객체를 넣어줘야한다
  return axios.post('/user/logout', {}, {
    withCredentials: true,
  });
}

function* logOut() {
  try {
    yield call(logOutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOG_OUT_FAILURE,
      error: e,
    });
  }
}

function* watchLogOut() {
  yield takeEvery(LOG_OUT_REQUEST, logOut);
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
    // action은 SIGN_UP_REQUEST가 dispatch될때 보내준 action.data
    yield call(signUpAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: SIGN_UP_FAILURE,
      error: e,
    });
  }
}

function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}

// 사용자 정보 가져오는 액션 구역
// 쿠키가 있을시 새로고침해도 다시 로그인 상태로 남아있게
function loadUserAPI(userId) {
  // 사용자 정보 가져올때는 get
  // userId가 있으면 남의 정보 없으면 내정보 가져오기
  return axios.get(userId ? `/user/${userId}` : '/user/', {
    // 서로 다른 도메인간 쿠키값 읽어오기
    withCredentials: true,
  });
}

function* loadUser(action) {
  try {
    // result에 데이터 담기
    // 서버의 응답은 result
    const result = yield call(loadUserAPI, action.data);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
      // userId(action.data)가 남의 정보니까 없으면 내정보 불러오기
      me: !action.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_USER_FAILURE,
      error: e,
    });
  }
}

function* watchLoadUser() {
  yield takeEvery(LOAD_USER_REQUEST, loadUser);
}

export default function* userSaga() {
  // all: 여러 사가 effects를 동시에 실행할 수 있게 한다.
  yield all([
    // fork: 함수를 비동기적으로 호출
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchLoadUser),
  ]);
}
