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
import { CheckBox } from "@mui/icons-material";
import { Checkbox, FormControlLabel } from "@mui/material";

const theme = createTheme();

export default function CreateAdvertisement() {
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const getData = new FormData(event.currentTarget);

    const photos = Array.from(getData.getAll("Photo"));
    Promise.all(
      photos.map((photo) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(photo as File);
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
        });
      })
    ).then((photoBase64s) => {
      const data = {
        Title: getData.get("Title"),
        Description: getData.get("Description"),
        City: getData.get("City"),
        Address: getData.get("Address"),
        District: getData.get("District"),
        Price: getData.get("Price"),
        RoomsCount: getData.get("RoomsCount"),
        Area: getData.get("Area"),
        HasParking: getData.get("HasParking") === "true",
        CategoryId: getData.get("CategoryId"),
        Photos: photoBase64s,
        PhoneNumber: sessionStorage.getItem("phoneNumber"),
        BuiltYear: getData.get("YearBuilt"),
      };

      fetch(Api_Url + "/sell-advertisements", {
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
            Create Advertisement
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
              name="YearBuilt"
              label="Year built"
              id="YearBuilt"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="RoomsCount"
              label="Rooms Count"
              id="RoomsCount"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Area"
              label="Area"
              id="Area"
            />
            <FormControlLabel
              control={<Checkbox id="HasParking" />}
              label="Has Parking"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="CategoryId"
              label="Category"
              id="CategoryId"
            />
            <Button variant="contained" component="label">
              Upload File
              <input type="file" id="Photo" name="Photo" multiple hidden/>
            </Button>
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
