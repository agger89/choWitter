import React, { useCallback, useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
// useSelector: 리듀서에 있는 state를 불러오기 위함
import { useSelector, useDispatch } from 'react-redux';
import { ADD_POST_REQUEST } from '../reducers/post';

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
  const { imagePath, isAddingPost, postAdded } = useSelector(state => state.post);

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
    dispatch({
      type: ADD_POST_REQUEST,
      data: {
        text,
      },
    });
  }, []);

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  return (
  // 파일을 업로드 할때는 encType="multipart/form-data" 써야한다.
  // 안그러면 파일의 경로만 전송되고 내용이 전송되지 않는다.
    <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onSubmit={onSubmitForm}>
      <Input.TextArea maxLength={148} placeholder="어떤 신기한 일이 있었나요?" value={text} onChange={onChangeText}/>
      <div>
        {/* 다중 파일 업로드 할때 multiple, 업로드 데이터를 숨길떄 hidden */}
        <input type="file" multiple hidden />
        <Button>이미지 업로드</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit" loading={isAddingPost}>짹짹</Button>
      </div>
      <div>
        {imagePath.map(v => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img src={`http://localhost:3065${v}`} style={{ width: '200px' }} alt={v} />
            <Button>제거</Button>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
