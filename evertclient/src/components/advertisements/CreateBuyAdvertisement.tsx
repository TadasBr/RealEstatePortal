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
import { Checkbox, FormControlLabel, Slider } from "@mui/material";

const theme = createTheme();

export default function CreateBuyAdvertisement() {
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = React.useState<Number[]>([20000, 500000]);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const getData = new FormData(event.currentTarget);
    const data = {
      Title: getData.get("Title"),
      Description: getData.get("Description"),
      City: getData.get("City"),
      District: getData.get("District"),
      MinPrice: getData.get("MinPrice"),
      MaxPrice: getData.get("MaxPrice"),
      MinArea: getData.get("MinArea"),
      MaxArea: getData.get("MaxArea"),
      MinRoomsCount: getData.get("MinRoomsCount"),
      MaxRoomsCount: getData.get("MaxRoomsCount"),
      HasParking: getData.get("HasParking") === "true",
      CategoryId: getData.get("CategoryId"),
      PhoneNumber: sessionStorage.getItem("phoneNumber"),
    };
    debugger;
    fetch(Api_Url + "/buy-advertisements", {
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
      <div className="w-full min-h-screen flex justify-center items-center mt-[13vh] mb-20">
        <div className="bg-white w-max p-6 pt-0 rounded-lg shadow-2xl border-2 border-themeColor">
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
                  defaultValue="Modern apartament"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="Description"
                  label="Description"
                  id="Description"
                  defaultValue="Modern apartament"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="City"
                  label="City"
                  id="City"
                  defaultValue="Vilnius"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="District"
                  label="District"
                  id="District"
                  defaultValue="antakalnis"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="MinPrice"
                  label="Min Price"
                  id="MinPrice"
                  defaultValue="130000"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="MaxPrice"
                  label="Max price"
                  id="MaxPrice"
                  defaultValue="150000"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="MinArea"
                  label="Min Area"
                  type="number"
                  id="MinArea"
                  defaultValue="40"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="MaxArea"
                  label="Max Area"
                  type="number"
                  id="MaxArea"
                  defaultValue="50"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="MinRoomsCount"
                  label="Min Rooms Count"
                  type="number"
                  id="MinRoomsCount"
                  defaultValue="3"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="MaxRoomsCount"
                  label="Max Rooms Count"
                  type="number"
                  id="MaxRoomsCount"
                  defaultValue="3"
                />
                <FormControlLabel
                  control={<Checkbox id="HasParking" />}
                  label="Has Parking"
                  style={{ color: "#022d3d" }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="CategoryId"
                  label="Category Id"
                  type="number"
                  id="CategoryId"
                  defaultValue="1"
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
