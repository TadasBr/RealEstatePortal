import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../main/Header";
import { Api_Url } from "../Constants";
import { NavLink, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const getData = new FormData(event.currentTarget);

    const userName = getData.get("userName") as string;
    const password = getData.get("password") as string;

    if (!userName || !password) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const data = {
      UserName: getData.get("userName"),
      Password: getData.get("password"),
    };

    fetch(Api_Url + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status) {
          toast.error("Login failed. Check your credentials and try again.");
        }
        return response.json();
      })
      .then((data) => {
        sessionStorage.setItem("accessToken", data.accessToken);
        sessionStorage.setItem("userName", data.userName);
        sessionStorage.setItem("isSeller", data.isSeller);
        sessionStorage.setItem("phoneNumber", data.phoneNumber);
        navigate("/");
      })
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <Header />
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="bg-white w-max p-10 rounded-lg shadow-2xl border-2 border-themeColor">
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "#022d3d" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography
                component="h1"
                variant="h5"
                style={{ color: "#022d3d" }}
              >
                Sign in
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="userName"
                  label="Username"
                  name="userName"
                  autoComplete="username"
                  autoFocus
                  defaultValue="presentation"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  defaultValue="Tadas123!"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  style={{
                    background: "#022d3d",
                    padding: "10px 0",
                    fontWeight: "semibold",
                  }}
                >
                  Sign In
                </Button>

                <div className="flex justify-between items-center">
                  <NavLink to="/" className="text-themeColor text-[13px]">
                    Forgot password?
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="text-themeColor text-[13px]"
                  >
                    Don't have an account? Sign Up
                  </NavLink>
                </div>
              </Box>
            </Box>
          </Container>
        </div>
      </div>
    </ThemeProvider>
  );
}
