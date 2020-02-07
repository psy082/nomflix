import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import Login from "../../Components/Login";

const Container = styled.div`
  display: flex;
  justify-content: center;
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
  position: relative;
  padding: 60px 68px 40px;
  margin: 0px;
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

const handleClick = () => {
  let id = "demo";
  let token = "demo";

  localStorage.setItem("currentUser", JSON.stringify({ id, token }));
  window.location.reload();
};

const DemoLogin = styled.button.attrs(props => ({
  onClick: props.onClick
}))`
  display: block;
  position: relative;
  padding: 0;
  margin: 100px auto;
  width: 222px;
  height: 49px;
  line-height: 49px;
  color: black;
  background-color: #2980b9;
  border: 1px solid transparent;
  outline: 0;
  border-radius: 3px;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  z-index: 1;
`;

const SiteFooter = styled.div`
  position: fixed;
  bottom: 0px;
  background-color: rgba(0, 0, 0, 0.75);
  height: 35px;
  width: 100%;
  z-index: 10;
`;

const CopyRight = styled.span`
  position: absolute;
  right: 15px;
  bottom: 10px;
  color: rgba(236, 240, 241, 0.4);
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
      <DemoLogin onClick={handleClick}>바로 로그인 하기</DemoLogin>
    </LoginContainer>
    <SiteFooter>
      <CopyRight>&copy; copyright TestSite</CopyRight>
    </SiteFooter>
  </Container>
);

export default HomePresenter;
