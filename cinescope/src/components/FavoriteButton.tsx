import styled from "styled-components";

const Button = styled.button<{ active: boolean }>`
  padding: 0.4rem 0.6rem;
  font-size: 0.85rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background: ${({ active }) => (active ? "#e63946" : "#e5e5e5")};
  color: ${({ active }) => (active ? "#fff" : "#000")};

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
      {isFavorite ? "Remove ❤️" : "Add 🤍"}
    </Button>
  );
}
