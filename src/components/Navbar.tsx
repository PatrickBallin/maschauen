import { Box, Button } from "@mui/material";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  return (
    <Box sx={{ margin: 1 }}>
      <Link to={"/adduser"}>
        <Button variant="contained">Add User</Button>
      </Link>
    </Box>
  );
};

export default Navbar;
