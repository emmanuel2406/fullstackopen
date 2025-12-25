import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import styled from "styled-components"

const CrimsonSubmitButton = styled(Button)`
  background: linear-gradient(135deg, #a51c30 0%, #8b0000 100%);
  border: none;
  color: white;
  font-weight: 600;
  padding: 10px 30px;
  border-radius: 5px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(165, 28, 48, 0.3);
  margin-top: 15px;

  &:hover {
    background: linear-gradient(135deg, #8b0000 0%, #a51c30 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(165, 28, 48, 0.5);
    color: white;
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(165, 28, 48, 0.3);
  }
`

const StyledForm = styled(Form)`
  .form-label {
    color: #a51c30;
    font-weight: 600;
    margin-bottom: 8px;
  }

  .form-control {
    border: 2px solid rgba(165, 28, 48, 0.2);
    border-radius: 5px;
    padding: 10px;
    transition: all 0.3s ease;

    &:focus {
      border-color: #a51c30;
      box-shadow: 0 0 0 0.2rem rgba(165, 28, 48, 0.25);
    }
  }
`

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState("")
  const [newAuthor, setNewAuthor] = useState("")
  const [newUrl, setNewUrl] = useState("")

  const handleCreate = async (event) => {
    event.preventDefault()
    createBlog({ title: newTitle, author: newAuthor, url: newUrl })

    setNewTitle("")
    setNewAuthor("")
    setNewUrl("")
  }
  return (
    <StyledForm onSubmit={handleCreate}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={newTitle}
          name="Title"
          placeholder="Enter title here"
          onChange={({ target }) => setNewTitle(target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Author</Form.Label>
        <Form.Control
          type="text"
          value={newAuthor}
          name="Author"
          placeholder="Enter author here"
          onChange={({ target }) => setNewAuthor(target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>URL</Form.Label>
        <Form.Control
          type="text"
          value={newUrl}
          name="Url"
          placeholder="Enter url here"
          onChange={({ target }) => setNewUrl(target.value)}
        />
      </Form.Group>
      <CrimsonSubmitButton type="submit" name="save">
        ✨ Save Blog
      </CrimsonSubmitButton>
    </StyledForm>
  )
}

export default BlogForm
