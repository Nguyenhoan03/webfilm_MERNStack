import React, { useState, useContext, FormEvent } from "react"; // Thêm FormEvent
import { FiMessageSquare } from "react-icons/fi";
import { userchildcomment, usercomment } from "../../services/Productservices";
import { HomeContext } from '../../store/HomeContext';
import "./Style.scss";
import { useComments } from "../../hook/useComments";

interface Comment {
  id: number;
  parent_id: number | null;
  comment: string;
  createdAt: string;
  users: {
    username: string;
  };
}

export interface CommentComponentProps {
  comments?: Comment[] | null | any;
  titlefilm?: string | null;
  parent_id?: number | null | any;
}

export default function CommentComponent({ comments:initialComments, titlefilm }: CommentComponentProps) {
  const { token }: any = useContext(HomeContext);
  const {
    comments,
    contentComment,
    setContentComment,
    childContentComment,
    setChildContentComment,
    replyParentId,
    setReplyParentId,
    handleComment,
    handleChildComment
  } = useComments(titlefilm, initialComments);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleComment(token);
  };

  const handleReply = (key: number) => {
    setReplyParentId(key);
  };

  const handleChildCommentSubmit = (e: React.FormEvent, parent_id: number) => {
    e.preventDefault();
    handleChildComment(token, parent_id);
  };
  const renderComments = (comments: Comment[], parentId: number | null = null) => {
    return comments
      .filter(comment => comment.parent_id === parentId)
      .map(comment => (
        <div key={comment.id} className={`comment${parentId ? " child-comment" : ""}`}>
          <div className="comment-header">
            <img
              className="avatar"
              src={`https://ui-avatars.com/api/?background=3f3f46&color=fff&name=${encodeURIComponent(comment.users.username)}`}
              alt=""
            />
            <div className="comment-meta">
              <p className="username">{comment.users.username}</p>
              <p className="comment-date">{new Date(comment.createdAt).toLocaleString()}</p>
            </div>
          </div>
          <div className="comment-body">
            <p>{comment.comment}</p>
          </div>
          <div className="reply-container">
            <p className="reply-button" onClick={() => handleReply(comment.id)}>
              <FiMessageSquare style={{ marginRight: "5px" }} /> Reply
            </p>
            {replyParentId === comment.id && (
              <form onSubmit={(e) => handleChildCommentSubmit(e, comment.id)}>
                <div className="reply-input-container">
                  <textarea
                    className="reply-input"
                    placeholder="Reply..."
                    required
                    value={childContentComment}
                    onChange={(e) => setChildContentComment(e.target.value)}
                  ></textarea>
                  <div className="button-container">
                    <button className="reply-button-submit">Reply</button>
                    <button
                      className="cancel-button"
                      onClick={() => setReplyParentId(null)}
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
          {renderComments(comments, comment.id)}
        </div>
      ));
  };

  return (
    <div className="comment-section">
      <div className="comment-box">
        <div className="comment-input-container">
          <p className="comment-count">Bình luận ({comments?.length || 0})</p>
          <form onSubmit={handleCommentSubmit}>
            <textarea
              className="comment-input"
              value={contentComment}
              onChange={(e) => setContentComment(e.target.value)}
              placeholder="Để lại bình luận ..."
              required
            ></textarea>
            <button className="comment-submit-button" type="submit">Bình luận</button>
          </form>
          {renderComments(comments || [])}
        </div>
      </div>
    </div>
  );
}