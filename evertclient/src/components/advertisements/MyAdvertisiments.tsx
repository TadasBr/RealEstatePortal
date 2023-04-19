import React, { useEffect, useState } from "react";
import Header from "../main/Header";
import "./advertisiments.css";
import { useNavigate } from "react-router-dom";
import { Api_Url, isSeller } from "../Constants";

interface Advertisement {
  id: number;
  title: string;
  city: string;
  district: string;
  address: string;
  price: number;
  categoryId: number;
}

interface BuyAdvertisement {
  id: number;
  title: string;
  description: string;
  city: string;
  district: string;
  minPrice: number;
  maxPrice: number;
  minArea: number;
  maxArea: number;
  minRoomsCount: number;
  maxRoomsCount: number;
  hasParking: boolean;
}

const MyAdvertisements: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<any[]>([]);
  const [endpoint, setEndpoint] = useState<string>();
  useEffect(() => {
    setEndpoint(isSeller() ? "sell-advertisements" : "buy-advertisements");
    fetch(`${Api_Url}/${endpoint}/my-advertisements`, {
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`,
        "Content-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      });
  }, [endpoint]);

  const handleEdit = (id: number) => {
    const editUrl = isSeller() ? "/edit-sell-advertisements/" : "/edit-buy-advertisements/";
    navigate(`${editUrl}${id}`);
  };

  const handleDelete = (id: number) => {
    fetch(`${Api_Url}/${endpoint}/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`
      }
    }).then(() => {
      setItems(items.filter((item) => item.id !== id));
    });
  };
  

  return (
    <div className="main">
      <Header />
      <div className="mainDiv">
        <div className="listBox">
          {items.length > 0 ? items.map((item) => (
            <div key={item.id} className="advertisement">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <div className="buttons">
                <button onClick={() => handleEdit(item.id)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            </div>
          )) : "You have no advertisements"}
        </div>
      </div>
    </div>
  );
};

export default MyAdvertisements;
