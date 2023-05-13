import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../images/evert.svg";
import { AccountCircle, Logout } from "@mui/icons-material";
import HamburgerMenu from "./HamburgerMenu";
import { isLoggedIn } from "../Constants";

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <AppBar
      sx={{ bgcolor: "#022d3d" }}
      style={{ position: "absolute" }}
      className="py-2"
    >
      <Toolbar>
        <Link to="/">
          <Logo width={64} height={64} className="ml-2" />
        </Link>
        <div style={{ flex: 1 }} />
        <HamburgerMenu />
        {isLoggedIn() ? (
          <>
            <div className="flex items-center gap-2">
              {sessionStorage.getItem("userName") !== "admin" && (
                <>
                  <AccountCircle sx={{ fontSize: 28 }} />
                  <Typography variant="h6" component="div">
                    <Link to="/profile" className="mr-10">
                      {sessionStorage.getItem("userName")}
                    </Link>
                  </Typography>
                </>
              )}
              <Typography>
                <Logout
                  sx={{ fontSize: 28 }}
                  onClick={(e) => {
                    e.preventDefault();
                    sessionStorage.clear();
                    navigate("/");
                  }}
                  className="cursor-pointer"
                />
              </Typography>
            </div>
          </>
        ) : (
          <div
            onClick={(e) => {
              e.preventDefault();
              navigate("/login");
            }}
            className="text-white font-medium cursor-pointer border py-2 px-6 rounded-lg bg-transparent hover:bg-white hover:text-themeColor hover:border-themeColortext-themeColor duration-300 hover:-translate-x-2"
          >
            Sign in
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
