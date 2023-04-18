import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../main/Header";
import { Api_Url, authConfig, userName } from "../Constants";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function Profile() {
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...authConfig.headers, // include the authorization header
      },
    };

    fetch(`${Api_Url}/change-role`, requestOptions)
      .then(() => {
        setClicked(true);
        alert("You have changed the role, please relog");
        sessionStorage.clear();
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="mainProfile">
      <Header />
      <div className="mainDiv">
        <div>Username: {sessionStorage.getItem("userName")}</div>
        <div>
          You are{" "}
          {sessionStorage.getItem("isSeller") == "true" ? "Seller" : "Buyer"}
          <Button onClick={handleButtonClick}>change role</Button>
          {clicked && <div>Role changed successfully!</div>}
        </div>
      </div>
    </div>
  );
}
