import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../images/evert.svg";
import { AccountCircle, Logout } from "@mui/icons-material";
import "./main.css";
import HamburgerMenu from "./HamburgerMenu";
import { isLoggedIn } from "../Constants";

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <AppBar sx={{ bgcolor: "#022d3d" }} className="appBar">
      <Toolbar>
        <Link to="/">
          <Logo width={64} height={64} className="logo" />
        </Link>
        <div style={{ flex: 1 }} />
        <HamburgerMenu />
        {isLoggedIn() ? (
          <>
            <div style={{ display: "flex", alignItems: "center" }}>
              <AccountCircle sx={{ fontSize: 28 }} />
              <Typography variant="h6" component="div">
                <Link to="/profile" className="signInText" style={{ marginLeft: "10px", marginRight: "20px" }}>
                  {sessionStorage.getItem("userName")}
                </Link>
              </Typography>
              <Typography>
                <Logout sx={{ fontSize: 28 }} onClick={(e) => {
                  e.preventDefault();
                  sessionStorage.clear();
                  navigate("/");
                }} className="signInText" />
              </Typography>
            </div>
          </>
        ) : (
          <Typography variant="h6" component="div">
            <div
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
              className="signInText"
            >
              Sign in
            </div>
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
