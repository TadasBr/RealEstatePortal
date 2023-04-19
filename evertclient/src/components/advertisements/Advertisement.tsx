import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Api_Url } from "../Constants";
import Header from "../main/Header";
import Map from "../main/Map";

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
    <div className="main">
      <Header />
      <div className="mainDiv">
        <div className="listBox">
          <div className="advertisement">
            <div className="photos"></div>
            <div className="descriptionBox">
              <div className="title">{data.title}</div>
              <div className="address">
                <i className="fas fa-map-marker-alt"></i>
                {data.city}, {data.district}, {data.address}
              </div>
              <div className="price">{data.price}€</div>
              <div className="description">{data.description}</div>
              <Map address= {data.city + data.address}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advertisement;
