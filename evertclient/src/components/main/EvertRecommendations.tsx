import React, { useState, useEffect } from "react";
import { Api_Url } from "../Constants";
import { useNavigate } from "react-router-dom";

interface EvertAdvertisement {
  location: string;
  price: number;
  area: number;
  roomsCount: number;
  url: string;
}
interface MyAdvertisement {
  city: string;
  minPrice: number;
  maxPrice: number;
  minArea: number;
  maxArea: number;
  minRoomsCount: number;
  maxRoomsCount: number;
}

interface Address {
  location: string;
  price: number;
  url: string;
}

interface Props {
  myAdvertisement: MyAdvertisement;
}

const EvertRecommendations: React.FC<Props> = ({ myAdvertisement }) => {
  const navigate = useNavigate();
  const [evertAdvertisements, setEvertAdvertisements] = useState<
    EvertAdvertisement[]
  >([]);

  useEffect(() => {
    fetch(`${Api_Url}/sell-advertisements/get-evert-recommendations`, {
      method: "POST",
      body: JSON.stringify({
        City: myAdvertisement.city,
        MinPrice: myAdvertisement.minPrice,
        MaxPrice: myAdvertisement.maxPrice,
        MinArea: myAdvertisement.minArea,
        MaxArea: myAdvertisement.maxArea,
        MinRoomsCount: myAdvertisement.minRoomsCount,
        maxRoomsCount: myAdvertisement.maxRoomsCount,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setEvertAdvertisements(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div>
      {evertAdvertisements && evertAdvertisements.length > 0 ? (
        evertAdvertisements?.map((ad) => (
          <div
            onClick={() => navigate(`/sell-advertisements/${ad.url}`)}
            className="rounded-lg bg-white shadow-md w-full h-full flex gap-3 hover:scale-[102%] duration-300 overflow-hidden mb-2 p-4 cursor-pointer flex flex-col"
          >
            <div className="text-sm font-semibold">Location: {ad.location}</div>
            <div className="text-[17px] font-semibold">
              Price: {ad.price}€, Area: {ad.area}m<sup>2</sup>, Rooms:{" "}
              {ad.roomsCount}
            </div>
          </div>
        ))
      ) : (
        <div>
          <p className="text-[20px] font-semibold">
            No advertisements from eVert
          </p>
        </div>
      )}
    </div>
  );
};

export default EvertRecommendations;
