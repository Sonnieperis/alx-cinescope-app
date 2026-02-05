import styled from "styled-components";
import Link from "next/link";

const Nav = styled.nav`
  padding: 1rem 2rem;
  background: #000;
  display: flex;
  justify-content: space-between;
`;

export default function Navbar() {
  return (
    <Nav>
      <Link href="/">🎬 CineScope</Link>
      <Link href="/favorites">Favorites</Link>
    </Nav>
  );
}
