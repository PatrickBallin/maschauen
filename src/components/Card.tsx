import { Box, Typography } from "@mui/material";
import { FunctionComponent } from "react";

type CardProps = { title: string; value: string | number; additional?: string };

const Card: FunctionComponent<CardProps> = (props) => {
  return (
    <>
      <Box
        sx={{
          height: "100px",
          width: "18vw",
          backgroundColor: "#2D3033",
          borderRadius: 5,
          boxShadow: "2px 2px 2px rgba(200,200,200, .4)",
        }}
      >
        <Typography variant="subtitle2" sx={{ mt: 2, ml: 5, color: "white" }}>
          {props.title}
        </Typography>
        <Typography sx={{ mt: 1, ml: 5, color: "white" }}>
          {props.value}
          {props.additional}
        </Typography>
      </Box>
    </>
  );
};

export default Card;
