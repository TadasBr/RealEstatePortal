import { useEffect, useState } from "react";
import { Api_Url } from "../Constants";
import Header from "./Header";

type Advertisement = {
  city: string;
  district: string;
  price: number;
  hasParking: boolean;
  sellTime: number;
  categoryId: number;
  roomsCount: number;
  area: number;
  builtYear: number;
};

const Statistics = () => {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${Api_Url}/sold-advertisements`);
      const data = await response.json();
      setAdvertisements(data);
    };
    fetchData();
  }, [advertisements]);

  return (
    <div className="flex justify-center bg-[#f1f1f1] min-h-screen py-10">
      <Header />
      <div className="w-6/12 h-full flex flex-col mt-32 mb-16">
        <h1 className="text-4xl font-bold text-themeColor relative text-center">
          Statistics
        </h1>
        <h1>Sold Advertisements</h1>
        <table>
          <thead>
            <tr>
              <th>City</th>
              <th>District</th>
              <th>Price</th>
              <th>Parking</th>
              <th>Sell Time</th>
              <th>Category Id</th>
              <th>Rooms Count</th>
              <th>Area</th>
              <th>Built Year</th>
            </tr>
          </thead>
          <tbody>
            {advertisements.map((advertisement) => (
              <tr>
                <td>{advertisement.city}</td>
                <td>{advertisement.district}</td>
                <td>{advertisement.price}</td>
                <td>{advertisement.hasParking ? "Yes" : "No"}</td>
                <td>{advertisement.sellTime}</td>
                <td>{advertisement.categoryId}</td>
                <td>{advertisement.roomsCount}</td>
                <td>{advertisement.area}</td>
                <td>{advertisement.builtYear}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Statistics;
