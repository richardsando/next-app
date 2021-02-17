import styled from "styled-components";
import { Normalize } from "styled-normalize";
import Navbar from "../components/Navbar";
import CartProvider from "../context/Cart";
import Cart from "../components/Cart";

const Container = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;400;700&display=swap");
  background: pink;
  font-family: "Poppins", sans-serif;
  background: linear-gradient(to left, #360033, #0b8793);
  color: #444;
  min-height: 100vh;
`;

const Page = styled.div`
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
`;

const MyApp = ({ Component, pageProps }) => {
  return (
    <CartProvider>
      <Container>
        {/* normalize is a package which removes all browser styling */}
        <Normalize />
        <Navbar></Navbar>
        <Page>
          <Component {...pageProps} />
        </Page>
        <Cart />
      </Container>
    </CartProvider>
  );
};

export default MyApp;
