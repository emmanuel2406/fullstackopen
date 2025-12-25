import { Link, useLocation } from "react-router-dom"
import styled from "styled-components"
import { Button } from "react-bootstrap"

const NavBar = styled.nav`
  background: linear-gradient(135deg, #a51c30 0%, #8b0000 100%);
  padding: 15px 30px;
  box-shadow: 0 4px 6px rgba(165, 28, 48, 0.3);
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
`

const NavLinks = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
`

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1em;
  padding: 8px 16px;
  border-radius: 5px;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    color: white;
    transform: translateY(-2px);
  }

  &.active {
    background: rgba(255, 255, 255, 0.25);
    color: white;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 80%;
      height: 3px;
      background: white;
      border-radius: 2px;
    }
  }
`

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  color: white;
`

const UserInfo = styled.span`
  font-weight: 500;
  font-size: 1em;
  color: white;

  &::before {
    content: "👤 ";
    margin-right: 5px;
  }
`

const LogoutButton = styled(Button)`
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  color: white;
  font-weight: 600;
  padding: 8px 20px;
  border-radius: 5px;
  transition: all 0.3s ease;
  font-size: 0.95em;

  &:hover {
    background: white;
    color: #a51c30;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(255, 255, 255, 0.3);
    border-color: white;
  }

  &:active {
    transform: translateY(0);
  }
`

const Navigation = ({ username, handleLogout }) => {
  const location = useLocation()

  return (
    <NavBar>
      <NavLinks>
        <NavLink to="/" className={location.pathname === "/" ? "active" : ""}>
          📝 Blogs
        </NavLink>
        <NavLink
          to="/users"
          className={location.pathname === "/users" ? "active" : ""}
        >
          👥 Users
        </NavLink>
      </NavLinks>
      <UserSection>
        <UserInfo>{username}</UserInfo>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </UserSection>
    </NavBar>
  )
}

export default Navigation
