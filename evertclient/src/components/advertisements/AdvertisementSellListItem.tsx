import React, { useEffect, useState } from "react";
import "./advertisiments.css";

interface Advertisement {
    id: number;
    title: string;
    city: string;
    district: string;
    address: string;
    price: number;
    categoryId: number;
  }

interface AdvertisementListItemProps {
    item: Advertisement;
    adType: "sell" | "buy";
    navigate: (path: string) => void;
  }
  

const AdvertisementSellListItem: React.FC<AdvertisementListItemProps> = ({ item, adType, navigate }) => {
    return (
      <div
        className="listItem"
        onClick={() => navigate(`/${adType}-advertisements/${item.id}`)}
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
    );
  };

export default AdvertisementSellListItem;