import Link from "next/link";
import styled from "styled-components";
import UnstyledLink from "./styled/UnstyledLink";
import { FiShoppingCart } from "react-icons/fi";
import useCart from "../hooks/useCart";

const ShoppingCart = styled(FiShoppingCart)`
  margin-right: 1rem;

  &:hover {
    cursor: pointer;
  }
`;

const Nav = styled.nav`
  background: white;
  padding: 2rem;
`;
const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  font-size: 2rem;
`;

const Navbar = () => {
  const { openCart } = useCart();

  const handleClick = () => {
    openCart();
  };

  return (
    <Nav>
      <NavContainer>
        <Link href="/">
          <UnstyledLink>Super Store</UnstyledLink>
        </Link>
        <ShoppingCart onClick={handleClick} />
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
