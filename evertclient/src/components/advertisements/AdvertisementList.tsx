// AdvertisementList.tsx

import React, { useEffect, useState } from "react";
import Header from "../main/Header";
import "./advertisiments.css";
import { useNavigate } from "react-router-dom";
import CategoryList from "../categories/CategoryList";

interface Advertisement {
  id: number;
  title: string;
  city: string;
  district: string;
  address: string;
  price: number;
  categoryId: number;
}

const AdvertisementList: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<Advertisement[]>([]);
  const [category, setCategory] = useState<number>(1);

  useEffect(() => {
    fetch(`http://localhost:5064/api/advertisements/categories/${category}`)
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, [category]);

  return (
    <div className="main">
      <Header />
      <div className="mainDiv">
        <div className="listBox">
          <CategoryList setCategory={(category: number) => setCategory(category)} />
          {items.map((item) => (
            <div
              className="listItem"
              key={item.id}
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
    </div>
  );
};

export default AdvertisementList;
