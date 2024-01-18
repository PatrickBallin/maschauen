import { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";

interface HomeProps {}

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

const Home: FunctionComponent<HomeProps> = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/users");
    setUsers(result.data);
  };

  return (
    <>
      <Box sx={{ margin: 1 }}>
        {users.map((user, index) => (
          <Typography sx={{ color: "white" }} key={index}>
            <p>{user.name}</p>
            <p>{user.username}</p>
            <p>{user.email}</p>
          </Typography>
        ))}
      </Box>
    </>
  );
};

export default Home;
