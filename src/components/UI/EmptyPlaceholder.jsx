import React from "react";
import styled from "styled-components";

const Container = styled.p`
  font-size: 2rem;
  text-align: center;
  color: white;
  font-weight: 500;
  margin-top: 50px;
`;

const EmptyPlaceholder = (props) => {
  return <Container>{props.children}</Container>;
};

export default EmptyPlaceholder;
