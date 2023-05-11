import React, { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

type MapProps = {
  address: string;
};

const Map: React.FC<MapProps> = ({ address }) => {
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
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK") {
          map.setCenter(results[0].geometry.location);
          new google.maps.Marker({
            map,
            position: results[0].geometry.location,
          });
        } else {
          console.error(`Geocode failed: ${status}`);
        }
      });
    }
  }, [map, address]);

  return (
    <div id="map" className="h-[300px] w-full rounded-xl overflow-hidden" />
  );
};

export default Map;
