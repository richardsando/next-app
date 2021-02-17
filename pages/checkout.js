import React from "react";
import Page from "../components/styled/Page";
import useCart from "../hooks/useCart";
import styled from "styled-components";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

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
  margin-bottom: 1rem;
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

const Checkout = () => {
  const { cart, total } = useCart();

  const processPayment = async () => {
    const url = "/.netlify/functions/charge-card";
    const newCart = cart.map(({ id, qty }) => ({
      id,
      qty,
    }));

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
    const { data } = await axios.post(url, { cart: newCart });
    await stripe.redirectToCheckout({ sessionId: data.id });
    
  };

  return (
    <Page>
      <h2>Checkout</h2>
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
          <Button onClick={processPayment}>Proccess Payment</Button>
        </>
      ) : (
        <p>You don't appear to have any items in your cart!</p>
      )}
    </Page>
  );
};

export default Checkout;
