import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import { LOG_IN, LOG_IN_SUCCESS, LOG_IN_FAILURE } from '../reducers/user';

function loginAPI() {
    // 서버에 요청을 보내는 부분
}

function* login() {
    try {
        // 서버에 요청
        // call: 함수를 동기적으로 호출
        // 서버에서 로그인이 성공하면 다음줄 실행
        yield call(loginAPI);
        // put: dispatch와 동일
        yield put({
            type: LOG_IN_SUCCESS
        });
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: LOG_IN_FAILURE
        });
    }
}

function* watchLogin() {
    // takeLatest가 LOG_IN 액션이 dispatch 되길 기다려서
    // dispatch될 떄 위에 만든 login 제너레이터함수를 호출합니다.
    yield takeLatest(LOG_IN, login)
}

export default function* userSaga() {
    yield all([
        // fork: 함수를 비동기적으로 호출
        fork(watchLogin),
    ]);
}