import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import ExpenseDate from "./ExpenseDate";
import EmptyPlaceholder from "./UI/EmptyPlaceholder";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const EmojiWrapper = styled.div`
  width: 25px;
  padding-bottom: 3px;
  margin-right: 5px;
  font-size: 18px;
  & > label {
    cursor: pointer;
  }
`;

const InputWrapper = styled.div`
  border-radius: 12px;
  border: 2px solid #2db27c;
  padding: 0 20px;
  height: 48px;
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  position: relative;

  & > input {
    border: none;
    outline: none;
    height: 18px;
    font-size: 16px;
    background-color: transparent;
    width: 100%;
    color: white;
    caret-color: #2db27c;
  }

  & > input[type="date"].calender::-webkit-calendar-picker-indicator {
    background: transparent;
    bottom: 0;
    color: transparent;
    cursor: pointer;
    height: auto;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: auto;
  }
`;

const Header = styled.div`
  display: flex;
  margin-bottom: 25px;
  padding: 0 10px;

  & > form {
    display: flex;

    & > div {
      margin-right: 10px;
    }
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

const Button = styled.button`
  padding: 15px 40px;
  max-height: 48px;
  font-size: calc(7px + 1vmin);
  background-color: #2db27c;
  color: white;
  font-weight: 300;
  letter-spacing: 1px;
  cursor: pointer;
  border: none;
  border-radius: 50px;

  &:disabled {
    background-color: #494a7d;
    cursor: not-allowed;
  }
`;

const Item = ({ item }) => {
  return (
    <ListItemWrapper key={item.id}>
      <ListItem key={item.id} style={{ color: "white" }}>
        <div>
          <ExpenseDate date={item.date} />
          <TextContent>
            <span className="title">{item.description}</span>
            <span className="subtitle">{item.category}</span>
          </TextContent>
          <span className="price">${item.amount}</span>
        </div>
      </ListItem>
    </ListItemWrapper>
  );
};
let content = <EmptyPlaceholder>IT FEELS EMPTY!</EmptyPlaceholder>;

const BudgetBoard = () => {
  const [minimumBills, setMinimumBills] = useState([]);

  const bills = useSelector((state) => state.bills.items);
  const [budget, setBudget] = useState(null);

  const handleBudgetSubmit = (e) => {
    e.preventDefault();

    let newBills = printPowerSet(bills, bills.length, budget);

    if (newBills.length) {
      let minLen = newBills[0].length;
      let minAns = newBills[0];
      for (let o = 1; o < newBills.length; o++) {
        if (newBills[o].length < minLen) {
          minAns = newBills[o];
        }
      }

      setMinimumBills(minAns);
    } else {
      setMinimumBills([]);
      content = <EmptyPlaceholder>YOU ARE BROKE!</EmptyPlaceholder>;
    }
    toast.success("💷 Budget Prepared!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleBudgetChange = (e) => {
    setBudget(+e.target.value);
  };

  const printPowerSet = (set, set_size, maxLimit) => {
    let pow_set_size = parseInt(Math.pow(2, set_size));
    let counter, j;
    let ans = [];
    let maxTillNow = 0;
    for (counter = 1; counter < pow_set_size; counter++) {
      let temp = [];
      let sum = 0;
      for (j = 0; j < set_size; j++) {
        if ((counter & (1 << j)) > 0) {
          temp.push(set[j]);
          sum += +set[j]["amount"];
        }
      }

      if (sum <= maxLimit) {
        let last_sum = 0;
        if (ans.length > 0) {
          for (let m of ans[ans.length - 1]) {
            last_sum += +m["amount"];
          }
        }
        if (maxTillNow < sum) {
          maxTillNow = sum;
          ans = [];
        }
        //   console.log(temp);

        if (ans.length > 0 && last_sum <= sum) {
          if (last_sum < sum) {
            ans.shift();
          }

          ans.push(temp);
        }
        if (ans.length === 0) {
          ans.push(temp);
        }
      }
    }
    return ans;
  };

  if (!(minimumBills.length <= 0))
    content = (
      <ListContainer>
        {minimumBills.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ListContainer>
    );

  return (
    <>
      <Container>
        <Header>
          <form onSubmit={handleBudgetSubmit}>
            <InputWrapper>
              <EmojiWrapper>
                <label htmlFor="budget">🪙</label>
              </EmojiWrapper>
              <input
                id="budget"
                type="number"
                min="0"
                placeholder="Budget"
                onChange={handleBudgetChange}
              />
            </InputWrapper>
            <Button type="submit">submit</Button>
          </form>
        </Header>
        {content}
      </Container>
    </>
  );
};

export default BudgetBoard;
