import styled from "styled-components";

const Message = styled.div`
  padding: 1rem;
  background-color: #f44336;
  color: white;
  border-radius: 5px;
  text-align: center;
`;

type Props = { message: string };

export default function ErrorMessage({ message }: Props) {
  return <Message>{message}</Message>;
}
