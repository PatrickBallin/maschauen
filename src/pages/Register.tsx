import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import axios from "axios";
import { FunctionComponent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface RegisterProps {}

type User = {
  username: string;
  password: string;
};
const Register: FunctionComponent<RegisterProps> = () => {
  const [user, setUser] = useState<User>({ username: "", password: "" });
  const [seccondPassword, setSeccondPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Info:", user.username, user.password);

    // Sent Data to Backend
    await axios
      .post("http://localhost:8080/userAccess", {
        username: user.username,
        password: user.password,
      })
      .then(() => navigate("/"));
  };

  const handleSeccondPassword = (e: any) => {
    console.log(e.target.value);
    setSeccondPassword(e.target.value);
  };

  const handleUsernameChange = (e: any) => {
    setUser((user) => ({ ...user, username: e.target.value }));
  };

  const handlePasswordChange = (e: any) => {
    setUser((user) => ({ ...user, password: e.target.value }));
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
            label="New Username"
            value={user.username}
            onChange={(e) => handleUsernameChange(e)}
          ></TextField>
          <TextField
            sx={{ mb: 2 }}
            variant="outlined"
            id="password"
            label="new password"
            onChange={(e) => handlePasswordChange(e)}
            value={user.password}
            type="password"
          ></TextField>
          <TextField
            variant="outlined"
            id="seccondpassword"
            label="repeat password"
            onChange={(e) => handleSeccondPassword(e)}
            value={seccondPassword}
            type="password"
          ></TextField>
          <Divider sx={{ mt: 4, mb: 4 }}></Divider>
          <Button variant="contained" type="submit">
            Register
          </Button>
        </form>
        <Link to={"/"}>
          <Button sx={{ position: "absolute", mt: 14.5, ml: -18 }}>Back</Button>
        </Link>
      </Box>
    </>
  );
};

export default Register;
