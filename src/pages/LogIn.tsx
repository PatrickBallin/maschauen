import { ThemeContext } from "@emotion/react";
import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  withStyles,
} from "@mui/material";
import axios from "axios";
import { FunctionComponent, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContextType } from "../App";

type LogInProps = {
  user: UserContextType;

  onValueChange: (obj: Partial<UserContextType>) => void;
};

const LogIn: FunctionComponent<LogInProps> = (props) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleSucessfullLogIn = () => {
    console.log("Eingeloggt!");
    navigate("/dashboard");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    console.log("Send Data: ", username, password);
    // Sent Data to Backend
    await axios
      .post("http://localhost:8080/userAuthenticate", {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.username === username) {
          // Set Userdata to ActiveUser
          props.onValueChange({
            id: response.data.id,
            username: username,
            password: password,
          });
          // Erfolgreich eingeloggt!
          handleSucessfullLogIn();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleUsername = (e: any) => {
    e.preventDefault();
    setUsername(e.target.value);
    console.log(e.target.value);
  };

  const handlePassword = (e: any) => {
    e.preventDefault();
    console.log(e.target.value);
    setPassword(e.target.value);
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
            onChange={(e) => handleUsername(e)}
          ></TextField>
          <TextField
            variant="outlined"
            id="password"
            label="password"
            value={password}
            type="password"
            onChange={(e) => handlePassword(e)}
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
