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
    return <div>Loading data...</div>;
  }

  return (
    <div className="main">
      <Header />
      <div className="mainDiv">
        <div className="listBox">
          <div className="advertisement">
            <div className="descriptionBox">
              <div className="title">{data.title}</div>
              <div className="address">
                <i className="fas fa-map-marker-alt"></i>
                {data.city}, {data.district}
              </div>
              <div className="price">
                {data.minPrice}-{data.maxPrice}€
              </div>
              <div className="description">{data.description}</div>
              <div className="details">
                <div>
                  <i className="fas fa-bed"></i>
                  {data.minRoomsCount}-{data.maxRoomsCount} Rooms
                </div>
                <div>
                  <i className="fas fa-car"></i>
                  {data.hasParking ? "Parking Available" : "No Parking"}
                </div>
                <div>
                  <i className="fas fa-expand"></i>
                  {data.minArea}-{data.maxArea} m²
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyAdvertisement;
