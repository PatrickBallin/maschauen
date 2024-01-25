import { Box, Button, Typography } from "@mui/material";
import { BarChart, LineChart } from "@mui/x-charts";
import { FunctionComponent, useEffect, useState } from "react";
import { GewichtsDaten, TrainingsDaten } from "../pages/Dashboard";

type ChartProps = {
  dataGewicht?: GewichtsDaten[];
  dataTraining?: TrainingsDaten[];

  renderType: number; // Wenn 1 gewichte, wenn 2 Trainingseinheiten
  title: string;
};

const Chart: FunctionComponent<ChartProps> = (props) => {
  const [gewichtsDatenXAxis, setGewichtsDatenXAxis] = useState<string[]>();
  const [gewichtsDatenYAxis, setGewichtsDatenYAxis] = useState<number[]>();

  const [trainingsDatenXAxis, setTrainingsDatenXAxis] = useState<number[]>();
  const [trainingsDatenYAxis, setTrainingsDatenYAxis] = useState<number[]>();

  const [isRenderReady, setIsRenderReady] = useState<boolean>(false);

  const renderGewichtsDaten = () => {
    if (props.renderType === 1) {
      if (gewichtsDatenXAxis) {
        return (
          <BarChart
            className="PLs Work"
            xAxis={[{ scaleType: "band", data: gewichtsDatenXAxis }]}
            series={[
              {
                data: gewichtsDatenYAxis,
                color: "#02B2AF",
              },
            ]}
            height={300}
          />
        );
      }
    } else {
      return (
        <BarChart
          className="PLs Work"
          xAxis={[{ scaleType: "band", data: trainingsDatenXAxis }]}
          series={[
            {
              data: trainingsDatenYAxis,
              color: "#B800D8",
            },
          ]}
          height={300}
        />
      );
    }
  };

  const update = () => {
    if (props.renderType === 1) {
      setGewichtsDatenXAxis(
        props.dataGewicht?.map((gewichte) => gewichte.date)
      );
      setGewichtsDatenYAxis(
        props.dataGewicht?.map((gewichte) => gewichte.weight)
      );
    } else {
      setTrainingsDatenXAxis(props.dataTraining?.map((elem) => elem.id));
      setTrainingsDatenYAxis(props.dataTraining?.map((elem) => elem.kcal));
    }

    setIsRenderReady(true);
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          width: "38vw",
          borderRadius: 3,
          boxShadow: "2px 2px 2px rgba(200,200,200, .4)",
          minWidth: "500px",
          mt: 5,
        }}
      >
        <Button onClick={update}>Render</Button>
        <Typography variant="h6" sx={{ mt: 2, ml: 4 }}>
          {props.title}
        </Typography>
        {isRenderReady && renderGewichtsDaten()}
      </Box>
    </>
  );
};

export default Chart;
