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

const Home: React.FC = () => {
  const [myAdvertisements, setMyAdvertisements] = useState<MyAdvertisement[]>(
    []
  );

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
    <div className="flex justify-center items-center min-h-screen my-0 mx-auto bg-[#f1f1f1]">
      <Header />
      <div className="w-full flex justify-center items-center flex-col gap-10">
        <h1 className="text-4xl font-bold text-themeColor relative text-center">
          Recommended Advertisements
        </h1>
        <div className="bg-white w-5/12 p-10 pt-6 rounded-lg shadow-xl">
          {myAdvertisements.length > 0 ? (
            <>
              {isSeller() && (
                <div className="text-4xl font-bold text-themeColor relative text-center">
                  eVert advertisements
                </div>
              )}
              {!isSeller() && (
                <>
                  <div className="text-4xl font-bold text-themeColor relative text-center">
                    eVert advertisements{" "}
                  </div>
                  <div className="mt-8 text-center">
                    {myAdvertisements.map((ad) => (
                      <div key={ad.city}>
                        <div className="flex gap-4 items-center justify-center mb-4 text-center mt-5">
                          <span className="text-white font-semibold bg-themeColor px-8 py-2 flex gap-1 items-center justify-center w-max shadow-lg rounded">
                            City: {ad.city}
                          </span>
                          <span className="text-white font-semibold bg-themeColor px-8 py-2 flex gap-1 items-center justify-center w-max shadow-lg rounded">
                            Price: {ad.minPrice}€ - {ad.maxPrice}€
                          </span>
                          <span className="text-white font-semibold bg-themeColor px-8 py-2 flex gap-1 items-center justify-center w-max shadow-lg rounded">
                            Rooms: {ad.minRoomsCount} - {ad.maxRoomsCount}
                          </span>
                        </div>
                        <EvertRecommendations myAdvertisement={ad} />
                      </div>
                    ))}
                  </div>
                </>
              )}
              {!isSeller() && (
                <>
                  <div className="text-4xl font-bold text-themeColor relative text-center mt-[5vh]">
                    Kampas.lt advertisements{" "}
                  </div>
                  <div className="mt-8 text-center">
                    {myAdvertisements.map((ad) => (
                      <div key={ad.city}>
                        <div className="flex gap-4 items-center justify-center mb-4 text-center mt-5">
                          <span className="text-white font-semibold bg-themeColor px-8 py-2 flex gap-1 items-center justify-center w-max shadow-lg rounded">
                            City: {ad.city}
                          </span>
                          <span className="text-white font-semibold bg-themeColor px-8 py-2 flex gap-1 items-center justify-center w-max shadow-lg rounded">
                            Price: {ad.minPrice}€ - {ad.maxPrice}€
                          </span>
                          <span className="text-white font-semibold bg-themeColor px-8 py-2 flex gap-1 items-center justify-center w-max shadow-lg rounded">
                            Rooms: {ad.minRoomsCount} - {ad.maxRoomsCount}
                          </span>
                        </div>
                        <KampasRecommendations myAdvertisement={ad} />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <p className="text-themeColor font-semibold text-center">
              You have no recommended advertisements
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
