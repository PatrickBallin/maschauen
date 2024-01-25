import { Box, Button, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

type NavbarProps = { username: string };

const Navbar: FunctionComponent<NavbarProps> = (props) => {
  return (
    <Box sx={{ height: "70px", backgroundColor: "#2E2E2E" }}>
      <Box sx={{ position: "absolute", left: 40, top: 15 }}>
        <Typography variant="h4" sx={{ color: "white" }}>
          Trainings Tracker
        </Typography>
      </Box>
      <Box sx={{ position: "absolute", right: 40, top: 20 }}>
        <Typography variant="h5" sx={{ color: "white" }}>
          {props.username}
        </Typography>
      </Box>
    </Box>
  );
};

export default Navbar;
