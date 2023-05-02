import React, { useState, useEffect } from "react";
import Header from "./Header";
import "./main.css";
import { Api_Url, isSeller } from "../Constants";
import KampasRecommendations from "./KampasRecommendations";

interface MyAdvertisement {
  city: string;
  minPrice: number;
  maxPrice: number;
  minArea: number;
  maxArea: number;
  minRoomsCount: number;
  maxRoomsCount: number;
}

const Home: React.FC = () => {
  const [myAdvertisements, setMyAdvertisements] = useState<MyAdvertisement[]>([]);

  useEffect(() => {
    fetch(`${Api_Url}/buy-advertisements/my-advertisements`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMyAdvertisements(data);
      });
  }, []);

  return (
    <div className="main">
      <Header />
      <div className="mainDiv">
        <div className="recommendationListBox">
          <div className="section"> Recommended advertisements</div>
          {!isSeller() && myAdvertisements.length > 0 && (
            <>
              <div className="section">
                Kampas.lt Recommended advertisements
              </div>
              <div>
                {myAdvertisements.map((ad) => (
                  <div key={ad.city}>
                    <div className="smallerSection">{ad.city} {ad.minPrice}€ - {ad.maxPrice}€</div>
                    <KampasRecommendations myAdvertisement={ad} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
