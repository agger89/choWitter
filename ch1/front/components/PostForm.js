import React from 'react';
import { Form, Input, Button } from 'antd';

const dummy = {
    isLoggedIn: true,
    imagePath: [],
    mainPosts: [{
        User: {
            id: 1,
            nickname: '조니',
        },
        content: '첫번째 게시글',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9xyT3SoXf5ojhRUHVUKafAo6z2QrnDvIpCn-ubRXskLozK1Mt_Q'
    }]
};

const PostForm = () => {
    return (
        // 파일을 업로드 할때는 encType="multipart/form-data" 써야한다.
        // 안그러면 파일의 경로만 전송되고 내용이 전송되지 않는다.
        <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data">
            <Input.TextArea maxLength={148} placeholder="어떤 신기한 일이 있었나요?" />
            <div>
                {/* 다중 파일 업로드 할때 multiple, 업로드 데이터를 숨길떄 hidden */}
                <input type="file" multiple hidden />
                <Button>이미지 업로드</Button>
                <Button type="primary" style={{ float: 'right'}} htmlType="submit">짹짹</Button>
            </div>
            <div>
                {dummy.imagePath.map((v, i) => {
                    return (
                        <div key={v} style={{ display: 'inline-block' }}>
                            <img src={'http://localhost:3065' + v} style={{ width: '200px' }} alt={v} />
                            <Button>제거</Button>
                        </div>
                    )
                })}
            </div>
        </Form>
    );
};

export default PostForm;