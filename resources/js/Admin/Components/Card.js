import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
	border-radius: 5px;
	box-shadow: ${props => props.theme.lightShadow};
  background: ${props => props.theme.white};
  position: relative;
  padding: 20px 25px 40px;
  height: auto;
  :before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background: ${props => props.theme.mainColor};
    height: 5px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
`;

const Card = props => {
	return <CardContainer>{props.children}</CardContainer>;
};

export default Card;
