import styled from "styled-components";

const Button = styled.button<{ active?: boolean }>`
  padding: 0.5rem;
  background-color: ${({ active }) => (active ? "#f44336" : "#34967C")};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  width: 100%;

  &:hover {
    opacity: 0.9;
  }
`;

type Props = {
  isFavorite: boolean;
  onClick: () => void;
};

export default function FavoriteButton({ isFavorite, onClick }: Props) {
  return (
    <Button active={isFavorite} onClick={onClick}>
      {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    </Button>
  );
}
