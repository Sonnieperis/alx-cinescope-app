import styled from "styled-components";

const Button = styled.button<{ active: boolean }>`
  background: ${(props) => (props.active ? "#ff6b6b" : "#ddd")};
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    opacity: 0.9;
  }
`;

interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick: () => void;
}

export default function FavoriteButton({ isFavorite, onClick }: FavoriteButtonProps) {
  return <Button active={isFavorite} onClick={onClick}>{isFavorite ? "Remove" : "Add"}</Button>;
}
