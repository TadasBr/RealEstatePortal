import React, { useEffect, useState } from "react";
import Header from "../main/Header";
import { useNavigate } from "react-router-dom";
import { Api_Url, isSeller } from "../Constants";

const MyAdvertisements: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<any[]>([]);
  const [endpoint, setEndpoint] = useState<string>();
  useEffect(() => {
    setEndpoint(isSeller() ? "sell-advertisements" : "buy-advertisements");
    fetch(`${Api_Url}/${endpoint}/my-advertisements`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      });
  }, [endpoint]);

  if (!items) {
    return (
      <div className="text-3xl font-bold text-themeColor flex justify-center items-center h-screen w-full">
        Loading data...
      </div>
    );
  }

  const handleEdit = (id: number) => {
    const editUrl = isSeller()
      ? "/edit-sell-advertisements/"
      : "/edit-buy-advertisements/";
    navigate(`${editUrl}${id}`);
  };

  const handleDelete = (id: number) => {
    fetch(`${Api_Url}/${endpoint}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    }).then(() => {
      setItems(items.filter((item) => item.id !== id));
    });
  };

  const handleSold = (id: number) => {
    fetch(`${Api_Url}/sell-advertisements/${id}/sell`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    }).then(() => {
      setItems(items.filter((item) => item.id !== id));
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen my-0 mx-auto bg-[#f1f1f1]">
      <Header />
      <div className="w-full">
        <h1 className="font-bold text-themeColor my-2 text-4xl text-center capitalize">
          My advertisements
        </h1>
        <div className="w-full flex flex-col justify-center items-center mt-10">
          {items.length > 0 ? (
            items.map((item) => (
              <div
                key={item.id}
                className="w-6/12 bg-white shadow-xl mb-8 h-24 flex justify-between items-center p-6 rounded-lg hover:scale-105 duration-300"
              >
                <p className="text-xl font-semibold text-themeColor">
                  {item.title}
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="outline-none border-none bg-themeColor py-2 font-semibold px-6 text-white rounded-md hover:-translate-x-3 duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="outline-none border-none bg-red-600 py-2 font-semibold px-6 text-white rounded-md hover:scale-[102%] duration-300"
                  >
                    Delete
                  </button>

                  {isSeller() && (
                    <button
                      onClick={() => handleSold(item.id)}
                      className="outline-none border-none bg-green-500 py-2 font-semibold px-6 text-white rounded-md hover:translate-x-3 duration-300"
                    >
                      Sold
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white shadow-xl h-14 rounded-lg w-max px-12 flex justify-center items-center">
              <p className="text-lg text-themeColor">
                You have no advertisements
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAdvertisements;
