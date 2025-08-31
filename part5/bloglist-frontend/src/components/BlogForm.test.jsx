import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('calls the event handler with the correct details when a new blog is created', async () => {
    const user = userEvent.setup()
    const createBlog = vi.fn()
    render(<BlogForm createBlog={createBlog} />)
    const titleInput = screen.getByPlaceholderText('Enter title here')
    const authorInput = screen.getByPlaceholderText('Enter author here')
    const urlInput = screen.getByPlaceholderText('Enter url here')
    await user.type(titleInput, 'Test Title')
    await user.type(authorInput, 'Test Author')
    await user.type(urlInput, 'https://test/url.com')
    const sendButton = screen.getByText('create')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Test Title')
    expect(createBlog.mock.calls[0][0].author).toBe('Test Author')
    expect(createBlog.mock.calls[0][0].url).toBe('https://test/url.com')
  })
})