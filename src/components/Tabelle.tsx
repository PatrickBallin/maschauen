import {
  Box,
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FunctionComponent } from "react";
import { TrainingsDaten } from "../pages/Dashboard";

type TabelleProps = { dataTraining: TrainingsDaten[] };

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number
// ) {
//   return { name, calories, fat, carbs, protein };
// }

function createData(
  id: number,
  kcal: number,
  name: string,
  time: number,
  type: string
) {
  return { id, kcal, name, time, type };
}

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

const Tabelle: FunctionComponent<TabelleProps> = (props) => {
  const rows = props.dataTraining;

  const printData = () => {
    console.log("ROOOOOWS", rows);
    if (rows) {
      return (
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.kcal}</TableCell>
              <TableCell align="right">{row.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      );
    } else {
      return <></>;
    }
  };

  return (
    <TableContainer component={Paper} sx={{ width: "80vw", ml: 15, mt: 5 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">Datum</TableCell>
            <TableCell align="right">Kalorien verbraucht kcal</TableCell>
            <TableCell align="right">Trainingsart</TableCell>
          </TableRow>
        </TableHead>
        {printData()}
      </Table>
    </TableContainer>
  );
};

export default Tabelle;
