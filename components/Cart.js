import styled from "styled-components";
import { FiX } from "react-icons/fi";
import useCart from "../hooks/useCart";
import { useRouter } from "next/router";

const Content = styled.div`
  padding: 2rem;
`;

const X = styled(FiX)`
  font-size: 3rem;

  &:hover {
    cursor: pointer;
  }
`;

const XContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  height: 100vh;
  background-color: white;
  width: 300px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  transform: translate(${(props) => (props.isOpen ? "0" : "100%")});
  transition: transform 0.2s ease-in;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 400;
  border-bottom: solid 1px #efefef;
`;

const Item = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px #efefef;
  margin-bottom: 0.25rem;
  font-weight: 400;
`;
const Ul = styled.ul`
  padding: 0;
`;

const Total = styled.p`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 1.5rem;
`;

const Button = styled.button`
  background: linear-gradient(to left, #360033, #0b8793);
  font-size: 2rem;
  color: inherit;
  border: none;
  outline: none;
  width: 100%;
  font-weight: 400;
  padding: 1rem;
  color: white;
  &:hover {
    cursor: pointer;
  }
`;

const Cart = () => {
  const { cart, isOpen, openCart, closeCart, total } = useCart();
  const router = useRouter();

  const navigateToCheckout = () => {
    closeCart();
    router.push("/checkout");
  };

  const handleClick = () => {
    closeCart();
  };

  return (
    <Container isOpen={isOpen}>
      <XContainer>
        <X onClick={handleClick} />
      </XContainer>
      <Content>
        <Title>Cart</Title>
        {cart.length > 0 ? (
          <>
            <Ul>
              {cart.map((item) => {
                return (
                  <Item key={item.name}>
                    <span>
                      {item.name} x {item.qty}
                    </span>
                    <span>${item.price / 100}.00</span>
                  </Item>
                );
              })}
            </Ul>
            <Total>
              <span>Total</span>
              <span>${total / 100}.00</span>
            </Total>
            <Button onClick={navigateToCheckout}>Checkout</Button>
          </>
        ) : (
          <p>There are no items in your cart</p>
        )}
      </Content>
    </Container>
  );
};

export default Cart;
