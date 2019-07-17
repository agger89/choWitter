import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { EDIT_NICKNAME_REQUEST } from '../reducers/user';

const NicknameEditForm = () => {
  const [editedName, setEditedName] = useState('');
  const dispatch = useDispatch();
  const { me, isEditingNickname } = useSelector(state => state.user);

  // 인풋 입력값 변경 체크
  const onChangeNickname = useCallback((e) => {
    setEditedName(e.target.value);
  }, []);

  // 닉네임 변경 서브밋
  const onEditNickname = useCallback((e) => {
    e.preventDefault();
    dispatch({
      type: EDIT_NICKNAME_REQUEST,
      data: editedName,
    });
  }, [editedName]);

  return (
    <Form
      style={{ marginBottom: '20px', border: '1px solid #d9d9d9', padding: '20px' }}
      onSubmit={onEditNickname}
    >
      <Input addonBefore="닉네임" value={editedName || (me && me.nickname)} onChange={onChangeNickname} />
      <Button type="primary" htmlType="submit" loading={isEditingNickname}>수정</Button>
    </Form>
  );
};

export default NicknameEditForm;
