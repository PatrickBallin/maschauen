import { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";

interface HomeProps {}

type User = {
  id: number;
  username: string;
  password: string;
};

const Home: FunctionComponent<HomeProps> = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/userAccesses");
    console.log("Data", result.data);
    setUsers(result.data);
  };

  return (
    <>
      <Box sx={{ margin: 1 }}>
        {users.map((user, index) => (
          <Typography key={index}>
            <p>{user.username}</p>
            <p>{user.password}</p>
          </Typography>
        ))}
      </Box>
    </>
  );
};

export default Home;
