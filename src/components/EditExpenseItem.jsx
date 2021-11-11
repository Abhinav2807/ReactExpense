import React, { useReducer } from "react";
import { useDispatch } from "react-redux";
import { billsAction } from "store/bills-slice";
import styled from "styled-components";
import Modal from "./UI/Modal";

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

const EmojiWrapper = styled.div`
  width: 25px;
  padding-bottom: 3px;
  margin-right: 5px;
  font-size: 18px;
  & > label {
    cursor: pointer;
  }
`;

const initialState = {};

const action_types = {
  description: "ENTER_DESC",
  category: "ENTER_CAT",
  amount: "ENTER_AMT",
  date: "ENTER_DATE",
  clear: "EMPTY_INPUT",
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "ENTER_DESC":
      return { ...state, description: action.payload };
    case "ENTER_CAT":
      return { ...state, category: action.payload };
    case "ENTER_AMT":
      return {
        ...state,
        amount: parseFloat(action.payload === "" ? 0 : action.payload),
      };
    case "ENTER_DATE":
      return { ...state, date: action.payload };
    case "EMPTY_INPUT":
      return { ...initialState };
    default:
      throw new Error();
  }
};

const EditExpenseItem = (props) => {
  const [form, dispatchForm] = useReducer(formReducer, {
    description: props.item.description,
    category: props.item.category,
    amount: props.item.amount,
    date: props.item.date,
  });

  const dispatch = useDispatch();

  let formIsValid =
    form.description.length !== 0 &&
    form.category.length !== 0 &&
    !(form.amount <= 0) &&
    form.date !== "";

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (
      !(form.description && form.category && form.amount !== 0 && form.date)
    ) {
      return;
    }

    const bill = {
      desc: form.description,
      cat: form.category,
      amt: form.amount,
      date: form.date,
    };

    dispatch(billsAction.editItem({ ...bill, id: props.item.id }));
    props.setShowModal(false);
  };

  const handleInputChange = (type) => (e) => {
    dispatchForm({ type: type, payload: e.target.value });
  };

  return (
    <Modal setShowModal={props.setShowModal} isLogin={false}>
      <form>
        <InputWrapper>
          <EmojiWrapper>
            <label htmlFor="desc">📝</label>
          </EmojiWrapper>
          <input
            id="desc"
            type="text"
            value={form.description}
            onChange={handleInputChange(action_types.description)}
          />
        </InputWrapper>
        <InputWrapper>
          <EmojiWrapper>
            <label htmlFor="category">➡️</label>
          </EmojiWrapper>
          <input
            id="category"
            type="text"
            value={form.category}
            onChange={handleInputChange(action_types.category)}
          />
        </InputWrapper>
        <InputWrapper>
          <EmojiWrapper>
            <label htmlFor="amount">💲</label>
          </EmojiWrapper>
          <input
            id="amount"
            type="number"
            step="1"
            min={0}
            value={form.amount}
            onChange={handleInputChange(action_types.amount)}
          />
        </InputWrapper>
        <InputWrapper>
          <EmojiWrapper>
            <label htmlFor="date">📅</label>
          </EmojiWrapper>
          <input
            className="calender"
            id="date"
            type="date"
            value={form.date}
            onChange={handleInputChange(action_types.date)}
          />
        </InputWrapper>
        <Button
          type="submit"
          onClick={handleFormSubmit}
          disabled={!formIsValid}
        >
          submit
        </Button>
      </form>
    </Modal>
  );
};

export default EditExpenseItem;
