import React, { useEffect, useState } from "react";
import Header from "../main/Header";
import "./advertisiments.css";
import { useNavigate } from "react-router-dom";

const AdvertisementList: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:5064/api/advertisements")
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <div className="main">
      <Header />
      <div className="listBox">
        {items.map((item) => (
          <div
            className="listItem"
            onClick={() => navigate(`/advertisements/${item.id}`)}
          >
            <div className="photo"></div>
            <div className="descriptionBox">
              <div className="title">{item.title}</div>
              <div>
                {item.city}, {item.district}, {item.address}
              </div>
              <div>{item.price}€</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvertisementList;
