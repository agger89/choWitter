// 초기 state값, store안에 들어감
// 여러곳에서 쓰이기 때문에 export를 해서 모듈로 만듬
export const initialState = {
  mainPosts: [{
    User: {
      id: 1,
      nickname: '조니',
    },
    content: '첫번째 게시글',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9xyT3SoXf5ojhRUHVUKafAo6z2QrnDvIpCn-ubRXskLozK1Mt_Q',
  }], // 화면에 보일 포스트들
  imagePath: [], // 미리보기 이미지 경로
  addPostErrorReason: false, // 포스트 업로드 실패 사유
  isAddingPost: false, // 포스트 업로드 중
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
export const LIKE_POSTS_REQUEST = 'LIKE_POSTS_REQUEST';
export const LIKE_POSTS_SUCCESS = 'LIKE_POSTS_SUCCESS';
export const LIKE_POSTS_FAILURE = 'LIKE_POSTS_FAILURE';
// 좋아요 취소 액션
export const UNLIKE_POSTS_REQUEST = 'UNLIKE_POSTS_REQUEST';
export const UNLIKE_POSTS_SUCCESS = 'UNLIKE_POSTS_SUCCESS';
export const UNLIKE_POSTS_FAILURE = 'UNLIKE_POSTS_FAILURE';
// 댓글 등록 액션
export const ADD_COMMENTS_REQUEST = 'ADD_COMMENTS_REQUEST';
export const ADD_COMMENTS_SUCCESS = 'ADD_COMMENTS_SUCCESS';
export const ADD_COMMENTS_FAILURE = 'ADD_COMMENTS_FAILURE';
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
export const addPost = {
  type: ADD_POST_REQUEST,
};

// 여러곳에서 쓰이기 때문에 export를 해서 모듈로 만듬
export const addDummy = {
  type: ADD_POST_SUCCESS,
  data: {
    content: 'hello',
    UserId: 1,
    User: {
      nickname: '조니',
    },
  },
};

// setState라고 생각하면됨, action의 결과로 state를 바꿈
// 상단에 선언한 initialState가 리듀서안에 들어감
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST: {
      return {
        // 스프레드 문법: 새로운 배열,객체를 생성한다
        // 불변성, 예전 state와 지금 state가 달라졌는지
        ...state,
      };
    }
    // ADD_DUMMY 액션이 발생하면
    // 불변성의 법칙으로 ...state 기존 state를 일단 불러오고
    // 그다음 제일 상단에 선언한 초기 state의 mainPosts 배열안에
    // const addDummy안에 data 객체를 배열안에 넣어준다
    // 그러면 이제 state 안에 mainPosts에 값들이 생긴다
    // case ADD_DUMMY: {
    //   return {
    //     ...state,
    //     mainPosts: [action.data, ...state.mainPosts],
    //   };
    // }
    // 액션이 아무것도 해당되지 않을때 기본값
    default: {
      return {
        ...state,
      };
    }
  }
};

export default reducer;
