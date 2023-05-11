import { useState } from "react";
import { createTheme } from "@mui/material/styles";
import Header from "../main/Header";
import { Api_Url, authConfig, userName } from "../Constants";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme();

export default function Profile() {
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    };

    fetch(`${Api_Url}/change-role`, requestOptions).then((response) => {
      if (response.status === 200) {
        setClicked(true);
        alert("You have changed the role, please relog");
        sessionStorage.clear();
        navigate("/");
      } else {
        return (
          toast.error("Can't change role, because you have active advertisements!")
        );
      }
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen my-0 mx-auto bg-[#f1f1f1]">
      <Header />
      <ToastContainer/>
      <div className="bg-white w-max p-10 rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold text-themeColor">
          <span className="text-gray-600 font-medium">Username: </span>
          {sessionStorage.getItem("userName")}
        </h1>
        <div className="text-gray-600 font-semibold text-lg mt-8 flex flex-col items-center justify-center gap-2">
          You are{" "}
          {sessionStorage.getItem("isSeller") == "true" ? "Seller" : "Buyer"}
          <button
            onClick={handleButtonClick}
            className="bg-themeColor text-white py-2 px-5 text-sm capitalize rounded hover:translate-x-4 duration-300"
          >
            change role
          </button>
          {clicked && <div>Role changed successfully!</div>}
        </div>
      </div>
    </div>
  );
}
