// 불변성 처리 라이브러리 immer
import produce from 'immer';

// 초기 state값, store안에 들어감
// 여러곳에서 쓰이기 때문에 export를 해서 모듈로 만듬
export const initialState = {
  // 데이터 생겨서 주석
  // mainPosts: [{
  //   id: 1,
  //   User: {
  //     id: 1,
  //     nickname: '조니',
  //   },
  //   content: '첫번째 게시글',
  //   img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9xyT3SoXf5ojhRUHVUKafAo6z2QrnDvIpCn-ubRXskLozK1Mt_Q',
  //   Comments: [],
  // }], // 화면에 보일 포스트들
  mainPosts: [], // 화면에 보일 포스트들
  imagePaths: [], // 미리보기 이미지 경로
  addPostErrorReason: false, // 포스트 업로드 실패 사유
  isAddingPost: false, // 포스트 업로드 중
  postAdded: false, // 포스트 업로드 성공
  isAddingComment: false, // 댓글 업로드 중
  commentAdded: false, // 댓글 업로드 성공
  addCommentErrorReason: '', // 댓글 업로드 실패 사유
  hasMorePost: false, // 더불러오기 스크롤 활성화 유무
  singlePost: null, // 개별 포스트
  resultHash: false,
};

// 데이터 생겨서 주석
// const dummyPost = {
//   id: 2,
//   User: {
//     id: 1,
//     nickname: '조니',
//   },
//   content: '나는 더미입니다.',
//   Comments: [],
// };

// const dummyComment = {
//   id: 1,
//   User: {
//     id: 1,
//     nickname: '조니',
//   },
//   createAt: new Date(),
//   content: '더미 댓글입니다.',
// };

// 액션의 이름
// 메인 포스트 로딩 액션
export const LOAD_MAIN_POSTS_REQUEST = 'LOAD_MAIN_POSTS_REQUEST';
export const LOAD_MAIN_POSTS_SUCCESS = 'LOAD_MAIN_POSTS_SUCCESS';
export const LOAD_MAIN_POSTS_FAILURE = 'LOAD_MAIN_POSTS_FAILURE';
// 해시태그 결과 로딩 액션
export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';
// 사용자 게시글 로딩 액션
export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';
// 이미지 업로드 액션
export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'LOAD_USER_POSTS_FAILURE';
// 이미지 업로드 취소 액션
export const REMOVE_IMAGE = 'REMOVE_IMAGE';
// 게시글 등록 액션
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';
// 좋아요 액션
export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';
// 좋아요 취소 액션
export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';
// 댓글 등록 액션
export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';
// 댓글 불러오는 액션
export const LOAD_COMMENTS_REQUEST = 'LOAD_COMMENTS_REQUEST';
export const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS';
export const LOAD_COMMENTS_FAILURE = 'LOAD_COMMENTS_FAILURE';
// 리트윗 액션
export const RETWEET_REQUEST = 'RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'RETWEET_FAILURE';
// 포스트 제거 액션
export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';
// 개별 포스트 로딩 액션
export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

// 실제 액션
// 여러곳에서 쓰이기 때문에 export를 해서 모듈로 만듬
// view단에서 type으로 바로 dispatch해서 주석처리 ( 액션이 많아서 복잡성 때문에 )
// export const addPostRequestAction = data => ({
//   type: ADD_POST_REQUEST,
//   data,
// });

// export const addCommentRequestAction = data => ({
//   type: ADD_COMMENT_REQUEST,
//   data: {
//     postId: data.id,
//   },
// });

// setState라고 생각하면됨, action의 결과로 state를 바꿈
// 상단에 선언한 initialState가 리듀서안에 들어감
const reducer = (state = initialState, action) => {
  // state = draft
  return produce(state, (draft) => {
    switch (action.type) {
      case UPLOAD_IMAGES_REQUEST: {
        // immer code
        // 바꿀게 없을떄는 break
        break;
        // return {
        //   ...state,
        // };
      }
      case UPLOAD_IMAGES_SUCCESS: {
        // immer code
        action.data.forEach((p) => {
          draft.imagePaths.push(p);
        });
        break;
        // return {
        //   ...state,
        //   imagePaths: [...state.imagePaths, ...action.data],
        // };
      }
      case UPLOAD_IMAGES_FAILURE: {
        // immer code
        break;
        // return {
        //   ...state,
        // };
      }
      case REMOVE_IMAGE: {
        // immer code
        const index = draft.imagePaths.findIndex((v, i) => i === action.index);
        // 위에서 추출한 배열만 제거후 리턴
        draft.imagePaths.splice(index, 1);
        break;
        // return {
        //   ...state,
        //   // dispatch 되서 넘어온 index값만 빼고 다시 뿌려준다
        //   // 그러므로 이미지 한개 삭제 기능
        //   imagePaths: state.imagePaths.filter((v, i) => i !== action.index),
        // };
      }
      case ADD_POST_REQUEST: {
        // immer code
        draft.isAddingPost = true;
        draft.addPostErrorReason = '';
        draft.postAdded = false;
        break;
        // return {
        //   // 스프레드 문법: 새로운 배열,객체를 생성한다
        //   // 불변성, 예전 state와 지금 state가 달라졌는지
        //   ...state,
        //   isAddingPost: true,
        //   addPostErrorReason: '',
        //   postAdded: false,
        // };
      }
      // ADD_POST_SUCCESS 액션이 발생하면
      // 불변성의 법칙으로 ...state.mainPosts로 기존 state를 일단 불러오고
      // 그다음 제일 상단에 선언한 초기 state의 mainPosts 배열안에
      // action.data를 배열안에 넣어준다
      // 그러면 이제 state 안에 mainPosts에 값들이 변경 및 추가 된다
      case ADD_POST_SUCCESS: {
        // immer code
        draft.isAddingPost = false;
        // mainPosts 배열의 맨 앞쪽에 추가
        draft.mainPosts.unshift(action.data);
        draft.postAdded = true;
        draft.imagePaths = [];
        break;
        // return {
        //   ...state,
        //   isAddingPost: false,
        //   mainPosts: [action.data, ...state.mainPosts],
        //   postAdded: true,
        //   imagePaths: [],
        // };
      }
      case ADD_POST_FAILURE: {
        // immer code
        draft.isAddingPost = false;
        draft.addPostErrorReason = action.error;
        break;
        // return {
        //   ...state,
        //   isAddingPost: false,
        //   addPostErrorReason: action.error,
        //   postAdded: false,
        // };
      }
      case ADD_COMMENT_REQUEST: {
        // immer code
        draft.isAddingComment = true;
        draft.addCommentErrorReason = '';
        draft.commentAdded = false;
        break;
        // return {
        //   ...state,
        //   isAddingComment: true,
        //   addCommentErrorReason: '',
        //   commentAdded: false,
        // };
      }
      case ADD_COMMENT_SUCCESS: {
        // immer code
        const postIndex = draft.mainPosts.findIndex(v => v.id === action.data.postId);
        // 위에서 찾은 index에 해당하는 게시물에 댓글 추가
        draft.mainPosts[postIndex].Comments.push(action.data.comment);
        draft.isAddingComment = false;
        draft.commentAdded = true;
        break;
        // // 바뀔 객체만 새로 만들어주는 작업 (불변성)
        // // 액션이 일어난 포스트의 index 번호 찾고
        // // action.data.postId: saga에서 받은 값
        // const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId);
        // // 위에서 찾은 index에 해당하는 포스트
        // const post = state.mainPosts[postIndex];
        // // 해당 포스트에 기존 댓글 불러오고(불변성), 추가 댓글 넣어줌
        // const Comments = [...post.Comments, action.data.comment];
        // // 기존의 포스트들 불러오고(불변성)
        // const mainPosts = [...state.mainPosts];
        // // 해당 포스트에 기존 데이터들 불러오고, 댓글 추가
        // mainPosts[postIndex] = { ...post, Comments };
        // return {
        //   ...state,
        //   isAddingComment: false,
        //   mainPosts,
        //   commentAdded: true,
        // };
      }
      case ADD_COMMENT_FAILURE: {
        // immer code
        draft.isAddingComment = false;
        draft.addCommentErrorReason = action.error;
        draft.commentAdded = false;
        break;
        // return {
        //   ...state,
        //   isAddingComment: false,
        //   addCommentErrorReason: action.error,
        //   commentAdded: false,
        // };
      }
      case LOAD_COMMENTS_SUCCESS: {
        // immer code
        const postIndex = draft.mainPosts.findIndex(v => v.id === action.data.postId);
        // 위에서 찾은 index에 해당하는 게시물에 댓글 불러오기
        draft.mainPosts[postIndex].Comments = action.data.comments;
        break;
        // const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId);
        // const post = state.mainPosts[postIndex];
        // const Comments = action.data.comments;
        // const mainPosts = [...state.mainPosts];
        // mainPosts[postIndex] = { ...post, Comments };
        // return {
        //   ...state,
        //   mainPosts,
        // };
      }
      // 페이지가 로드 될때 포스트 불러오기
      // 세개의 액션이 같은 동작을 처리하면
      // 아래와 같이 세개를 같이 사용할 수 있다.
      case LOAD_MAIN_POSTS_REQUEST:
      case LOAD_HASHTAG_POSTS_REQUEST:
      case LOAD_USER_POSTS_REQUEST: {
        // immer code
        draft.resultHash = false;
        draft.mainPosts = !action.lastId ? [] : draft.mainPosts;
        draft.hasMorePost = action.lastId ? draft.hasMorePost : true;
        break;
        // return {
        //   ...state,
        //   // 새로 로딩 될떄는 기존 게시글을 없앤후 [] 아래 SUCCESS에서 새로 만들고
        //   // lastId없으면 새 배열
        //   mainPosts: !action.lastId ? [] : state.mainPosts,
        //   // 처음 불러오는 거면 lastId가 0이니까 거짓 그래서 스크롤 활성화(true)
        //   hasMorePost: action.lastId ? state.hasMorePost : true,
        // };
      }
      case LOAD_MAIN_POSTS_SUCCESS:
      case LOAD_HASHTAG_POSTS_SUCCESS:
      case LOAD_USER_POSTS_SUCCESS: {
        // immer code
        draft.resultHash = true;
        action.data.forEach((d) => {
          draft.mainPosts.push(d);
        });
        draft.hasMorePost = action.data.length === 10;
        break;
        // return {
        //   ...state,
        //   // concat: 기존 배열을 변경하지 않고 추가된 배열과 함꺠 불러온다
        //   mainPosts: state.mainPosts.concat(action.data),
        //   // 불러온 게시글이 10개면 스크롤 활성화(true)
        //   hasMorePost: action.data.length === 10,
        // };
      }
      case LOAD_MAIN_POSTS_FAILURE:
      case LOAD_HASHTAG_POSTS_FAILURE:
      case LOAD_USER_POSTS_FAILURE: {
        // immer code
        draft.resultHash = false;
        break;
        // return {
        //   ...state,
        // };
      }
      case LIKE_POST_REQUEST: {
        // immer code
        break;
        // return {
        //   ...state,
        // };
      }
      case LIKE_POST_SUCCESS: {
        // immer
        const postIndex = draft.mainPosts.findIndex(v => v.id === action.data.postId);
        // 위에서 찾은 index에 해당하는 게시물에 좋아요 목록 제일 앞쪽에 나 추가
        draft.mainPosts[postIndex].Likers.unshift({ id: action.data.userId });
        break;
        // const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId);
        // const post = state.mainPosts[postIndex];
        // // 좋아요 누른 사람 목록에 내 아이디 추가
        // const Likers = [{ id: action.data.userId }, ...post.Likers];
        // const mainPosts = [...state.mainPosts];
        // mainPosts[postIndex] = { ...post, Likers };
        // return {
        //   ...state,
        //   mainPosts,
        // };
      }
      case LIKE_POST_FAILURE: {
        // immer code
        break;
        // return {
        //   ...state,
        // };
      }
      case UNLIKE_POST_REQUEST: {
        // immer code
        break;
        // return {
        //   ...state,
        // };
      }
      case UNLIKE_POST_SUCCESS: {
        // immer
        const postIndex = draft.mainPosts.findIndex(v => v.id === action.data.postId);
        // 위에서 찾은 index에 해당하는 게시물에 좋아요 목록에 해당 index를 찾는다
        const likeIndex = draft.mainPosts[postIndex].Likers.findIndex(v => v.id === action.data.userId);
        // 위에서 찾은 postIndex에 해당하는 게시물에 좋아요 목록에서 위에서 찾은 likeIndex를 지운다
        draft.mainPosts[postIndex].Likers.splice(likeIndex, 1);
        break;
        // const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId);
        // const post = state.mainPosts[postIndex];
        // // 좋아요 누른 사람 목록에서 내 아이디만 빼준다
        // const Likers = post.Likers.filter(v => v.id !== action.data.userId);
        // const mainPosts = [...state.mainPosts];
        // mainPosts[postIndex] = { ...post, Likers };
        // return {
        //   ...state,
        //   mainPosts,
        // };
      }
      case UNLIKE_POST_FAILURE: {
        // immer code
        break;
        // return {
        //   ...state,
        // };
      }
      case RETWEET_REQUEST: {
        // immer code
        break;
        // return {
        //   ...state,
        // };
      }
      case RETWEET_SUCCESS: {
        // immer code
        draft.mainPosts.unshift(action.data);
        break;
        // return {
        //   ...state,
        //   // 리트윗한 게시글을 기존 게시글들에 넣어주기
        //   mainPosts: [action.data, ...state.mainPosts],
        // };
      }
      case RETWEET_FAILURE: {
        // immer code
        break;
        // return {
        //   ...state,
        // };
      }
      case REMOVE_POST_REQUEST: {
        // immer code
        break;
        // return {
        //   ...state,
        // };
      }
      case REMOVE_POST_SUCCESS: {
        // immer code
        const index = draft.mainPosts.findIndex(v => v.id === action.data);
        // 위에서 찾은 index에 해당하는 게시물 제거
        draft.mainPosts.splice(index, 1);
        break;
        // return {
        //   ...state,
        //   // 불변성 적용: 넘어온 action.data와 id값이 맞지 않는 포스트들은 전부 리턴
        //   // 그렇게되면 한개의 포스트만 지워지게 됨
        //   mainPosts: state.mainPosts.filter(v => v.id !== action.data),
        // };
      }
      case REMOVE_POST_FAILURE: {
        // immer code
        break;
        // return {
        //   ...state,
        // };
      }
      // 개별 포스트 등록
      case LOAD_POST_SUCCESS: {
        draft.singlePost = action.data;
        break;
      }
      // 액션이 아무것도 해당되지 않을때 기본값
      default: {
        // immer code
        break;
        // return {
        //   ...state,
        // };
      }
    }
  });
};

export default reducer;
