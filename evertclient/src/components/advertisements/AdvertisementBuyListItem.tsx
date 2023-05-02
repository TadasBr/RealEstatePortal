import React from "react";
import "./advertisiments.css";

interface BuyAdvertisementItem {
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

interface BuyAdvertisementListItemProps {
  item: BuyAdvertisementItem;
  navigate: (path: string) => void;
}

const BuyAdvertisementListItem: React.FC<BuyAdvertisementListItemProps> = ({ item, navigate }) => {
  return (
    <div className="listItem" onClick={() => navigate(`/buy-advertisements/${item.id}`)}>
      <div className="descriptionBox">
        <div className="title">{item.title}</div>
        <div>
          {item.city}, {item.district}
        </div>
        <div>{item.minPrice}€ - {item.maxPrice}€</div>
        <div>{item.minArea}m² - {item.maxArea}m²</div>
        <div>{item.minRoomsCount} - {item.maxRoomsCount} Rooms</div>
        <div>{item.hasParking ? "Parking spot is mandatory" : "Parking spot is not mandatory"}</div>
      </div>
    </div>
  );
};

export default BuyAdvertisementListItem;
