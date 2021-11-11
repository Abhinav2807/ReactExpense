import styled from "styled-components";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";

const Container = styled.div`
  height: 80%;
  display: flex;
  flex-direction: column;
`;

const ChartBoard = (props) => {
  const bills = useSelector((state) => state.bills.items);
  const labels = bills.map((bill) => bill.description);
  const amount = bills.map((bill) => bill.amount);
  var colorArray = [
    "#39c2f5",
    "#901b38",
    "#6fe727",
    "#cdf899",
    "#e4af4d",
    "#29f9ad",
    "#8a6eb4",
    "#f6ea57",
    "#774ae",
    "#971f90",
    "#a32f2b",
    "#d4dae0",
    "#c6feac",
    "#27e02c",
    "#735464",
    "#1d0350",
    "#d52828",
    "#2cdc71",
    "#f479fd",
    "#680a84",
    "#1993ce",
    "#9e7b3f",
    "#977ce1",
    "#b0394e",
    "#881266",
    "#fd2270",
    "#2129a2",
    "#32b809",
    "#e736f5",
    "#6ef5d9",
    "#e84411",
    "#a9c449",
    "#3d0d54",
    "#3df323",
    "#3510be",
    "#ffbca0",
    "#b99d24",
    "#8ec669",
    "#32def3",
    "#d97995",
    "#47b05b",
    "#36f069",
    "#eff5c8",
    "#b72568",
    "#5b882d",
    "#c5e113",
    "#fbca43",
    "#53e93e",
    "#83650b",
    "#8a9ed2",
  ];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "# of Votes",
        data: amount,
        backgroundColor: colorArray,
        borderColor: colorArray,
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Container>
        <Doughnut
          height={30}
          responsive="true"
          width={60}
          options={{ maintainAspectRatio: false }}
          data={data}
        ></Doughnut>
      </Container>
    </>
  );
};

export default ChartBoard;
