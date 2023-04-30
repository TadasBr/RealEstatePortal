import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Api_Url } from "../Constants";
import Header from "../main/Header";
import Map from "../main/Map";
import Image from "./Image"

const Advertisement: React.FC = () => {
  const params = useParams();
  const [data, setData] = useState<any>();

  useEffect(() => {
    fetch(`${Api_Url}/sell-advertisements/${params.id}`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [params.id]);

  if (!data) {
    return <div>Loading data...</div>;
  }

  return (
    <div className="mainAdvertisement">
      <Header />
      <div className="advertisementMainDiv">
        <div className="listBoxAdvertisement">
          <div className="advertisement">
            <div className="photos">
              <Image base64String={data.photos}/>
            </div>
            <div className="descriptionBoxAdvertisement">
              <div className="titleAdvertisement">{data.title}</div>
              <div className="addressAdvertisement">
                <i className="fas fa-map-marker-alt"></i>
                {data.city}, {data.district}, {data.address}
              </div>
              <div className="priceAdvertisement">{data.price}€</div>
              <div className="descriptionAdvertisement">{data.description}</div>
              <Map address= {data.city + data.address}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advertisement;
