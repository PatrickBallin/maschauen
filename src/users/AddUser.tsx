import { Box, Button } from "@mui/material";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface AddUserProps {}

const AddUser: FunctionComponent<AddUserProps> = () => {
  return (
    <>
      <Box sx={{ margin: 1 }}>
        <Link to={"/"}>
          <Button>Back</Button>
        </Link>
        <Box sx={{ color: "white" }}>Add a User !</Box>
      </Box>
    </>
  );
};

export default AddUser;
