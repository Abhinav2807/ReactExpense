import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { billsAction } from "store/bills-slice";
import styled from "styled-components";
import EditExpenseItem from "./EditExpenseItem";
import ExpenseDate from "./ExpenseDate";
import EmptyPlaceholder from "./UI/EmptyPlaceholder";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding: 0 10px;

  & > p {
    font-size: 1.5rem;
    font-weight: 500;
    margin: 0;
    color: white;
    flex: 4;
  }

  & > select {
    flex: 1;
    background-color: #36da98;
    color: white;
    font-weight: 500;
    border: none;
  }
`;

const ListItemWrapper = styled.div`
  display: flex;
  margin-bottom: 25px;
`;

const ListContainer = styled.ul`
  list-style: none;
  max-height: 55vh;
  padding: 0;
  margin: 0;
  overflow-y: auto;
`;

const Actions = styled.div`
  margin-left: 10px;
  display: ${(props) => (props.showAction ? "flex" : "none")};
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const ListItem = styled.li`
  flex: 1;
  border-radius: 12px;
  border: 2px solid #2db27c;
  padding: 10px 10px;
  min-height: 52px;
  display: flex;
  align-items: center;

  & > div {
    margin: 0;
    display: inline-block;
    max-width: 100%;
    font-size: 18px;
    background-color: transparent;
    width: 100%;
    color: white;
    text-align: "center";
    /* border: 1px solid white; */
    display: flex;
    justify-content: space-between;
  }

  & > div > .price {
    display: flex;
    align-items: center;
    font-size: 1.35rem;
    font-weight: 500;
  }
`;

const TextContent = styled.div`
  flex: 0.65;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 10px;

  & > .title {
    font-size: 1.5rem;
    text-transform: capitalize;
    line-height: 1;
    font-weight: 500;
    margin-bottom: 5px;
  }

  & > .subtitle {
    font-size: 0.8rem;
    color: #c9c9c9;
    font-style: italic;
  }
`;

const IconContainer = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.success ? "rgba(255, 87, 51)" : "rgb(218, 247, 166)"};
  cursor: pointer;
`;

const Item = ({ item, onEdit }) => {
  const dispatch = useDispatch();
  const [showAction, setShowAction] = useState(false);

  const handleListItemAction = () => {
    setShowAction((p) => !p);
  };

  const handleListItemDel = () => {
    dispatch(billsAction.removeItem({ id: item.id }));
  };

  return (
    <ListItemWrapper key={item.id}>
      <ListItem
        key={item.id}
        style={{ color: "white" }}
        onClick={handleListItemAction}
      >
        <div>
          <ExpenseDate date={item.date} />
          <TextContent>
            <span className="title">{item.description}</span>
            <span className="subtitle">{item.category}</span>
          </TextContent>
          <span className="price">${item.amount}</span>
        </div>
      </ListItem>
      <Actions showAction={showAction}>
        <IconContainer success onClick={handleListItemDel}>
          <AiOutlineDelete size={16} color="black" />
        </IconContainer>
        <IconContainer onClick={onEdit.bind(this, item)}>
          <AiOutlineEdit size={16} color="black" />
        </IconContainer>
      </Actions>
    </ListItemWrapper>
  );
};

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [editableItem, setEditableItem] = useState({});
  const [currentCategory, setCurrentCategory] = useState("all");

  const bills = useSelector((state) => state.bills.items);

  const categories = [...new Set(bills.map(({ category }) => category))];

  const handleCategoryChange = (e) => {
    const name = e.target.value;
    setCurrentCategory(name);
  };

  const handleEditModalShow = (item) => {
    setShowModal((p) => !p);
    setEditableItem(item);
  };

  let content = <EmptyPlaceholder>IT FEELS EMPTY!</EmptyPlaceholder>;

  if (bills.length > 0) {
    content = (
      <ListContainer>
        {currentCategory !== "all" &&
          bills
            .filter((item) => item.category === currentCategory)
            .map((item) => (
              <Item item={item} onEdit={handleEditModalShow} key={item.id} />
            ))}
        {currentCategory === "all" &&
          bills.map((item) => (
            <Item item={item} onEdit={handleEditModalShow} key={item.id} />
          ))}
      </ListContainer>
    );
  }

  return (
    <>
      {showModal && (
        <EditExpenseItem setShowModal={setShowModal} item={editableItem} />
      )}
      <Container>
        <Header>
          <p>Your Expenses</p>
          <select
            name="categories"
            id="categories"
            onChange={handleCategoryChange}
            value={currentCategory}
            className="form-select"
          >
            <option value="all">all</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Header>
        {content}
      </Container>
    </>
  );
};

export default Dashboard;
