import {
  CommentsContainer,
  CommentsTitle,
  CommentsList,
  CommentItem,
} from "./styles"

const Comments = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return null
  }

  return (
    <CommentsContainer>
      <CommentsTitle>💭 Comments ({comments.length})</CommentsTitle>
      <CommentsList>
        {comments.map((comment, index) => (
          <CommentItem key={index}>{comment}</CommentItem>
        ))}
      </CommentsList>
    </CommentsContainer>
  )
}

export default Comments
