import React, { useState } from "react";
import styled from "styled-components";
import { BiUser } from "react-icons/bi";
import { AiOutlineAppstoreAdd, AiOutlineLineChart } from "react-icons/ai";
import { MdOutlineAttachMoney, MdReportGmailerrorred } from "react-icons/md";

const Container = styled.div`
  grid-column: 1;
  grid-row: 2;
  padding: 5vh 3vw;
  border-right: 2px solid #9090902e;
`;

const ItemWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 60px;
  cursor: pointer;
`;

const TextWrapper = styled.div`
  margin-right: 20px;
  max-width: 138px;
`;

const Title = styled.h4`
  font-size: calc(5px + 1.5vmin);
  font-weight: 500;
  color: white;
  margin: 0;
  margin-bottom: 7px;
  text-align: right;
  /* line-height: 2; */
`;

const SubTitle = styled.h5`
  font-size: calc(5px + 1.25vmin);
  font-weight: 400;
  color: #9e9e9e;
  margin: 0;
  text-align: right;
`;

const IconWrapper = styled.div`
  border-radius: 25px;
  width: 48px;
  height: 48px;
  background-color: ${(props) => (props.activated ? "#2db27c" : "#494a7d")};
  display: flex;
  justify-content: center;
  align-items: center;
`;

// const IconContainer = styled.div`
//   padding-top: 10px;
// `;

const NavigatorItem = (props) => {
  return (
    <ItemWrapper onClick={props.onClick}>
      <TextWrapper>
        <Title>{props.title}</Title>
        <SubTitle>{props.subTitle}</SubTitle>
      </TextWrapper>
      <IconWrapper activated={props.isActivated}>
        {props.icon === "BiUser" && <BiUser size={24} color="white" />}
        {props.icon === "AiOutlineAppstoreAdd" && (
          <AiOutlineAppstoreAdd size={24} color="white" />
        )}
        {props.icon === "AiOutlineLineChart" && (
          <AiOutlineLineChart size={24} color="white" />
        )}
        {props.icon === "MdOutlineAttachMoney" && (
          <MdOutlineAttachMoney size={24} color="white" />
        )}
      </IconWrapper>
    </ItemWrapper>
  );
};

const Navigation = (props) => {
  const [activatedRoute, setActivatedRoute] = useState("new");

  const handleNavigation = (route) => {
    setActivatedRoute(route);
    props.onRouteChange(route);
  };

  return (
    <Container>
      <NavigatorItem
        title="New Expense"
        subTitle="Add new expenditure"
        icon="BiUser"
        isActivated={activatedRoute === "new" ? true : false}
        onClick={handleNavigation.bind(this, "new")}
      />
      <NavigatorItem
        title="Your Expenses"
        subTitle="Watch, manage and learn from past expenses"
        icon="AiOutlineAppstoreAdd"
        isActivated={activatedRoute === "list" ? true : false}
        onClick={handleNavigation.bind(this, "list")}
      />
      <NavigatorItem
        title="Your Chart"
        subTitle="A chart for your expenses"
        icon="AiOutlineLineChart"
        isActivated={activatedRoute === "chart" ? true : false}
        onClick={handleNavigation.bind(this, "chart")}
      />
      <NavigatorItem
        title="Manage bills"
        subTitle="prioritize bills, set monthly budget and more"
        icon="MdOutlineAttachMoney"
        isActivated={activatedRoute === "manage" ? true : false}
        onClick={handleNavigation.bind(this, "manage")}
      />
    </Container>
  );
};

export default Navigation;
