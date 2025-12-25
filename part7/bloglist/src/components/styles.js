import { Table, Button, Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import styled from "styled-components"

// Harvard Crimson color constants
export const HARVARD_CRIMSON = "#a51c30"
export const HARVARD_CRIMSON_DARK = "#8b0000"

// Styled Table Component
export const StyledTable = styled(Table)`
  margin-top: 20px;
  border-collapse: separate;
  border-spacing: 0 10px;

  thead {
    background: linear-gradient(
      135deg,
      ${HARVARD_CRIMSON} 0%,
      ${HARVARD_CRIMSON_DARK} 100%
    );
    color: white;

    th {
      border: none;
      padding: 15px;
      font-weight: 600;
      letter-spacing: 0.5px;
    }
  }

  tbody {
    tr {
      transition:
        transform 0.2s,
        box-shadow 0.2s;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(165, 28, 48, 0.2);
      }
    }
  }
`

// Base Table Cell
export const TableCell = styled.td`
  padding: 15px !important;
  vertical-align: middle;
  background: white;
  border: 1px solid rgba(165, 28, 48, 0.1);

  &:first-child {
    border-left: 3px solid ${HARVARD_CRIMSON};
  }
`

// Centered Table Cell
export const CenteredCell = styled(TableCell)`
  text-align: center;
  font-weight: 600;
  color: ${HARVARD_CRIMSON};
  font-size: 1.1em;
`

// Crimson Link
export const CrimsonLink = styled(Link)`
  color: ${HARVARD_CRIMSON};
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1em;
  transition: all 0.2s ease;

  &:hover {
    color: ${HARVARD_CRIMSON_DARK};
    text-decoration: underline;
    text-decoration-color: ${HARVARD_CRIMSON};
  }
`

// Crimson Button
export const CrimsonButton = styled(Button)`
  background: linear-gradient(
    135deg,
    ${HARVARD_CRIMSON} 0%,
    ${HARVARD_CRIMSON_DARK} 100%
  );
  border: none;
  color: white;
  font-weight: 600;
  padding: 8px 20px;
  border-radius: 5px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(165, 28, 48, 0.3);

  &:hover {
    background: linear-gradient(
      135deg,
      ${HARVARD_CRIMSON_DARK} 0%,
      ${HARVARD_CRIMSON} 100%
    );
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(165, 28, 48, 0.5);
    color: white;
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(165, 28, 48, 0.3);
  }
`

// Like Button (Bisque background with crimson border)
export const LikeButton = styled(Button)`
  background: Bisque;
  border: 2px solid ${HARVARD_CRIMSON};
  color: ${HARVARD_CRIMSON};
  font-weight: 600;
  padding: 8px 20px;
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    background: ${HARVARD_CRIMSON};
    color: Bisque;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(165, 28, 48, 0.3);
    border-color: ${HARVARD_CRIMSON};
  }
`

// Delete Button
export const DeleteButton = styled(Button)`
  background: #dc3545;
  border: none;
  color: white;
  font-weight: 600;
  padding: 8px 20px;
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    background: #c82333;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(220, 53, 69, 0.5);
    color: white;
  }
`

// Section Title (h2)
export const SectionTitle = styled.h2`
  color: ${HARVARD_CRIMSON};
  font-weight: 700;
  margin-bottom: 20px;
  text-shadow: 1px 1px 2px rgba(165, 28, 48, 0.2);
`

// Container with crimson border
export const CrimsonContainer = styled.div`
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.95),
    rgba(245, 245, 245, 0.95)
  );
  padding: 30px;
  border-radius: 10px;
  border-left: 5px solid ${HARVARD_CRIMSON};
  box-shadow: 0 4px 6px rgba(165, 28, 48, 0.1);
  margin-bottom: 20px;
`

// Comments Section Title (h3)
export const CommentsTitle = styled.h3`
  color: ${HARVARD_CRIMSON};
  font-weight: 600;
  margin-top: 30px;
  margin-bottom: 15px;
  font-size: 1.4em;
`

// Comments Container
export const CommentsContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`

// Comments List
export const CommentsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

// Comment Item
export const CommentItem = styled.li`
  background: rgba(165, 28, 48, 0.05);
  padding: 15px 20px;
  border-radius: 8px;
  border-left: 4px solid ${HARVARD_CRIMSON};
  transition: all 0.2s ease;
  position: relative;
  box-shadow: 0 2px 4px rgba(165, 28, 48, 0.1);

  &:hover {
    background: rgba(165, 28, 48, 0.1);
    transform: translateX(5px);
    box-shadow: 0 4px 8px rgba(165, 28, 48, 0.15);
  }

  &::before {
    content: "💬";
    margin-right: 10px;
    font-size: 1.1em;
  }
`

// Login Dialog Container
export const LoginDialog = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    rgba(165, 28, 48, 0.05) 0%,
    rgba(139, 0, 0, 0.05) 100%
  );
  padding: 20px;
`

// Login Dialog Box
export const LoginBox = styled.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 40px rgba(165, 28, 48, 0.2);
  padding: 40px;
  width: 100%;
  max-width: 450px;
  border-top: 5px solid ${HARVARD_CRIMSON};
  animation: fadeInUp 0.4s ease-out;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

// Login Title
export const LoginTitle = styled(SectionTitle)`
  text-align: center;
  margin-bottom: 30px;
  font-size: 2em;
`

// Styled Form
export const StyledForm = styled(Form)`
  .form-label {
    color: ${HARVARD_CRIMSON};
    font-weight: 600;
    margin-bottom: 8px;
  }

  .form-control {
    border: 2px solid rgba(165, 28, 48, 0.2);
    border-radius: 5px;
    padding: 12px;
    transition: all 0.3s ease;
    font-size: 1em;

    &:focus {
      border-color: ${HARVARD_CRIMSON};
      box-shadow: 0 0 0 0.2rem rgba(165, 28, 48, 0.25);
    }
  }
`
