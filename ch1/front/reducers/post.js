// 초기 state값, store안에 들어감
// 여러곳에서 쓰이기 때문에 export를 해서 모듈로 만듬
export const initialState = {
  mainPosts: [{
    id: 1,
    User: {
      id: 1,
      nickname: '조니',
    },
    content: '첫번째 게시글',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9xyT3SoXf5ojhRUHVUKafAo6z2QrnDvIpCn-ubRXskLozK1Mt_Q',
    Comments: [],
  }], // 화면에 보일 포스트들
  imagePath: [], // 미리보기 이미지 경로
  addPostErrorReason: false, // 포스트 업로드 실패 사유
  isAddingPost: false, // 포스트 업로드 중
  postAdded: false, // 포스트 업로드 성공
  isAddingComment: false, // 댓글 업로드 중
  commentAdded: false, // 댓글 업로드 성공
  addCommentErrorReason: '', // 댓글 업로드 실패 사유
};

const dummyPost = {
  id: 2,
  User: {
    id: 1,
    nickname: '조니',
  },
  content: '나는 더미입니다.',
  Comments: [],
};

const dummyComment = {
  id: 1,
  User: {
    id: 1,
    nickname: '조니',
  },
  createAt: new Date(),
  content: '더미 댓글입니다.',
};

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
  switch (action.type) {
    case ADD_POST_REQUEST: {
      return {
        // 스프레드 문법: 새로운 배열,객체를 생성한다
        // 불변성, 예전 state와 지금 state가 달라졌는지
        ...state,
        isAddingPost: true,
        addPostErrorReason: '',
        postAdded: false,
      };
    }
    // ADD_POST_SUCCESS 액션이 발생하면
    // 불변성의 법칙으로 ...state.mainPosts로 기존 state를 일단 불러오고
    // 그다음 제일 상단에 선언한 초기 state의 mainPosts 배열안에
    // const dummyPost의 데이터들을 배열안에 넣어준다
    // 그러면 이제 state 안에 mainPosts에 값들이 변경 및 추가 된다
    case ADD_POST_SUCCESS: {
      return {
        ...state,
        isAddingPost: false,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    }
    case ADD_POST_FAILURE: {
      return {
        ...state,
        isAddingPost: false,
        addPostErrorReason: action.error,
        postAdded: false,
      };
    }
    case ADD_COMMENT_REQUEST: {
      return {
        ...state,
        isAddingComment: true,
        addCommentErrorReason: '',
        commentAdded: false,
      };
    }
    case ADD_COMMENT_SUCCESS: {
      // 액션이 일어난 포스트의 index 번호 찾고
      // action.data.postId: saga에서 받은 값
      const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId);
      // 위에서 찾은 index에 해당하는 포스트
      const post = state.mainPosts[postIndex];
      // 해당 포스트에 기존 댓글 불러오고(불변성), 추가 댓글 넣어줌
      const Comments = [...post.Comments, dummyComment];
      // 기존의 포스트들 불러오고(불변성)
      const mainPosts = [...state.mainPosts];
      // 해당 포스트에 기존 데이터들 불러오고, 댓글 추가
      mainPosts[postIndex] = { ...post, Comments };
      return {
        ...state,
        isAddingComment: false,
        mainPosts,
        commentAdded: true,
      };
    }
    case ADD_COMMENT_FAILURE: {
      return {
        ...state,
        isAddingComment: false,
        addCommentErrorReason: action.error,
        commentAdded: false,
      };
    }
    // 액션이 아무것도 해당되지 않을때 기본값
    default: {
      return {
        ...state,
      };
    }
  }
};

export default reducer;
