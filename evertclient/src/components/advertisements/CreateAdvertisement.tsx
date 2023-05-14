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

export default function CreateAdvertisement() {
  const [categoryId, setCategoryId] = React.useState<string>();
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const getData = new FormData(event.currentTarget);

    if (
      !getData.get("Title") ||
      !getData.get("Description") ||
      !getData.get("City") ||
      !getData.get("Address") ||
      !getData.get("District") ||
      !getData.get("Price") ||
      !getData.get("RoomsCount") ||
      !getData.get("Area") ||
      !getData.get("CategoryId") ||
      !getData.get("YearBuilt")
    ) {
      toast.error("Plase fill in all required fields.")
      return;
    }

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
      }).then((response) => {
        if (response.status === 201) {
          navigate("/");
          return response.json();
        } else {
          toast.error("Failed to create advertisement please check fields!");
        }
      });
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
                  type="number"
                  label="Price (€)"
                  name="Price"             
                  id="Price"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  type="number"
                  name="YearBuilt"
                  label="Year built"
                  id="YearBuilt"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  type="number"
                  name="RoomsCount"
                  label="Rooms Count"
                  id="RoomsCount"
                />
                <TextField
                  margin="normal"
                  type="number"
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
                <div className="flex justify-center items-center">
                  <Button
                    variant="contained"
                    component="label"
                    style={{
                      background: "#022d3d",
                      padding: "8px 20px",
                      fontWeight: "semibold",
                      margin: "20px 0 0 0",
                    }}
                  >
                    Upload Image
                    <input
                      type="file"
                      id="Photo"
                      name="Photo"
                      multiple
                      hidden
                    />
                  </Button>
                </div>
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
