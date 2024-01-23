import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  withStyles,
} from "@mui/material";
import { FunctionComponent, useState } from "react";
import { Link } from "react-router-dom";

interface LogInProps {}

const LogIn: FunctionComponent<LogInProps> = () => {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <>
      <Typography variant="h6" sx={{ ml: 15, mt: 10 }}>
        Hallo, Bitte melde dich an, um deine Statistik zu sehen
      </Typography>
      <Box
        sx={{
          ml: 15,
          mt: 8,
          width: "250px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <TextField
            sx={{ mb: 2 }}
            id="username"
            label="Username"
            value={username}
          ></TextField>
          <TextField
            variant="outlined"
            id="password"
            label="password"
            value={password}
            type="password"
          ></TextField>
          <Divider sx={{ mt: 4, mb: 4 }}></Divider>
          <Button variant="contained" type="submit">
            Log In
          </Button>
        </form>
        <Link to={"/register"}>
          <Button sx={{ position: "absolute", mt: 10, ml: -18 }}>
            Register
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default LogIn;
