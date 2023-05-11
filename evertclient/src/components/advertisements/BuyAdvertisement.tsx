import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Api_Url } from "../Constants";
import Header from "../main/Header";

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

const BuyAdvertisement: React.FC = () => {
  const params = useParams();
  const [data, setData] = useState<BuyAdvertisementItem>();

  useEffect(() => {
    fetch(`${Api_Url}/buy-advertisements/${params.id}`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [params.id]);

  if (!data) {
    return (
      <div className="text-3xl font-bold text-themeColor flex justify-center items-center h-screen w-full">
        Loading data...
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen my-0 mx-auto bg-[#f1f1f1]">
      <Header />
      <div className="bg-white w-max p-10 pt-6 rounded-lg shadow-xl">
        <div className="">
          <h1 className="font-semibold text-themeColor my-2 text-2xl capitalize">
            {data.title}
          </h1>
          <div className="text-gray-600 font-semibold mb-2">
            <i className="fas fa-map-marker-alt"></i>
            {data.city}, {data.district}
          </div>
          <h3 className="text-xl font-semibold text-themeColor mb-2">
            <span className="text-gray-600 font-medium">Price (approx): </span>
            {data.minPrice}-{data.maxPrice}€
          </h3>
          <div className="text-[17px] text-gray-600 leading-[1.5] mb-3">
            {data.description}
          </div>
          <div className="flex gap-4 items-center mt-4">
            <div className="text-themeColor font-semibold bg-[#f1f1f1] px-3 py-1 flex gap-1 items-center justify-center w-max shadow-lg rounded">
              <i className="fas fa-bed"></i>
              {data.minRoomsCount}-{data.maxRoomsCount} Rooms
            </div>
            <div className="text-themeColor font-semibold bg-[#f1f1f1] px-3 py-[2px] flex gap-1 items-center justify-center w-max shadow-lg rounded">
              <i className="fas fa-car"></i>
              {data.hasParking
                ? "Parking spot is mandatory"
                : "Parking spot is not mandatory"}
            </div>
            <div className="text-themeColor font-semibold bg-[#f1f1f1] px-3 py-[2px] flex gap-1 items-center justify-center w-max shadow-lg rounded">
              <i className="fas fa-expand"></i>
              {data.minArea}-{data.maxArea} m²
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyAdvertisement;
