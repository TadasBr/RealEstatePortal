import React, { useEffect, useState } from "react";
import "./advertisiments.css";
import Image from "./Image"

interface Advertisement {
  id: number;
  title: string;
  city: string;
  district: string;
  address: string;
  price: number;
  photos: string[];
  description: string;
  roomsCount: number;
  area: number;
  hasParking: boolean;
  views: number;
  createdDate: Date;
  updatedDate: Date;
  phoneNumber: string;
  builtYear: number;
}

interface AdvertisementListItemProps {
  item: Advertisement;
  adType: "sell" | "buy";
  navigate: (path: string) => void;
}

const AdvertisementSellListItem: React.FC<AdvertisementListItemProps> = ({
  item,
  adType,
  navigate,
}) => {
  return (
    <div
      className="listItem"
      onClick={() => navigate(`/${adType}-advertisements/${item.id}`)}
    >
      <div className="photo">
        <Image base64String={item.photos[0]}/>
      </div>
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
