import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  font-size: 28px;
  margin-top: 20px;
`;

export default () => (
  <Container>
    <Helmet>
      <title>Loading | Nomflix</title>
    </Helmet>
    <span role="img" aria-label="Loading">
      ⏰
    </span>
  </Container>
);
