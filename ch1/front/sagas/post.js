import {
  all, fork, put, takeLatest, call,
} from 'redux-saga/effects';
import axios from 'axios';
import {
  ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
  LOAD_MAIN_POSTS_REQUEST, LOAD_MAIN_POSTS_SUCCESS, LOAD_MAIN_POSTS_FAILURE,
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
  LOAD_COMMENTS_REQUEST, LOAD_COMMENTS_SUCCESS, LOAD_COMMENTS_FAILURE,
  LOAD_HASHTAG_POSTS_REQUEST, LOAD_HASHTAG_POSTS_SUCCESS, LOAD_HASHTAG_POSTS_FAILURE,
  LOAD_USER_POSTS_REQUEST, LOAD_USER_POSTS_SUCCESS, LOAD_USER_POSTS_FAILURE,
  UPLOAD_IMAGES_REQUEST, UPLOAD_IMAGES_SUCCESS, UPLOAD_IMAGES_FAILURE,
  LIKE_POST_REQUEST, LIKE_POST_SUCCESS, LIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST, UNLIKE_POST_SUCCESS, UNLIKE_POST_FAILURE,
  RETWEET_REQUEST, RETWEET_SUCCESS, RETWEET_FAILURE,
  REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE, REMOVE_POST_OF_ME,
} from '../reducers/post';
import { ADD_POST_TO_ME } from '../reducers/user';

function addPostAPI(postData) {
  return axios.post('/post', postData, {
    // 로그인 한 사람만 글을 작성할수 있게 하기 위해서 쿠키인증
    withCredentials: true,
  });
}

function* addPost(action) {
  try {
    // 새로운 포스트 등록된거 받는
    // 서버의 응답은 result
    // action은 ADD_POST_REQUEST가 dispatch될때 보내준 action.data
    const result = yield call(addPostAPI, action.data);
    // post reducer
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
    // user reducer
    // 게시글이 작성될때
    // 좌측 프로필 게시글 갯수 증가
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id,
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

function loadMainPostsAPI() {
  // 게시물은 로그인 안한 유저도 볼수 있기 때문에
  // withCredentials 넣지 않아도 된다
  return axios.get('/posts');
}

function* loadMainPosts() {
  try {
    // 서버의 응답은 result
    const result = yield call(loadMainPostsAPI);
    yield put({
      type: LOAD_MAIN_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: LOAD_MAIN_POSTS_FAILURE,
      error: e,
    });
  }
}

function* watchloadMainPosts() {
  yield takeLatest(LOAD_MAIN_POSTS_REQUEST, loadMainPosts);
}

function loadHashtagPostsAPI(tag) {
  // encodeURIComponent: 한글과 특수문자 인코딩
  return axios.get(`/hashtag/${encodeURIComponent(tag)}`);
}

function* loadHashtagPosts(action) {
  try {
    // 서버의 응답은 result
    const result = yield call(loadHashtagPostsAPI, action.data);
    yield put({
      type: LOAD_HASHTAG_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: LOAD_HASHTAG_POSTS_FAILURE,
      error: e,
    });
  }
}

function* watchLoadHashtagPosts() {
  yield takeLatest(LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
}

function loadUserPostsAPI(id) {
  // id || 0: SSR 적용위해 0도 요청가능
  return axios.get(`/user/${id || 0}/posts`);
}

function* loadUserPosts(action) {
  try {
    // 서버의 응답은 result
    const result = yield call(loadUserPostsAPI, action.data);
    yield put({
      type: LOAD_USER_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: LOAD_USER_POSTS_FAILURE,
      error: e,
    });
  }
}

function* watchLoadUserPosts() {
  yield takeLatest(LOAD_USER_POSTS_REQUEST, loadUserPosts);
}

function addCommentAPI(data) {
  // ADD_COMMENT_REQUEST가 dispatch 될떄
  // postId와 content를 보내준다.
  return axios.post(`/post/${data.postId}/comment`, { content: data.content }, {
    withCredentials: true,
  });
}

function* addComment(action) {
  try {
    // 서버로부터 받은데이터 아래에 ADD_COMMENT_SUCCESS에 넣어준다
    const result = yield call(addCommentAPI, action.data);
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
        comment: result.data,
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

function loadCommentsAPI(postId) {
  // 불러올때는 get
  return axios.get(`/post/${postId}/comments`);
}

function* loadComments(action) {
  try {
    const result = yield call(loadCommentsAPI, action.data);
    yield put({
      type: LOAD_COMMENTS_SUCCESS,
      data: {
        postId: action.data,
        comments: result.data,
      },
    });
  } catch (e) {
    // console.error(e);
    yield put({
      type: LOAD_COMMENTS_FAILURE,
      error: e,
    });
  }
}

function* watchLoadComments() {
  yield takeLatest(LOAD_COMMENTS_REQUEST, loadComments);
}

function uploadImagesAPI(formData) {
  return axios.post('/post/images', formData, {
    withCredentials: true,
  });
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      // 서버에 저장된 이미지 주소
      data: result.data,
    });
  } catch (e) {
    // console.error(e);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: e,
    });
  }
}

function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

// 좋아요
function likePostAPI(postId) {
  return axios.post(`/post/${postId}/like`, {}, {
    withCredentials: true,
  });
}

function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.data);
    yield put({
      type: LIKE_POST_SUCCESS,
      // 서버에 저장된 게시물 아이디, 게시물에 좋아요를 누른 유저 아이디
      data: {
        postId: action.data,
        userId: result.data.userId,
      },
    });
  } catch (e) {
    // console.error(e);
    yield put({
      type: LIKE_POST_FAILURE,
      error: e,
    });
  }
}

function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}

// 좋아요 취소
function unlikePostAPI(postId) {
  return axios.delete(`/post/${postId}/like`, {
    withCredentials: true,
  });
}

function* unlikePost(action) {
  try {
    const result = yield call(unlikePostAPI, action.data);
    yield put({
      type: UNLIKE_POST_SUCCESS,
      // 서버에 저장된 게시물 아이디, 게시물에 좋아요를 누른 유저 아이디
      data: {
        postId: action.data,
        userId: result.data.userId,
      },
    });
  } catch (e) {
    // console.error(e);
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: e,
    });
  }
}

function* watchUnlikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}

// 리트윗
function retweetAPI(postId) {
  return axios.post(`/post/${postId}/retweet`, {}, {
    withCredentials: true,
  });
}

function* retweet(action) {
  try {
    const result = yield call(retweetAPI, action.data);
    yield put({
      type: RETWEET_SUCCESS,
      // 서버에 저장된 리트윗한 데이터
      data: result.data,
    });
  } catch (e) {
    // console.error(e);
    // console.dir(e);
    yield put({
      type: RETWEET_FAILURE,
      error: e,
    });
    // 자신의 글 리트윗 불가능 알림창 (백엔드에서 처리되어있음)
    alert(e.response && e.response.data);
  }
}

function* watchRetweet() {
  yield takeLatest(RETWEET_REQUEST, retweet);
}

// 포스트 삭제
function removePostAPI(postId) {
  return axios.delete(`/post/${postId}`, {
    withCredentials: true,
  });
}

function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data,
    });
    // user reducer
    // 게시글이 삭제될때
    // 좌측 프로필 게시글 갯수 감소
    yield put({
      type: REMOVE_POST_OF_ME,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: REMOVE_POST_FAILURE,
      error: e,
    });
    alert(e.response && e.response.data);
  }
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

export default function* postSaga() {
  yield all([
    // fork: 함수를 비동기적으로 호출
    fork(watchloadMainPosts),
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchLoadComments),
    fork(watchLoadHashtagPosts),
    fork(watchLoadUserPosts),
    fork(watchUploadImages),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchRetweet),
    fork(watchRemovePost),
  ]);
}
