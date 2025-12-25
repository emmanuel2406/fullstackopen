const Comments = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return null
  }

  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Comments
