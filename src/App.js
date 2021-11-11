import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "components/Header";
import Dashboard from "components/Dashboard";
import AddBill from "components/AddBillForm";
import Navigation from "components/Navigation";
import ChartBoard from "components/ChartBoard";
import Content from "components/UI/Content";
import "./App.css";
import BudgetBoard from "components/BudgetBoard";

function App() {
  const [route, setRoute] = useState("new");

  const handleRouteChange = (newRoute) => {
    setRoute(newRoute);
  };

  return (
    <>
      <div className="App">
        <Header
          title="Add your expense"
          subTitle="Add your expense for easy tracking and managing your budget!"
        />
        <Navigation onRouteChange={handleRouteChange} />
        <Content>
          {route === "new" && <AddBill />}
          {route === "list" && <Dashboard />}
          {route === "chart" && <ChartBoard />}
          {route === "manage" && <BudgetBoard />}
        </Content>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
