import React, { useReducer } from "react";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { billsAction } from "store/bills-slice";

const FormContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
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

// const Input = styled.input`
//   border: none;
//   outline: none;
//   height: 18px;
//   font-size: 16px;
// `;

const initialState = {
  description: "",
  category: "",
  amount: "",
  date: "",
};

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

const AddBill = () => {
  const dispatch = useDispatch();

  const [form, dispatchForm] = useReducer(formReducer, initialState);

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
      id: `${form.description.slice(0, 5)}_${form.amount}_${form.date}`,
      desc: form.description,
      cat: form.category,
      amt: form.amount,
      date: form.date,
    };

    dispatch(billsAction.addItem(bill));
    dispatchForm({ type: action_types.clear });
    toast.success("💷 expense added!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleInputChange = (type) => (e) => {
    dispatchForm({ type: type, payload: e.target.value });
  };

  return (
    <FormContainer>
      <form>
        <InputWrapper>
          {/* <label>Enter the description:</label> */}
          <EmojiWrapper>
            <label htmlFor="desc">📝</label>
          </EmojiWrapper>
          <input
            id="desc"
            type="text"
            value={form.description}
            onChange={handleInputChange(action_types.description)}
            placeholder="What did you spent your money on?"
          />
        </InputWrapper>
        <InputWrapper>
          {/* <label>Category: </label> */}
          <EmojiWrapper>
            <label htmlFor="category">➡️</label>
          </EmojiWrapper>
          <input
            id="category"
            type="text"
            value={form.category}
            onChange={handleInputChange(action_types.category)}
            placeholder="what category did it belonged to?"
          />
        </InputWrapper>
        <InputWrapper>
          {/* <label>Amount spent:</label> */}
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
            placeholder="How much did it cost you?"
          />
        </InputWrapper>
        <InputWrapper>
          {/* <label>When did you spent it?</label> */}
          <EmojiWrapper>
            <label htmlFor="date">📅</label>
          </EmojiWrapper>
          <input
            className="calender"
            id="date"
            type="date"
            value={form.date}
            onChange={handleInputChange(action_types.date)}
            placeholder="When did you paid it?"
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
      <ToastContainer />
    </FormContainer>
  );
};

export default AddBill;
