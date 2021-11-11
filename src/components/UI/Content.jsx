import React from "react";
import styled from "styled-components";

const Container = styled.div`
  grid-column: 2;
  grid-row: 2;
  padding: 5vh 3vw;
`;

const Content = (props) => {
  return <Container>{props.children}</Container>;
};

export default Content;
