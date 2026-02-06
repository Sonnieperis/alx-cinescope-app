import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";

const Nav = styled.nav`
  width: 100%;
  padding: 1rem 2rem;
  background-color: #34967C;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const NavLink = styled.a<{ active?: boolean }>`
  color: ${(props) => (props.active ? "#fff" : "#d0f0e9")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: #fff;
  }
`;

const Navbar = () => {
  const router = useRouter();

  return (
    <Nav>
      <h2>Cinescope</h2>
      <NavLinks>
        <Link href="/" passHref>
          <NavLink active={router.pathname === "/"}>Home</NavLink>
        </Link>
        <Link href="/favorites" passHref>
          <NavLink active={router.pathname === "/favorites"}>Favorites</NavLink>
        </Link>
      </NavLinks>
    </Nav>
  );
};

export default Navbar;
