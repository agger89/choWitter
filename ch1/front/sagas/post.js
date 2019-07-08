import {
  all, fork, delay, put, takeLatest,
} from 'redux-saga/effects';
import {
  ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
} from '../reducers/post';

function addPostAPI() {

}

function* addPost() {
  try {
    yield delay(2000);
    yield put({
      type: ADD_POST_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: ADD_POST_FAILURE,
      error: e,
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

function addCommentAPI() {

}

function* addComment(action) {
  try {
    yield delay(2000);
    // put: dispatch와 동일
    yield put({
      type: ADD_COMMENT_SUCCESS,
      // 댓글이 submit 될떄 ADD_COMMENT_REQUEST가 dispatch되면서 넘겨준 data를
      // ADD_COMMENT_SUCCESS에게 마찬가지로 action.data로 넘겨준다
      // 여기서 데이터를 넘겨주는 이유:
      // 댓글 요청시에 포스트 id가 있으면 잘못된 로직
      // 댓글 성공시에 포스트 id가 있어야 하기때문에
      data: {
        postId: action.data.postId,
      },
    });
  } catch (e) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: e,
    });
  }
}

function* watchAddComment() {
  // takeLatest: 액션을 여러번 동시에 실행하게 되는 경우 마지막 액션만 실행되게 해준다.
  // ex) 유저가 로그인을 하려고 로그인 버튼을 여러번 눌렀을때 마지막 액션만 실행된다. 기존 클릭은 무시
  // ADD_COMMENT_REQUEST 액션이 dispatch 되길 기다려서
  // dispatch될 떄 위에 만든 addComment 제너레이터함수를 호출합니다.
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([
    // fork: 함수를 비동기적으로 호출
    fork(watchAddPost),
    fork(watchAddComment),
  ]);
}