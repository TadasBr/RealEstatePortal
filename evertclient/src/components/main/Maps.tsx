import React, { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

type MapProps = {
  addresses: Array<{ location: string; price: number, url: string }>;
};

const Maps: React.FC<MapProps> = ({ addresses }) => {
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
        addresses.forEach((ad) => {
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
    }, [map, addresses]);
  
    return <div id="map" style={{ height: "400px" }} />;
  };  

export default Maps;
