import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import { authenticationService } from "../_services";

const Empty = styled.header`
  display: none;
`;

const Header = styled.header`
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  background-color: rgba(20, 20, 20, 0.8);
  z-index: 10;
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
`;

const List = styled.ul`
  display: flex;
`;

const Item = styled.li`
  width: 80px;
  height: 50px;
  text-align: center;
  border-bottom: 3px solid
    ${props => (props.current ? "#3498db" : "transparent")};
  transition: border-bottom 0.5s ease-in-out;
`;

const SLink = styled(Link)`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoutContainer = styled.li`
  display: flex;
  height: 50px;
  width: calc(100vw - 80 * 3.5px);
  justify-content: flex-end;
  margin: 0 0 0 auto;
`;

const Logout = styled.button.attrs(props => ({
  onClick: props.onClick
}))`
  height: 50px;
  color: white;
  font-size: 14px;
  font-weight: 200;
  display: flex;
  align-items: center;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: rgba(20, 20, 20, 0.8);
`;

export default withRouter(({ location: { pathname } }) =>
  pathname !== "/" ? (
    <Header>
      <List>
        <Item current={pathname === "/movie"}>
          <SLink to="/movie">Movies</SLink>
        </Item>
        <Item current={pathname === "/tv"}>
          <SLink to="/tv">TV</SLink>
        </Item>
        <Item current={pathname === "/search"}>
          <SLink to="/search">Search</SLink>
        </Item>

        <LogoutContainer>
          <Logout onClick={authenticationService.logout}>Log out</Logout>
        </LogoutContainer>
      </List>
    </Header>
  ) : (
    <Empty />
  )
);
