import { useState } from "react"

const CommentForm = ({ blogId, addComment }) => {
  const [comment, setComment] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (comment.trim()) {
      addComment(blogId, comment.trim())
      setComment("")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          value={comment}
          placeholder="Write a comment..."
          onChange={({ target }) => setComment(target.value)}
        />
      </div>
    </form>
  )
}

export default CommentForm
