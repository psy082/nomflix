import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import Login from "../../Components/Login";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(1px);
  opacity: 0.5;
  z-index: -1;
`;

const LoginContainer = styled.div`
  display: block;
  margin: 0px auto;
  padding: 60px 68px 40px;
  width: 450px;
  height: 660px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.75);
`;

const LoginTitle = styled.h1`
  display: block;
  font-size: 32px;
  font-weight: 500;
  margin: 0px 0px 28px;
`;

const LoginMessage = styled.h2`
  display: block;
  font-size: 16px;
  margin: -12px 0px 20px;
`;

const HomePresenter = () => (
  <Container>
    <Helmet>
      <title>Nomflix</title>
    </Helmet>
    <Backdrop bgImage={require("../../assets/home-ko.jpg")} />
    <LoginContainer>
      <LoginTitle>로그인</LoginTitle>
      <LoginMessage>카카오톡으로 로그인 하세요</LoginMessage>
      <Login />
    </LoginContainer>
  </Container>
);

export default HomePresenter;
