import React, { useEffect, useState } from "react";
import Header from "../main/Header";
import "./advertisiments.css";
import { useNavigate } from "react-router-dom";
import CategoryList from "../categories/CategoryList";
import { Api_Url } from "../Constants";
import AdvertisementSellListItem from "./AdvertisementSellListItem";
import BuyAdvertisementListItem from "./AdvertisementBuyListItem";

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

const AdvertisementList: React.FC = () => {
  const navigate = useNavigate();
  const [sellItems, setSellItems] = useState<Advertisement[]>([]);
  const [buyItems, setBuyItems] = useState<BuyAdvertisement[]>([]);
  const [category, setCategory] = useState<number>(1);
  const [adType, setAdType] = useState<"sell" | "buy">("sell");
  const [sortBy, setSortBy] = useState<"price" | "area" | "roomsCount">();

  useEffect(() => {
    const endpoint =
      adType === "sell" ? "sell-advertisements" : "buy-advertisements";
    const sortQueryParam = sortBy ? `&sortBy=${sortBy}` : "";
    fetch(`${Api_Url}/${endpoint}/categories/${category}?${sortQueryParam}`)
      .then((response) => response.json())
      .then((data) => {
        if (adType === "sell") {
          setSellItems(data);
        } else {
          setBuyItems(data);
        }
      });
  }, [category, adType, sortBy]);

  const handleAdTypeChange = (newType: "sell" | "buy") => {
    setAdType(newType);
    setSellItems([]);
    setBuyItems([]);
  };

  const handleSortChange = (newSortBy: "price" | "area" | "roomsCount") => {
    setSortBy(newSortBy);
  };

  return (
    <div className="main">
      <Header />
      <div className="mainDiv">
        <h1>Advertisements</h1>
        <div className="listBox">
          <div className="switchBox">
            <div
              className={`switchButton ${adType === "sell" ? "active" : ""}`}
              onClick={() => handleAdTypeChange("sell")}
            >
              Sell
            </div>
            <div
              className={`switchButton ${adType === "buy" ? "active" : ""}`}
              onClick={() => handleAdTypeChange("buy")}
            >
              Buy
            </div>
          </div>
          <CategoryList
            setCategory={(category: number) => setCategory(category)}
          />
          <div className="sortBox">
            <div>Sort by:</div>
            <button
              onClick={() =>
                setSellItems([...sellItems].sort((a, b) => a.price - b.price))
              }
            >
              Price
            </button>
            <button
              onClick={() =>
                setSellItems([...sellItems].sort((a, b) => a.area - b.area))
              }
            >
              Area
            </button>
            <button
              onClick={() =>
                setSellItems(
                  [...sellItems].sort((a, b) => a.roomsCount - b.roomsCount)
                )
              }
            >
              Room Count
            </button>
          </div>
          {adType === "sell"
            ? sellItems.map((item) => (
                <AdvertisementSellListItem
                  item={item}
                  adType={adType}
                  navigate={navigate}
                  key={item.id}
                />
              ))
            : buyItems.map((item) => (
                <BuyAdvertisementListItem
                  item={item}
                  navigate={navigate}
                  key={item.id}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default AdvertisementList;