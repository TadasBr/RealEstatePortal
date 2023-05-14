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
import {
  Checkbox,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme();

export default function CreateBuyAdvertisement() {
  const navigate = useNavigate();
  const [categoryId, setCategoryId] = React.useState<string>();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const getData = new FormData(event.currentTarget);

    if (
      !getData.get("Title") ||
      !getData.get("Description") ||
      !getData.get("City") ||
      !getData.get("District") ||
      !getData.get("MinPrice") ||
      !getData.get("MaxPrice") ||
      !getData.get("MinRoomsCount") ||
      !getData.get("MaxRoomsCount") ||
      !getData.get("MinArea") ||
      !getData.get("MaxArea") ||
      !getData.get("CategoryId")
    ) {
      toast.error("Plase fill in all required fields.");
      return;
    }

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
    fetch(Api_Url + "/buy-advertisements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status === 201) {
        navigate("/");
      } else {
        toast.error("Failed to create advertisement please check fields!");
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
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
                  type="number"
                  label="Minimum price (€)"
                  id="MinPrice"
                  defaultValue="130000"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="MaxPrice"
                  type="number"
                  label="Maximum price (€)"
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
                  <InputLabel id="CategoryId">Category</InputLabel>
                  <Select
                    defaultValue="1"
                    labelId="CategoryId"
                    id="CategoryId"
                    name="CategoryId"
                    value={categoryId}
                    onChange={(event) => setCategoryId(event.target.value)}
                    fullWidth
                  >
                    <MenuItem value={1}>Apartment</MenuItem>
                    <MenuItem value={2}>House</MenuItem>
                    <MenuItem value={3}>Loft</MenuItem>
                    <MenuItem value={4}>Cottage</MenuItem>
                  </Select>
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
