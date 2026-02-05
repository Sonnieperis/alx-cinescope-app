import styled from "styled-components";

export const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  padding: 0.5rem 1rem;
  background-color: ${({ variant }) =>
    variant === "secondary" ? "#888" : "#34967C"};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;
