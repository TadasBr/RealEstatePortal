/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import Header from "../main/Header";
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
  phoneNumber: string;
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
    <div className="flex justify-center items-center my-0 mx-auto min-h-screen h-full bg-[#f1f1f1]">
      <Header />
      <div className="w-6/12 h-full flex flex-col mt-32 mb-16">
        <h1 className="text-4xl font-bold text-themeColor relative text-center">
          Advertisements
        </h1>
        
        <div className="mt-10 rounded-lg bg-white shadow-xl w-full h-full p-8 pb-0">
          <div className="w-full flex justify-between items-center mb-6">
            <div
              className={`${
                adType === "sell" ? "bg-themeColor text-white" : ""
              } border border-themeColor py-[6px] px-8 text-[17px] font-semibold rounded hover:text-white hover:bg-themeColor hover:translate-x-4 duration-300 cursor-pointer`}
              onClick={() => handleAdTypeChange("sell")}
            >
              Sell
            </div>
            <div
              className={`${
                adType === "buy" ? "bg-themeColor text-white" : ""
              } border border-themeColor py-[6px] px-8 text-[17px] font-semibold rounded hover:text-white hover:bg-themeColor hover:-translate-x-4 duration-300 cursor-pointer`}
              onClick={() => handleAdTypeChange("buy")}
            >
              Buy
            </div>
          </div>
          <CategoryList
            setCategory={(category: number) => setCategory(category)}
          />
          {adType === "sell" && (
          <div className="mb-8">
            <h1 className="text-themeColor text-xl font-semibold">Sort by:</h1>
            <div className="mt-2 flex items-center gap-4">
              <button
                onClick={() =>
                  setSellItems([...sellItems].sort((a, b) => a.price - b.price))
                }
                className="bg-[#f1f1f1] text-themeColor px-4 text-sm py-1 shadow-xl rounded-sm hover:scale-110 overflow-hidden duration-300"
              >
                Price
              </button>
              <button
                onClick={() =>
                  setSellItems([...sellItems].sort((a, b) => a.area - b.area))
                }
                className="bg-[#f1f1f1] text-themeColor px-4 text-sm py-1 shadow-xl rounded-sm hover:scale-110 overflow-hidden duration-300"
              >
                Area
              </button>
              <button
                onClick={() =>
                  setSellItems(
                    [...sellItems].sort((a, b) => a.roomsCount - b.roomsCount)
                  )
                }
                className="bg-[#f1f1f1] text-themeColor px-4 text-sm py-1 shadow-xl rounded-sm hover:scale-110 overflow-hidden duration-300"
              >
                Room Count
              </button>
            </div>
          </div>)}
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
