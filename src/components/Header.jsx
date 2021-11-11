import React from "react";
import styled from "styled-components";

const Container = styled.div`
  grid-column: 1 / 3;
  grid-row: 1;
  border-bottom: 2px solid #9090902e;
`;

const Title = styled.h1`
  font-size: calc(10px + 2.5vmin);
  font-weight: 500;
  color: white;
  margin: 10px 0;
`;

const SubTitle = styled.h3`
  font-size: calc(5px + 1vmin);
  font-weight: 400;
  color: #9e9e9e;
  margin: 0;
`;

const Header = (props) => {
  return (
    <Container>
      <Title>{props.title}</Title>
      <SubTitle>{props.subTitle}</SubTitle>
    </Container>
  );
};

export default Header;
