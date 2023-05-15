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
import { Checkbox, FormControlLabel, InputLabel, MenuItem, Select } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme();

export default function EditSellAdvertisement() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [advertisement, setAdvertisement] = useState<any>();
  const [categoryId, setCategoryId] = React.useState<string>();

  React.useEffect(() => {
    fetch(Api_Url + "/buy-advertisements/" + id, {
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
      toast.error("Plase fill in all required fields.")
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
    };
    fetch(Api_Url + "/buy-advertisements/" + id, {
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
  };

  if (!advertisement) {
    return (
      <div className="text-3xl font-bold text-themeColor flex justify-center items-center h-screen w-full">
        Loading Data...
      </div>
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer/>
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
                  name="District"
                  label="District"
                  id="District"
                  defaultValue={advertisement.district}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="MinPrice"
                  label="Minimum Price"
                  id="MinPrice"
                  type="number"
                  defaultValue={advertisement.minPrice}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="MaxPrice"
                  label="Maximum Price"
                  id="MaxPrice"
                  type="number"
                  defaultValue={advertisement.maxPrice}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="MinArea"
                  label="Minimum Area"
                  id="MinArea"
                  type="number"
                  defaultValue={advertisement.minArea}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="MaxArea"
                  label="Maximum Area"
                  id="MaxArea"
                  type="number"
                  defaultValue={advertisement.maxArea}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="MinRoomsCount"
                  label="Minimum Rooms Count"
                  id="MinRoomsCount"
                  type="number"
                  defaultValue={advertisement.minRoomsCount}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="MaxRoomsCount"
                  label="Maximum Rooms Count"
                  id="MaxRoomsCount"
                  type="number"
                  defaultValue={advertisement.maxRoomsCount}
                />
                <FormControlLabel
                  style={{
                    color: "#022d3d",
                  }}
                  control={<Checkbox id="HasParking" />}
                  label="Has Parking"
                  defaultChecked={advertisement.hasParking}
                />
                <InputLabel id="CategoryId">Category</InputLabel>
                  <Select
                    defaultValue={advertisement.CategoryId}
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
                  Update
                </Button>
              </Box>
            </Box>
          </Container>
        </div>
      </div>
    </ThemeProvider>
  );
}
