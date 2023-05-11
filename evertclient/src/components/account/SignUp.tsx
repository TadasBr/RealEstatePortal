import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../main/Header";
import { Api_Url } from "../Constants";
import { NavLink, useNavigate } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const getData = new FormData(event.currentTarget);

    const userName = getData.get("userName") as string;
    const password = getData.get("password") as string;
    const EmailAddress = getData.get("email") as string;
    const PhoneNumber = getData.get("phoneNumber") as string;

    if(!userName || !password || !EmailAddress || !PhoneNumber)
    {
      toast.error("Please fill in all required fields.");
      return;
    }

    const data = {
      UserName: getData.get("userName"),
      EmailAddress: getData.get("email"),
      Password: getData.get("password"),
      IsSeller: getData.get("isSeller") === "on" ? true : false,
      PhoneNumber: getData.get("phoneNumber"),
    };

    fetch(Api_Url + "/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          navigate("/login");
          return response.json();
        } else {
          toast.error("Registration failed. Make sure fields are entered correctly.");
        }
      })   
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer/>
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
                Sign up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="userName"
                      label="Username"
                      name="userName"
                      autoComplete="username"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="phoneNumber"
                      label="Phone number"
                      name="phoneNumber"
                      autoComplete="phoneNumber"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="primary"
                          name="isSeller"
                          id="isSeller"
                        />
                      }
                      label="I am a seller"
                    />
                  </Grid>
                </Grid>
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
                  Sign Up
                </Button>
                <div className="flex justify-between items-center">
                  <NavLink to="/login" className="text-themeColor text-[13px]">
                    Already have an account? Sign in
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
