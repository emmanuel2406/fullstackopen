import blogService from '../services/blogs'

const Logout = ({ setUser }) => {
    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
        blogService.setToken(null)
    }
    return <button onClick={handleLogout}>logout</button>
}

export default Logout