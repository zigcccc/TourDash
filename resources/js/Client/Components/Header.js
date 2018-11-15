import React from "react";
import { NavLink } from "react-router-dom";
import styled, { withTheme } from "styled-components";

const Header = styled.header`
  background-color: ${props => props.theme.dark};
  min-height: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AppHeader = props => (
  <Header>
    <NavLink
      exact
      style={{ color: "white", margin: "0 1em" }}
      activeStyle={{ fontWeight: "bold" }}
      to="/"
    >
      Home
    </NavLink>
    <NavLink
      style={{ color: "white", margin: "0 1em" }}
      activeStyle={{ fontWeight: "bold" }}
      to="/rooms"
    >
      Rooms
    </NavLink>
    <a style={{ color: "white", margin: "0 1em" }} href="/admin">
      Admin
    </a>
  </Header>
);

export default withTheme(AppHeader);
