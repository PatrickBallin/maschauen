import { Box, Button, TextField, Typography } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import Actionbar from "../components/Actionbar";
import Card from "../components/Card";
import Chart from "../components/Chart";
import Tabelle from "../components/Tabelle";
import { UserContextType } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type DashboardProps = {
  user: UserContextType;

  onValueChange: (obj: Partial<UserContextType>) => void;
};

export type GewichtsDaten = {
  id: number;
  date: string;
  weight: number;
};

export type TrainingsDaten = {
  id: number;
  userId: number;
  date: string;
  kcal: number;
  name: string;
  time: number;
  type: string;
};

const Dashboard: FunctionComponent<DashboardProps> = (props) => {
  // Ausloggen Button
  // Text
  // action Bar --> Training hinzufügen & Gewicth ändern
  // 2-4 Cards
  // 2 Graphen
  // Tabelle
  const [abnehmRate, setAbnehmRate] = useState<string>("");
  const [abnehmPrognose, setabnehmPrognose] = useState<string>("");

  const [isWeightButtonPressed, setIsWeightButtonPressed] =
    useState<Boolean>(false);
  const [istTrainingButtonPressed, setIstTrainingButtonPressed] =
    useState<Boolean>(false);

  const [gewicht, setGewicht] = useState<number>(1);

  const [trainingsName, setTrainingsName] = useState<string>("");
  const [trainingKcal, setTrainingKcal] = useState<number>(0);
  const [trainingTime, setTrainingtime] = useState<number>(0);
  const [trainingType, setTrainingType] = useState<string>("");

  const [gewichtsDaten, setGewichtsDaten] = useState<GewichtsDaten[]>();
  const [trainingsDaten, setTrainingsDaten] = useState<TrainingsDaten[]>();

  const navigate = useNavigate();

  const handleLogOut = () => {
    props.onValueChange({ id: 999, username: "", password: "" });
    navigate("/");
  };

  const handleGewichtSubmit = async (e: any) => {
    e.preventDefault();

    await axios
      .post("http://localhost:8080/postUWeight", {
        userID: props.user.id,
        weight: gewicht,
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  const handleTrainingSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Training: ", trainingsName, trainingKcal);

    // Adding of TRAINING
    await axios
      .post("http://localhost:8080/AddTraining", {
        userId: props.user.id,
        name: trainingsName,
        kcal: trainingKcal,
        duration: trainingTime,
        trainingType: trainingType,
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  const loadData = async () => {
    console.log("Users --> ", props.user);

    // Abnehmrate CARD OBEN
    await axios
      .post("http://localhost:8080/getAbnehmrate", {
        id: props.user.id,
        username: props.user.username,
        password: props.user.password,
      })
      .then((response) => {
        setAbnehmRate(response.data);
        console.log("-------", response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // Gewichte GRAPH LINKS
    await axios
      .post("http://localhost:8080/getGewichtsDaten", {
        id: props.user.id,
        username: props.user.username,
        password: props.user.password,
      })
      .then((response) => setGewichtsDaten(response.data))
      .catch((err) => {
        console.log(err);
      });

    // Trainingseinheiten TABELLE UNTEN
    await axios
      .post("http://localhost:8080/getTrainingsDaten", {
        id: props.user.id,
        username: props.user.username,
        password: props.user.password,
      })
      .then((response) => setTrainingsDaten(response.data))
      .catch((err) => {
        console.log(err);
      });

    console.log("GEWICHTE", gewichtsDaten);
    console.log("TRAINIGNSEINHEITEN", trainingsDaten);
  };

  const handleGewichtButton = () => {
    setIsWeightButtonPressed(!isWeightButtonPressed);
  };

  const handleTrainingButton = () => {
    setIstTrainingButtonPressed(!istTrainingButtonPressed);
  };

  const getPrognoseGewicht = () => {
    return Number(parseFloat(abnehmRate) * 30).toFixed(2);
  };

  const getKalorienDefizit = () => {
    return Number(parseFloat(abnehmRate) * 8000).toFixed(2);
  };

  return (
    <>
      <Box sx={{ mt: 5, ml: 15 }}>
        <Button size="small" onClick={handleLogOut}>
          Ausloggen
        </Button>
        <Button sx={{ ml: 2 }} size="small" onClick={loadData}>
          Update Data
        </Button>
        <Typography sx={{ fontWeight: "bold", mt: 2 }}>
          Hallo {props.user.username}, hier siehst du deine Statistiken
        </Typography>
      </Box>
      <Actionbar
        onTrainingChange={handleTrainingButton}
        onGewichtChange={handleGewichtButton}
      ></Actionbar>
      {isWeightButtonPressed && (
        <Box sx={{ height: "150px", width: "100%", backgroundColor: "white" }}>
          <form onSubmit={(e) => handleGewichtSubmit(e)}>
            <TextField
              variant="outlined"
              id="gewicht"
              name="gewicht"
              label="Neues Gewicht"
              onChange={(e) => {
                setGewicht(parseInt(e.target.value));
              }}
              value={gewicht}
              sx={{ ml: "50vw", mt: 3 }}
            ></TextField>{" "}
            <Button variant="outlined" sx={{ mt: 4 }} type="submit">
              Change
            </Button>
          </form>
        </Box>
      )}
      {istTrainingButtonPressed && (
        <Box sx={{ height: "150px", width: "100%", backgroundColor: "white" }}>
          <form onSubmit={(e) => handleTrainingSubmit(e)}>
            <TextField
              variant="outlined"
              id="trainingName"
              name="trainingName"
              label="Trainings Name"
              value={trainingsName}
              onChange={(e) => {
                setTrainingsName(e.target.value);
              }}
              sx={{ ml: "30vw", mt: 3 }}
            ></TextField>
            <TextField
              variant="outlined"
              id="trainingKcal"
              name="trainingKcal"
              label="Kcal"
              value={trainingKcal}
              onChange={(e) => {
                setTrainingKcal(parseInt(e.target.value));
              }}
              sx={{ mt: 3 }}
            ></TextField>
            <TextField
              variant="outlined"
              id="trainingDuration"
              name="trainingDuration"
              label="Länge"
              value={trainingTime}
              onChange={(e) => {
                setTrainingtime(parseInt(e.target.value));
              }}
              sx={{ mt: 3 }}
            ></TextField>
            <TextField
              variant="outlined"
              id="trainingType"
              name="trainingType"
              label="Type"
              value={trainingType}
              onChange={(e) => {
                setTrainingType(e.target.value);
              }}
              sx={{ mt: 3 }}
            ></TextField>
            <Button variant="outlined" sx={{ ml: "30vw", mt: 4 }} type="submit">
              Add
            </Button>
          </form>
        </Box>
      )}
      <Box
        sx={{
          width: "80vw",
          display: "flex",

          justifyContent: "space-between",
          ml: 15,
          mt: 5,
        }}
      >
        <Card
          title="Abnehmrate"
          value={Number(abnehmRate).toFixed(2)}
          additional=" / Tag"
        ></Card>
        <Card
          title="Prognosegewicht"
          value={getPrognoseGewicht()}
          additional=" kg in 30 Tagen"
        ></Card>
        <Card
          title="Kalorien Defizit"
          value={getKalorienDefizit()}
          additional=" kcal / Tag"
        ></Card>
        <Card title="Bestes Training" value="Montag 12. Januar"></Card>
      </Box>

      <Box
        sx={{
          width: "80vw",
          ml: 15,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          flexDirection: "row",
        }}
      >
        <Chart
          title="Gewichts Tracker: "
          renderType={1}
          dataGewicht={gewichtsDaten}
        ></Chart>
        <Chart
          title="Traingseinheiten Tracker:"
          renderType={2}
          dataTraining={trainingsDaten}
        ></Chart>
      </Box>
      {trainingsDaten && <Tabelle dataTraining={trainingsDaten}></Tabelle>}

      <Box sx={{ height: "100px" }}></Box>
    </>
  );
};

export default Dashboard;
