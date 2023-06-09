export const Api_Url = "http://40.113.104.60:5064/api";
//export const Api_Url = "http://localhost:5064/api"
export const isLoggedIn = () => sessionStorage.getItem("accessToken");
export const userName = () => sessionStorage.getItem("userName");
export const isSeller = () => sessionStorage.getItem("isSeller") === "true";

export const authConfig = {
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
  },
};
