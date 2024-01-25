import { Box, Button } from "@mui/material";
import { FunctionComponent } from "react";

type ActionbarProps = {
  onTrainingChange: () => void;
  onGewichtChange: () => void;
};

const Actionbar: FunctionComponent<ActionbarProps> = (props) => {
  return (
    <>
      <Box
        sx={{
          height: "50px",
          width: "80vw",
          ml: 15,
          mt: 1,
          borderRadius: 5,
          display: "flex",
          justifyContent: "right",
        }}
      >
        <Button
          onClick={props.onTrainingChange}
          size="small"
          variant="contained"
          sx={{ mr: 2 }}
        >
          Training hinzufügen
        </Button>
        <Button onClick={props.onGewichtChange} size="small" variant="outlined">
          Gewicht ändern
        </Button>
      </Box>
    </>
  );
};

export default Actionbar;
