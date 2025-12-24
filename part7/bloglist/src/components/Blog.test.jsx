import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

describe("<Blog />", () => {
  const likesHandler = vi.fn()
  beforeEach(() => {
    const initialBlog = {
      title: "Component testing is done with react-testing-library",
      author: "Robert C. Martin",
      url: "https://react-testing-library.com",
      likes: 0,
      user: {
        name: "John Doe",
        username: "john.doe",
        id: "1234567890",
      },
    }
    render(<Blog blog={initialBlog} handleLike={likesHandler} />)
  })
  test("renders correct content", () => {
    const elementByTitle = screen.getByText(
      "Component testing is done with react-testing-library",
      { exact: false },
    )
    expect(elementByTitle).toBeDefined()
    const elementByAuthor = screen.getByText("Robert C. Martin", {
      exact: false,
    })
    expect(elementByAuthor).toBeDefined()
    const elementByUrl = screen.queryByText(
      "https://react-testing-library.com",
      { exact: false },
    )
    expect(elementByUrl).toBeNull()
    const elementByLikes = screen.queryByText("likes 0")
    expect(elementByLikes).toBeNull()
  })
  test("renders url and likes when button is clicked", async () => {
    const user = userEvent.setup()
    const button = screen.getByText("view")
    await user.click(button)

    const elementByUrl = screen.getByText("https://react-testing-library.com", {
      exact: false,
    })
    expect(elementByUrl).toBeDefined()
    const elementByLikes = screen.getByText("likes 0")
    expect(elementByLikes).toBeDefined()
  })

  test("clicking the like button twice calls event handler twice", async () => {
    const user = userEvent.setup()
    const expandButton = screen.getByText("view")
    await user.click(expandButton)

    const likeButton = screen.getByText("like")
    await user.click(likeButton)
    await user.click(likeButton)

    expect(likesHandler.mock.calls).toHaveLength(2)
  })
})
