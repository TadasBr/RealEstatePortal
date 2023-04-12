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

export default function CreateAdvertisement() {
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const getData = new FormData(event.currentTarget);
    const data = {
      Title: getData.get("Title"),
      Description: getData.get("Description"),
      City: getData.get("City"),
      Address: getData.get("Address"),
      District: getData.get("District"),
      Price: getData.get("Price"),
      CategoryId: getData.get("Category"),
    };
    debugger;
    fetch(Api_Url + "/advertisements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
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
      <Container component="main" maxWidth="xs" style={{ marginTop: "100px" }}>
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
            Create advertisiment
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
              id="Title"
              label="Title"
              name="Title"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Description"
              label="Description"
              id="Description"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="City"
              label="City"
              id="City"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Address"
              label="Address"
              id="Address"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="District"
              label="District"
              id="District"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Price"
              label="Price"
              id="Price"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Category"
              label="Category"
              id="Category"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
