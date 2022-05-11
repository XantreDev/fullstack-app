import { Button, Card, TextField } from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { axiosConfig } from "../constants";
import { LoginPageProps } from "../types/props";
import { blue } from "@mui/material/colors";
import { loginContext } from "../context/LoginProvider";

const LoginPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isFailed, setIsFailed] = useState(false);
  const { setIsLogined } = useContext(loginContext);

  const tryAuth = async () => {
    const status = (
      (
        await axios({
          ...axiosConfig,
          url: "/auth",
          method: "post",
          data: {
            login,
            password,
          },
        })
      ).status
    );
    if (status === 200) setIsLogined(true);
  };

  return (
    <div className="App">
      <Card className="card">
        <TextField
          onChange={(e) => setLogin(e.target.value)}
          value={login}
          label="Login"
          type="text"
          required
        />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          label="Password"
          type="password"
          required
        />
        <Button
          sx={{
            bgcolor: "#1976d2",
            color: "white",
            ":hover": {
              bgcolor: blue[400],
            },
          }}
          onClick={() => tryAuth()}
        >
          Log in
        </Button>
      </Card>
    </div>
  );
};

export default LoginPage;
