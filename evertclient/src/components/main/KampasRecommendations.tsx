import React, { useState, useEffect } from "react";

interface MyAdvertisement {
  city: string;
  minPrice: number;
  maxPrice: number;
  minArea: number;
  maxArea: number;
  minRoomsCount: number;
  maxRoomsCount: number;
}

interface KampasAdvertisement {
  location: string;
  price: number;
  area: number;
  roomsCount: number;
  url: string;
}

interface Props {
  myAdvertisement: MyAdvertisement;
}

const KampasRecommendations: React.FC<Props> = ({ myAdvertisement }) => {
  const [kampasAdvertisements, setKampasAdvertisements] = useState<KampasAdvertisement[]>([]);

  useEffect(() => {
    fetch(`http://localhost:5064/api/buy-advertisements/scrape-kampas`, {
      method: "POST",
      body: JSON.stringify({
        City: "Vilnius",
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
        setKampasAdvertisements(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div>
      {kampasAdvertisements?.map((ad) => (
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

export default KampasRecommendations;
