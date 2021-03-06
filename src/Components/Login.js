import React from "react";
import styled from "styled-components";
import KakaoLogin from "react-kakao-login";

import { authenticationService } from "../_services";

const key = "441ae57defe8ff816b06321ae00f0d49";

const success = result => {
  const { response, profile } = result;
  let { access_token } = response;
  let { id } = profile;
  id = id.toString();

  authenticationService.loginByKakao(id, access_token);
};

const failure = console.error;

const StyledKakaoLogin = styled(KakaoLogin).attrs(props => ({
  jsKey: props.jsKey,
  onSuccess: props.onSuccess,
  onFailure: props.onFailure,
  getProfile: props.getProfile
}))`
  display: block;
  position: relative;
  padding: 0;
  margin: 100px auto;
  width: 222px;
  height: 49px;
  line-height: 49px;
  color: #3c1e1e;
  background-color: #ffeb00;
  border: 1px solid transparent;
  outline: 0;
  border-radius: 3px;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  z-index: 1;
`;

const Login = () => (
  <StyledKakaoLogin
    jsKey={key}
    onSuccess={success}
    onFailure={failure}
    getProfile={true}
    buttonText="kakao로 로그인하기"
  />
);

export default Login;
