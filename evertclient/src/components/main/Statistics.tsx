import React, { useState, useEffect } from "react";
import Header from "./Header";
import { Api_Url, isSeller } from "../Constants";
import KampasRecommendations from "./KampasRecommendations";
import EvertRecommendations from "./EvertRecommendations";

interface MyAdvertisement {
  city: string;
  minPrice: number;
  maxPrice: number;
  minArea: number;
  maxArea: number;
  minRoomsCount: number;
  maxRoomsCount: number;
}

const Statistics: React.FC = () => {
  useEffect(() => {
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen my-0 mx-auto bg-[#f1f1f1]">
    </div>
  );
};

export default Statistics;
