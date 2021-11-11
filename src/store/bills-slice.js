import { createSlice } from "@reduxjs/toolkit";

const billsSlice = createSlice({
  name: "bills",
  initialState: { items: [], totalAmount: 0 },
  reducers: {
    addItem(state, action) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) return;

      state.items.push({
        id: action.payload.id,
        description: action.payload.desc,
        category: action.payload.cat,
        amount: action.payload.amt,
        date: action.payload.date,
      });
    },
    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    editItem(state, action) {
      for (let item of state.items) {
        if (item.id === action.payload.id) {
          item.description = action.payload.desc;
          item.category = action.payload.cat;
          item.amount = action.payload.amt;
          item.date = action.payload.date;

          break;
        }
      }
    },
  },
});

export const billsAction = billsSlice.actions;

export default billsSlice;
