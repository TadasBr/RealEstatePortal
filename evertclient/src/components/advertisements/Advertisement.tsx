import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Api_Url } from "../Constants";
import Header from "../main/Header";
import Map from "../main/Map";
import Image from "./Image";

interface AdvertisementData {
  id: number;
  description: string;
  title: string;
  city: string;
  address: string;
  district: string;
  price: number;
  roomsCount: number;
  area: number;
  hasParking: boolean;
  views: number;
  photos: string[];
  phoneNumber: string;
  createdDate: string;
  updatedDate: string;
  builtYear: number;
}

const Advertisement: React.FC = () => {
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<AdvertisementData>();
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    fetch(`${Api_Url}/sell-advertisements/${params.id}`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [params.id]);

  if (!data) {
    return <div>Loading data...</div>;
  }

  const handleNextClick = () => {
    const nextIndex = (currentPhotoIndex + 1) % data.photos.length;
    setCurrentPhotoIndex(nextIndex);
  };

  const handlePrevClick = () => {
    const prevIndex = (currentPhotoIndex + data.photos.length - 1) % data.photos.length;
    setCurrentPhotoIndex(prevIndex);
  };

  const showPhotoButtons = data.photos.length > 1;

  return (
    <div className="mainAdvertisement">
      <Header />
      <div className="advertisementMainDiv">
        <div className="listBoxAdvertisement">
          <div className="advertisement">
            <div className="photos">
              <Image base64String={data.photos[currentPhotoIndex]} />
              {showPhotoButtons && (
                <div className="photoButtons">
                  <button onClick={handlePrevClick} className="imageButton" disabled={currentPhotoIndex === 0}>
                    Prev
                  </button>
                  <button onClick={handleNextClick} className="imageButton" disabled={currentPhotoIndex === data.photos.length - 1}>
                    Next
                  </button>
                </div>
              )}
            </div>
            <div className="descriptionBoxAdvertisement">
            <div className="views">{data.views} views</div>
              <div className="titleAdvertisement">{data.title}</div>
              <div className="addressAdvertisement">
                <i className="fas fa-map-marker-alt"></i>
                {data.city}, {data.district}, {data.address}
              </div>
              <div className="priceAdvertisement">{data.price}€</div>
              <div className="descriptionAdvertisement">{data.description}</div>
              <div className="roomsCount">Rooms: {data.roomsCount}</div>
              <div className="area">Area: {data.area}m²</div>
              <div className="builtYear">Built year: {data.builtYear}</div>
              <div className="hasParking">{data.hasParking ? 'Has Parking' : 'No Parking spot'}</div>
              <Map address={data.city + data.address} />
              <div>
                Created: {new Date(data.createdDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}, 
                Last updated: {new Date(data.updatedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })},
              </div>
              <div>
                Phone number: {data.phoneNumber}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advertisement;
