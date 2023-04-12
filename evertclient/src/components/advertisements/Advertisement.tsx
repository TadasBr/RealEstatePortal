import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Api_Url } from "../Constants";
import Header from "../main/Header";

const Advertisement: React.FC = () => {
  const params = useParams();
  const [data, setData] = useState<any>();

  useEffect(() => {
    fetch(`${Api_Url}/advertisements/${params.id}`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [params.id]);

  if (!data) {
    return <div>Loading data...</div>;
  }

  return (
    <div className="main">
      <Header />
      <div className="listBox">
        <div className="advertisement">
          <div className="photos"></div>
          <div className="descriptionBox">
            <div className="title">{data.title}</div>
            <div>
              {data.city}, {data.district}, {data.address}
            </div>
            <div>{data.price}€</div>
            <div>{data.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advertisement;
