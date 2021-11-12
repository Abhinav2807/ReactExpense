import styled from "styled-components";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import EmptyPlaceholder from "./UI/EmptyPlaceholder";

const Container = styled.div`
  height: 80%;
  display: flex;
  flex-direction: column;
`;

const ChartBoard = (props) => {
  let bills = useSelector((state) => state.bills.items);
  console.log(bills);
  bills = bills.slice().sort((a, b) => b.date - a.date);
  const labels = bills.map((bill) => bill.date).reverse();
  const amount = bills.map((bill) => bill.amount).reverse();
  var colorArray = ["#39c2f5"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "$ Amount Spent ",
        data: amount,
        backgroundColor: colorArray[0],
        borderColor: colorArray[0],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Container>
        {amount.length != 0 ? (
          <Line
            height={30}
            responsive="true"
            width={60}
            options={{ maintainAspectRatio: false }}
            data={data}
          />
        ) : (
          <EmptyPlaceholder>No Charts To View</EmptyPlaceholder>
        )}
      </Container>
    </>
  );
};

export default ChartBoard;
