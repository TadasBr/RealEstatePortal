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
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const theme = createTheme();

export default function EditSellAdvertisement() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [advertisement, setAdvertisement] = useState<any>();

  React.useEffect(() => {
    fetch(Api_Url + "/advertisements/" + id, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setAdvertisement(data))
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

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
    };
    debugger;
    fetch(Api_Url + "/sell-advertisements/" + id, {
      method: "PUT",
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

  if (!advertisement) {
    return <div>Loading...</div>;
  }

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
            Edit advertisement
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
              defaultValue={advertisement.title}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Description"
              label="Description"
              id="Description"
              defaultValue={advertisement.description}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="City"
              label="City"
              id="City"
              defaultValue={advertisement.city}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Address"
              label="Address"
              id="Address"
              defaultValue={advertisement.address}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="District"
              label="District"
              id="District"
              defaultValue={advertisement.district}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Price"
              label="Price"
              id="Price"
              defaultValue={advertisement.price}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}