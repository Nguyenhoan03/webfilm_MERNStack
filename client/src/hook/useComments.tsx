import { useState, useEffect } from 'react';
import { usercomment, userchildcomment } from '../services/Productservices';

export const useComments = (titlefilm: string | null | any, initialComments: any[] | null) => {
  const [comments, setComments] = useState(initialComments);
  const [contentComment, setContentComment] = useState('');
  const [childContentComment, setChildContentComment] = useState('');
  const [replyParentId, setReplyParentId] = useState<number | null>(null);

  const handleComment = async (token: string) => {
    if (!token) {
      alert("Bạn cần đăng nhập để có thể bình luận");
      return;
    }
    try {
      await usercomment({token, titlefilm, contentcomment: contentComment});
      setContentComment('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleChildComment = async (token: string, parent_id: number) => {
    if (!token) {
      alert("Bạn cần đăng nhập để có thể bình luận");
      return;
    }
    try {
      await userchildcomment({token, titlefilm, contentcomment: childContentComment, parent_id});
      setChildContentComment('');
      setReplyParentId(null);
      // Cập nhật danh sách bình luận ở đây nếu cần
    } catch (error) {
      console.log(error);
    }
  };

  return {
    comments,
    contentComment,
    setContentComment,
    childContentComment,
    setChildContentComment,
    replyParentId,
    setReplyParentId,
    handleComment,
    handleChildComment
  };
};