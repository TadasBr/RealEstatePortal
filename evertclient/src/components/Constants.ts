export const Api_Url = "http://localhost:5064/api";
export const isLoggedIn = () => sessionStorage.getItem("accessToken");
//export const isAdmin = () => sessionStorage.getItem("isAdmin") === "true";
export const userName = () => sessionStorage.getItem("userName");

export const authConfig = {
  headers: {
    Authorization:  `Bearer ${sessionStorage.getItem("accessToken")}`,
  }
};