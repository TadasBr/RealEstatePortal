import React, { useState, useEffect, useMemo } from "react";
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
  const [sortBy, setSortBy] = useState("");

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

  const result: EvertAdvertisement[] = useMemo(() => {
    if (!sortBy) return evertAdvertisements;
    return evertAdvertisements.sort((a: any, b: any) => a[sortBy] - b[sortBy]);
  }, [evertAdvertisements, sortBy]);

  return (
    <div>
      {evertAdvertisements && evertAdvertisements.length > 0 ? (
        <>
          <div className="mb-4 flex flex-col items-center gap-4 w-full">
            <h1 className="text-themeColor text-xl font-semibold">Sort by:</h1>
            <div className="flex gap-4">
              <button
                onClick={() => setSortBy("area")}
                className="bg-[#f1f1f1] text-themeColor px-4 text-sm py-1 shadow-xl rounded-sm hover:scale-110 overflow-hidden duration-300"
              >
                Area
              </button>

              <button
                onClick={() => setSortBy("price")}
                className="bg-[#f1f1f1] text-themeColor px-4 text-sm py-1 shadow-xl rounded-sm hover:scale-110 overflow-hidden duration-300"
              >
                Price
              </button>

              <button
                onClick={() => setSortBy("roomsCount")}
                className="bg-[#f1f1f1] text-themeColor px-4 text-sm py-1 shadow-xl rounded-sm hover:scale-110 overflow-hidden duration-300"
              >
                Rooms Count
              </button>
            </div>
          </div>
          {result?.map((ad) => (
            <div
              onClick={() => navigate(`/sell-advertisements/${ad.url}`)}
              className="rounded-lg bg-white shadow-md w-full h-full flex gap-3 hover:scale-[102%] duration-300 overflow-hidden mb-2 p-4 cursor-pointer flex-col"
            >
              <div className="text-sm font-semibold">
                Location: {ad.location}
              </div>
              <div className="text-[17px] font-semibold">
                Price: {ad.price}€, Area: {ad.area}m<sup>2</sup>, Rooms:{" "}
                {ad.roomsCount}
              </div>
            </div>
          ))}
        </>
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
