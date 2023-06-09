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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InputLabel, MenuItem, Select } from "@mui/material";

const theme = createTheme();

export default function EditSellAdvertisement() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [advertisement, setAdvertisement] = useState<any>();
  const [categoryId, setCategoryId] = React.useState<string>();

  React.useEffect(() => {
    fetch(Api_Url + "/sell-advertisements/" + id, {
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
      !getData.get("Address") ||
      !getData.get("District") ||
      !getData.get("Price") ||
      !getData.get("RoomsCount") ||
      !getData.get("Area") ||
      !getData.get("CategoryId") ||
      !getData.get("BuiltYear")
    ) {
      toast.error("Plase fill in all required fields.");
      return;
    }

    const data = {
      Title: getData.get("Title"),
      Description: getData.get("Description"),
      City: getData.get("City"),
      Address: getData.get("Address"),
      District: getData.get("District"),
      Price: getData.get("Price"),
      RoomsCount: getData.get("RoomsCount"),
      Area: getData.get("Area"),
      CategoryId: getData.get("CategoryId"),
      BuiltYear: getData.get("BuiltYear")
    };
    debugger;
    fetch(Api_Url + "/sell-advertisements/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(data),
    }).then((response) => {
      navigate("/");
      console.log(response.json());
    });
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
      <ToastContainer />
      <Header />
      <div className="w-full min-h-screen max-h-full flex justify-center items-center mt-20">
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
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="RoomsCount"
                  label="Rooms count"
                  id="RoomsCount"
                  defaultValue={advertisement.roomsCount}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="Area"
                  label="Area"
                  id="Area"
                  defaultValue={advertisement.area}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="BuiltYear"
                  label="Built year"
                  id="BuiltYear"
                  defaultValue={advertisement.builtYear}
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
                  <MenuItem value={3}>Loft</MenuItem>
                  <MenuItem value={4}>Cottage</MenuItem>
                  <MenuItem value={5}>House</MenuItem>
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
