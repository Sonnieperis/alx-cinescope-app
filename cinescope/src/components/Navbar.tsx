import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Nav = styled.nav`
  padding: 1rem 2rem;
  display: flex;
  gap: 1.5rem;
`;

const NavLink = styled.a<{ $active?: boolean }>`
  color: ${({ $active }) => ($active ? "#ff4757" : "#333")};
  font-weight: ${({ $active }) => ($active ? "600" : "400")};
  text-decoration: none;
  cursor: pointer;
`;

export default function Navbar() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ⛔ Prevent SSR/client mismatch
  if (!mounted) return null;

  return (
    <Nav>
      <Link href="/" passHref>
        <NavLink $active={router.pathname === "/"}>Home</NavLink>
      </Link>

      <Link href="/favorites" passHref>
        <NavLink $active={router.pathname === "/favorites"}>
          Favorites
        </NavLink>
      </Link>
    </Nav>
  );
}
