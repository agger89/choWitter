// 불변성 처리 라이브러리 immer
import produce from 'immer';

// const dummyUser = {
//   nickname: '조니',
//   Post: [],
//   Followings: [],
//   Followers: [],
//   id: 1,
// };

// 초기 state값, store안에 들어감
// 여러곳에서 쓰이기 때문에 export를 해서 모듈로 만듬
// 모든 상태값을 가지고 있는 중앙통제실
export const initialState = {
  isLoggingOut: false, // 로그아웃 시도중
  isLoggingIn: false, // 로그인 시도중
  logInErrorReason: '', // 로그인 실패 사유
  isSignedUp: false, // 회원가입 성공
  isSigningUp: false, // 회원가입 시도중
  signUpErrorReason: '', // 회원가입 실패 사유
  me: null, // 내 정보
  followingList: [], // 팔로잉 리스트
  followerList: [], // 팔로워 리스트
  userInfo: null, // 남의 정보
  isEditingNickname: false, // 닉네임 변경 중
  editNicknameErrorReason: '', // 닉네임 변경 실패 이유
  hasMoreFollower: false, // 더보기 버튼 유무 팔로워
  hasMoreFollowing: false, // 더보기 버튼 유무 팔로잉
};

// 액션의 이름
// 회원가입 요청 액션
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
// 로그인 요청 액션
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
// 사용자 정보 불러오는 액션
export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';
// 로그아웃 요청 액션
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';
// 내가 팔로우 한 유저 목록 불러오는 액션
export const LOAD_FOLLOWERS_REQUEST = 'LOAD_FOLLOWERS_REQUEST';
export const LOAD_FOLLOWERS_SUCCESS = 'LOAD_FOLLOWERS_SUCCESS';
export const LOAD_FOLLOWERS_FAILURE = 'LOAD_FOLLOWERS_FAILURE';
// 팔로잉 중인 유저 목록 불러오는 액션
export const LOAD_FOLLOWINGS_REQUEST = 'LOAD_FOLLOWINGS_REQUEST';
export const LOAD_FOLLOWINGS_SUCCESS = 'LOAD_FOLLOWINGS_SUCCESS';
export const LOAD_FOLLOWINGS_FAILURE = 'LOAD_FOLLOWINGS_FAILURE';
// 팔로우하는 액션
export const FOLLOW_USER_REQUEST = 'FOLLOW_USER_REQUEST';
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS';
export const FOLLOW_USER_FAILURE = 'FOLLOW_USER_FAILURE';
// 언팔로우하는 액션
export const UNFOLLOW_USER_REQUEST = 'UNFOLLOW_USER_REQUEST';
export const UNFOLLOW_USER_SUCCESS = 'UNFOLLOW_USER_SUCCESS';
export const UNFOLLOW_USER_FAILURE = 'UNFOLLOW_USER_FAILURE';
// 팔로워 삭제 액션
export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST';
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE';
// 닉네임 변경 액션
export const EDIT_NICKNAME_REQUEST = 'EDIT_NICKNAME_REQUEST';
export const EDIT_NICKNAME_SUCCESS = 'EDIT_NICKNAME_SUCCESS';
export const EDIT_NICKNAME_FAILURE = 'EDIT_NICKNAME_FAILURE';
// 내 포스트 갯수 증가 액션
export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
// 내 포스트 갯수 감소 액션
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

// 실제 액션
// 여러곳에서 쓰이기 때문에 export를 해서 모듈로 만듬
// 아래 reducer에 action에 넣을 데이터가 동적인 경우에는
// action을 함수로 만들어서 인자로 데이터를 받는다.
// view단에서 type으로 바로 dispatch해서 주석처리 ( 액션이 많아서 복잡성 때문에 )
// export const signUpRequestAction = data => ({
//   type: SIGN_UP_REQUEST,
//   data,
// });

// export const loginRequestAction = data => ({
//   type: LOG_IN_REQUEST,
//   data,
// });

// export const logoutRequestAction = {
//   type: LOG_OUT_REQUEST,
// };

// setState라고 생각하면됨, action의 결과로 state를 바꿈
// 상단에 선언한 initialState가 리듀서안에 들어감
const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOG_IN_REQUEST: {
        // immer code
        draft.isLoggingIn = true;
        draft.logInErrorReason = '';
        break;
        // return {
        //   // 스프레드 문법: 새로운 배열,객체를 생성한다
        //   // 불변성, 예전 state와 지금 state가 달라졌는지
        //   ...state,
        //   isLoggingIn: true,
        //   logInErrorReason: '',
        // };
      }
      case LOG_IN_SUCCESS: {
        // immer code
        draft.isLoggingIn = false;
        draft.logInErrorReason = '';
        draft.me = action.data;
        break;
        // return {
        //   ...state,
        //   isLoggingIn: false,
        //   // 백엔드에서 넘어와 saga에서 넘겨준 data
        //   me: action.data,
        //   isLoading: false,
        // };
      }
      case LOG_IN_FAILURE: {
        // immer code
        draft.isLoggingIn = false;
        draft.logInErrorReason = action.reason;
        draft.me = null;
        break;
        // return {
        //   ...state,
        //   isLoggingIn: false,
        //   logInErrorReason: action.error,
        //   me: null,
        // };
      }
      case LOG_OUT_REQUEST: {
        // immer code
        draft.isLoggingOut = true;
        break;
        // return {
        //   ...state,
        //   isLoggingOut: true,
        // };
      }
      case LOG_OUT_SUCCESS: {
        // immer code
        draft.isLoggingOut = false;
        draft.me = null;
        break;
        // return {
        //   ...state,
        //   isLoggingOut: false,
        //   me: null,
        // };
      }
      case SIGN_UP_REQUEST: {
        // immer code
        draft.isSignedUp = false;
        draft.isSigningUp = true;
        draft.signUpErrorReason = '';
        break;
        // return {
        //   ...state,
        //   isSigningUp: true,
        //   isSignedUp: false,
        //   signUpErrorReason: '',
        // };
      }
      case SIGN_UP_SUCCESS: {
        // immer code
        draft.isSigningUp = false;
        draft.isSignedUp = true;
        break;
        // return {
        //   ...state,
        //   isSigningUp: false,
        //   isSignedUp: true,
        // };
      }
      case SIGN_UP_FAILURE: {
        // immer code
        draft.isSigningUp = false;
        draft.signUpErrorReason = action.error;
        break;
        // return {
        //   ...state,
        //   isSigningUp: false,
        //   signUpErrorReason: action.error,
        // };
      }
      // 사용자 정보 가져오는 액션 구역
      // 쿠키가 있을시 새로고침해도 다시 로그인 상태로 남아있게
      case LOAD_USER_REQUEST: {
        // immer code
        break;
        // return {
        //   ...state,
        // };
      }
      case LOAD_USER_SUCCESS: {
        // immer code
        if (action.me) {
          draft.me = action.data;
          break;
        }
        draft.useInfo = action.data;
        break;
        // action.me 데이터가 있으면
        // me state에 action.data 넣고
        // 없으면 userInfo state에 action.data 넣기
        // if (action.me) {
        //   return {
        //     ...state,
        //     me: action.data,
        //   };
        // }
        // return {
        //   ...state,
        //   userInfo: action.data,
        // };
      }
      case LOAD_USER_FAILURE: {
        // immer code
        break;
        // return {
        //   ...state,
        // };
      }
      case FOLLOW_USER_REQUEST: {
        // immer code
        break;
        // return {
        //   ...state,
        // };
      }
      case FOLLOW_USER_SUCCESS: {
        // immer code
        // 게시물 제일 앞쪽에 추가
        draft.me.Followings.unshift({ id: action.data });
        break;
        // return {
        //   ...state,
        //   // 내 정보안에 내가 팔로잉중인 유저 목록에 내가 방금 팔로잉한 유저 추가
        //   me: {
        //     ...state.me,
        //     Followings: [{ id: action.data }, ...state.me.Followings],
        //   },
        // };
      }
      case FOLLOW_USER_FAILURE: {
        // immer code
        break;
        // return {
        //   ...state,
        // };
      }
      case UNFOLLOW_USER_REQUEST: {
        // immer code
        break;
        // return {
        //   ...state,
        // };
      }
      case UNFOLLOW_USER_SUCCESS: {
        // immer code
        const index = draft.me.Followings.findIndex(v => v.id === action.data);
        // 위에서 추출한 배열에 해당하는 팔로잉 제거후 리턴
        draft.me.Followings.splice(index, 1);
        const index2 = draft.followingList.findIndex(v => v.id === action.data);
        // 위에서 추출한 배열에 해당하는 팔로잉리스트 제거후 리턴
        draft.followingList.splice(index2, 1);
        break;
        // return {
        //   ...state,
        //   // 내 정보안에 내가 팔로잉중인 유저 목록에 내가 방금 팔로잉한 유저 빼기
        //   me: {
        //     ...state.me,
        //     Followings: state.me.Followings.filter(v => v.id !== action.data),
        //   },
        //   followingList: state.followingList.filter(v => v.id !== action.data),
        // };
      }
      case UNFOLLOW_USER_FAILURE: {
        // immer code
        break;
        // return {
        //   ...state,
        // };
      }
      // 게시글 등록시 게시글 갯수 증가
      case ADD_POST_TO_ME: {
        // immer code
        // 게시물 제일 앞쪽에 추가
        draft.me.Posts.unshift({ id: action.data });
        break;
        // return {
        //   ...state,
        //   me: {
        //     ...state.me,
        //     Posts: [{ id: action.data }, ...state.me.Posts],
        //   },
        // };
      }
      // 게시글 삭제시 게시글 갯수 감소
      case REMOVE_POST_OF_ME: {
        // immer code
        const index = draft.me.Posts.findIndex(v => v.id === action.data);
        // 위에서 추출한 배열에 해당하는 게시글 제거후 리턴
        draft.me.Posts.splice(index, 1);
        break;
        // return {
        //   ...state,
        //   me: {
        //     ...state.me,
        //     Posts: state.me.Posts.filter(v => v.id !== action.data),
        //   },
        // };
      }
      case LOAD_FOLLOWERS_REQUEST: {
        // immer code
        draft.followerList = !action.offset ? [] : draft.followerList;
        draft.hasMoreFollower = action.offset ? draft.hasMoreFollower : true; // 처음 데이터를 가져올 때는 더보기 버튼을 보여주는 걸로
        break;
        // console.log(action.offset, "offset");
        // return {
        //   ...state,
        //   // 처음 프로필화면이 로드 될때 offset 값은 0 그래서 거짓으로 가서 true
        //   // 이유는 삼항연산자는 값이 0이나 undefined면 거짓으로 간다
        //   hasMoreFollower: action.offset ? state.hasMoreFollower : true,
        // };
      }
      case LOAD_FOLLOWERS_SUCCESS: {
        // immer code
        action.data.forEach((d) => {
          draft.followerList.push(d);
        });
        draft.hasMoreFollower = action.data.length === 3;
        break;
        // return {
        //   ...state,
        //   // 팔로워 리스트 불러오기
        //   // concat: 기존 배열을 변경하지 않고 추가된 배열과 함꺠 불러온다
        //   followerList: state.followerList.concat(action.data),
        //   // 불러온 팔로워가 3명이면 true
        //   hasMoreFollower: action.data.length === 3,
        // };
      }
      case LOAD_FOLLOWERS_FAILURE: {
        // immer code
        break;
        // return {
        //   ...state,
        // };
      }
      case LOAD_FOLLOWINGS_REQUEST: {
        // immer code
        draft.followingList = !action.offset ? [] : draft.followingList;
        draft.hasMoreFollowing = action.offset ? draft.hasMoreFollowing : true;
        break;
        // return {
        //   ...state,
        //   // 처음 프로필화면이 로드 될때 offset 값은 0 그래서 거짓으로 가서 true
        //   // 이유는 삼항연산자는 값이 0이나 undefined면 거짓으로 간다
        //   hasMoreFollowing: action.offset ? state.hasMoreFollowing : true,
        // };
      }
      case LOAD_FOLLOWINGS_SUCCESS: {
        // immer code
        action.data.forEach((d) => {
          draft.followingList.push(d);
        });
        draft.hasMoreFollowing = action.data.length === 3;
        break;
        // return {
        //   ...state,
        //   // 팔로잉 리스트 불러오기
        //   // concat: 기존 배열을 변경하지 않고 추가된 배열과 함꺠 불러온다
        //   followingList: state.followingList.concat(action.data),
        //   // 불러온 팔로워가 3명이면 true
        //   hasMoreFollowing: action.data.length === 3,
        // };
      }
      case LOAD_FOLLOWINGS_FAILURE: {
        // immer code
        break;
        // return {
        //   ...state,
        // };
      }
      case REMOVE_FOLLOWER_REQUEST: {
        // immer code
        break;
        // return {
        //   ...state,
        // };
      }
      case REMOVE_FOLLOWER_SUCCESS: {
        // immer code
        const index = draft.me.Followers.findIndex(v => v.id === action.data);
        // 위에서 찾은 인덱스에 해당하는 팔로워 제거
        draft.me.Followers.splice(index, 1);
        const index2 = draft.followerList.findIndex(v => v.id === action.data);
        // 위에서 찾은 인덱스에 해당하는 팔로워리스트 제거
        draft.followerList.splice(index2, 1);
        break;
        // return {
        //   ...state,
        //   me: {
        //     ...state.me,
        //     Followers: state.me.Followers.filter(v => v.id !== action.data),
        //   },
        //   followerList: state.followerList.filter(v => v.id !== action.data),
        // };
      }
      case REMOVE_FOLLOWER_FAILURE: {
        // immer code
        break;
        // return {
        //   ...state,
        // };
      }
      case EDIT_NICKNAME_REQUEST: {
        // immer code
        draft.isEditingNickname = true;
        draft.editNicknameErrorReason = '';
        break;
        // return {
        //   ...state,
        //   isEditingNickname: true,
        //   editNicknameErrorReason: '',
        // };
      }
      case EDIT_NICKNAME_SUCCESS: {
        // immer code
        draft.isEditingNickname = false;
        draft.me.nickname = action.data;
        break;
        // return {
        //   ...state,
        //   isEditingNickname: false,
        //   // 내 정보들 다 불러와서
        //   // 닉네임만 교체
        //   me: {
        //     ...state.me,
        //     nickname: action.data,
        //   },
        // };
      }
      case EDIT_NICKNAME_FAILURE: {
        draft.isEditingNickname = false;
        draft.editNicknameErrorReason = action.error;
        break;
        // return {
        //   ...state,
        //   isEditingNickname: false,
        //   editNicknameErrorReason: action.error,
        // };
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
