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
    return (
      <div className="text-3xl font-bold text-themeColor flex justify-center items-center h-screen w-full">
        Loading data...
      </div>
    );
  }

  const handleNextClick = () => {
    const nextIndex = (currentPhotoIndex + 1) % data.photos.length;
    setCurrentPhotoIndex(nextIndex);
  };

  const handlePrevClick = () => {
    const prevIndex =
      (currentPhotoIndex + data.photos.length - 1) % data.photos.length;
    setCurrentPhotoIndex(prevIndex);
  };

  const showPhotoButtons = data.photos.length > 1;

  return (
    <div className="flex justify-center bg-[#f1f1f1] min-h-screen py-10">
      <Header />
      <div className="flex justify-between max-w-[1124px] w-full h-full mt-28">
        <div className="rounded-xl bg-white shadow-xl w-full h-full flex">
          <div className="flex flex-row items-stretch p-6 w-full">
            <div className="w-[45%] flex flex-col justify-between photos">
              <Image base64String={data?.photos[currentPhotoIndex]} />
              {showPhotoButtons && (
                <div className="mt-4">
                  <button
                    onClick={handlePrevClick}
                    className="text-base w-max px-4 text-white cursor-pointer h-8 bg-themeColor text-center font-medium rounded-md outline-none border-none inline-block ml-2"
                    disabled={currentPhotoIndex === 0}
                  >
                    Prev
                  </button>
                  <button
                    onClick={handleNextClick}
                    className="text-base w-max px-4 text-white cursor-pointer h-8 bg-themeColor text-center font-medium rounded-md outline-none border-none inline-block ml-2"
                    disabled={currentPhotoIndex === data.photos.length - 1}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
            <div className="flex flex-col justify-between w-[55%] p-5 pr-0">
              <div className="text-gray-600 font-semibold">
                {data.views} views
              </div>
              <h1 className="font-semibold text-themeColor mt-2 mb-3 text-2xl capitalize">
                {data.title}
              </h1>
              <div className="flex items-center text-gray-600 mb-3 font-medium">
                <i className="fas fa-map-marker-alt mr-1 text-themeColor"></i>
                {data.city}, {data.district}, {data.address}
              </div>
              <h3 className="text-xl font-semibold text-themeColor mb-3">
                <span className="text-gray-600 font-medium">Price: </span>{" "}
                {data.price}€
              </h3>
              <p className="text-[17px] text-gray-600 leading-[1.5] mb-3">
                {data.description}
              </p>

              {/* tags */}
              <div className="flex items-center gap-4 mb-6 mt-1">
                <div className="text-themeColor font-semibold bg-[#f1f1f1] px-3 py-[2px] flex gap-1 items-center justify-center w-max shadow-lg rounded">
                  <span className="text-gray-600 font-medium">Rooms: </span>{" "}
                  {data.roomsCount}
                </div>
                <div className="text-themeColor font-semibold bg-[#f1f1f1] px-3 py-[2px] flex gap-1 items-center justify-center w-max shadow-lg rounded">
                  <span className="text-gray-600 font-medium">Area: </span>{" "}
                  {data.area}m²
                </div>
                <div className="text-themeColor font-semibold bg-[#f1f1f1] px-3 py-[2px] flex gap-1 items-center justify-center w-max shadow-lg rounded">
                  <span className="text-gray-600 font-medium">
                    Built year:{" "}
                  </span>{" "}
                  {data.builtYear}
                </div>
                <div className="text-themeColor font-semibold bg-[#f1f1f1] px-3 py-[2px] flex gap-1 items-center justify-center w-max shadow-lg rounded">
                  {data.hasParking ? "Has Parking" : "No Parking spot"}
                </div>
              </div>

              <Map address={data.city + data.address} />

              <div className="text-themeColor font-semibold mt-3 mb-1">
                <span className="text-gray-600 font-medium">Created: </span>{" "}
                {new Date(data.createdDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                , Last updated:{" "}
                {new Date(data.updatedDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                ,
              </div>
              <div className="text-themeColor font-semibold">
                {" "}
                <span className="text-gray-600 font-medium">
                  Phone number:{" "}
                </span>{" "}
                {data.phoneNumber}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advertisement;
