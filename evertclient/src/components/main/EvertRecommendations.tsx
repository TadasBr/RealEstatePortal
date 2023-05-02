import React, { useState, useEffect } from "react";
import { Api_Url } from "../Constants";

interface EvertAdvertisement {
  location: string;
  price: number;
  area: number;
  roomsCount: number;
  url: string;
}

const EvertRecommendations: React.FC = () => {
  const [evertAdvertisements, setEvertAdvertisements] = useState<EvertAdvertisement[]>([]);

//   useEffect(() => {
//     fetch(`${Api_Url}/sell-advertisements/get-recommendations`, {
//       method: "POST",
//       body: JSON.stringify({
//         City: ad.city,
//         MinPrice: ad.minPrice,
//         MaxPrice: ad.maxPrice,
//         MinArea: ad.minArea,
//         MaxArea: ad.maxArea,
//         MinRoomsCount: ad.minRoomsCount,
//         maxRoomsCount: ad.maxRoomsCount,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setKampasAdvertisements(data);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   }, []);

  return (
    <div>
      {evertAdvertisements?.map((ad) => (
        <a
          href={ad.url}
          rel="noreferrer"
          target="_blank"
          className="recommendationListItem"
        >
          <div>Location: {ad.location}</div>
          <div>
            Price: {ad.price}€, Area: {ad.area}m<sup>2</sup>, Rooms:{" "}
            {ad.roomsCount}
          </div>
        </a>
      ))}
    </div>
  );
};

export default EvertRecommendations;
