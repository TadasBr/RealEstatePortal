import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../main/Header";
import { Api_Url } from "../Constants";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function CreateCategory() {
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const getData = new FormData(event.currentTarget);
    const data = {
      Name: getData.get("Name"),
    };
    debugger;
    fetch(Api_Url + "/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        navigate("/");
        console.log(response.json());
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="bg-white w-max p-10 pt-0 rounded-lg shadow-2xl border-2 border-themeColor">
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
              <Typography component="h1" variant="h5">
                Create Category
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
                  id="Name"
                  label="Category Name"
                  name="Name"
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
                  Create
                </Button>
              </Box>
            </Box>
          </Container>
        </div>
      </div>
    </ThemeProvider>
  );
}
