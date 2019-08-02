import React, { useCallback, useState, useEffect, useRef } from 'react';
import { Form, Input, Button } from 'antd';
// useSelector: 리듀서에 있는 state를 불러오기 위함
import { useSelector, useDispatch } from 'react-redux';
import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE } from '../reducers/post';

// 백엔드에 데이터가 아직 없기때문에
// 가짜 데이터를 만들어준다
// 리덕스로 state 옮겨서 사용안함
// const dummy = {
//     isLoggedIn: true,
//     imagePath: [],
//     mainPosts: [{
//         User: {
//             id: 1,
//             nickname: '조니',
//         },
//         content: '첫번째 게시글',
//         img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9xyT3SoXf5ojhRUHVUKafAo6z2QrnDvIpCn-ubRXskLozK1Mt_Q'
//     }]
// };

const PostForm = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const { imagePaths, isAddingPost, postAdded } = useSelector(state => state.post);
  const imageInput = useRef();

  // 포스트가 업로드 되면 텍스트 입력창 초기화 작업
  // useEffct:
  // componentDidMount, componentDidUpdate, componentWillUnmount
  // 를 하나로 합쳐놓은것
  useEffect(() => {
    setText('');
  }, [postAdded === true]); // 포스트가 업로드가 성공하면 setText(''), 배열에 값이 있으면 componentDidUpdate

  const onSubmitForm = useCallback((e) => {
    // SPA에서 form은 무조건 e.preventDefault 붙여줘야 한다. 새 페이지로 넘어감
    e.preventDefault();
    // 게시글 내용 작성 안하거나, 스페이스바 띄어쓰기만 작성하는것 방지
    if (!text || !text.trim()) {
      return alert('게시글을 작성하세요.');
      // 조건에 걸려서 return 시켜서 아래의 코드로 안넘어가게
    }
    const formData = new FormData();
    imagePaths.forEach((i) => {
      formData.append('image', i);
    });
    formData.append('content', text);
    dispatch({
      type: ADD_POST_REQUEST,
      // 폼 내용 백엔드로 보내기
      // new FormData() 사용전
      // data: {
      //   content: text.trim(),
      // },
      // new FormData() 사용후
      // 위에 new FormData()를 활용해 이미지와 게시글을 같이 업르드
      data: formData,
    });
  }, [text, imagePaths]);

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onChangeImages = useCallback((e) => {
    console.log(e.target.files);
    // FormData()객체안에 각각의 이미지들을 넣어준다
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      // 'image': key (서버에서 알수있게)
      // f: value
      imageFormData.append('image', f);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);

  // 버튼이 클릭되면 <input type="file">이 클릭되는 효과가 나서
  // 이미지 업로드 할 수 있는 input 창이 열리도록
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  // 고차함수 적용 패턴:
  // 아래의 버튼 태그에서 onRemoveImage(i) 이렇게 괄호가 있으면
  // index => () => {} 이런식으로 해줘야함
  // 이미지 삭제
  // 해당 이미지의 인덱스를 같이 보내서 완료
  const onRemoveImage = useCallback(index => () => {
    dispatch({
      type: REMOVE_IMAGE,
      index,
    });
  }, []);

  return (
  // 파일을 업로드 할때는 encType="multipart/form-data" 써야한다.
  // 안그러면 파일의 경로만 전송되고 내용이 전송되지 않는다.
    <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onSubmit={onSubmitForm}>
      <Input.TextArea maxLength={148} placeholder="어떤 신기한 일이 있었나요?" value={text} onChange={onChangeText}/>
      <div>
        {/* 다중 파일 업로드 할때 multiple, 업로드 데이터를 숨길떄 hidden */}
        <input type="file" multiple hidden ref={imageInput} onChange={onChangeImages} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit" loading={isAddingPost}>짹짹</Button>
      </div>
      <div>
        {imagePaths.map((v, i) => (
          // 이미지 미리보기
          <div key={v} style={{ display: 'inline-block' }}>
            <img src={v} style={{ width: '200px' }} alt={v} />
            <div>
              <Button onClick={onRemoveImage(i)}>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
