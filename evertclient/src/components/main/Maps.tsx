import React, { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

interface Address {
  location: string;
  price: number;
  url: string;
}

interface Props {
  addressList: Address[];
}

const Maps: React.FC<Props> = ({ addressList }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    const configValue = "AIzaSyB6iGoQrkXf1pI5xS6Hn3vxkra8UXjaqfI";
    const loader = new Loader({
      apiKey: configValue,
      version: "weekly",
    });

    loader.load().then(() => {
      const map = new google.maps.Map(document.getElementById("map")!, {
        center: { lat: 0, lng: 0 },
        zoom: 13,
      });
      setMap(map);
    });
  }, []);

  useEffect(() => {
    if (map) {
      const geocoder = new google.maps.Geocoder();
      addressList.forEach((ad) => {
        geocoder.geocode({ address: ad.location }, (results, status) => {
          if (status === "OK") {
            const marker = new google.maps.Marker({
              map,
              position: results[0].geometry.location,
            });
            marker.addListener("click", () => {
              window.open(ad.url);
            });
          } else {
            console.error(`Geocode failed: ${status}`);
          }
        });
      });
    }
  }, [map, addressList]);

  return <div id="map" className="h-[400px]" />;
};

export default Maps;
