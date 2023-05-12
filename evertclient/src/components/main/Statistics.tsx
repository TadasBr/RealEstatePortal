import { useEffect, useState } from "react";
import { Api_Url } from "../Constants";
import Header from "./Header";
import BarchartGraph from "./Charts/BarchartGraph";
import ScatterPlotGraph from "./Charts/ScatterPlotGraph";

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

interface BarChartData {
  uniqueText: string;
  count: number;
}

interface ScatterPlotData {
  firstNumber: number;
  secondNumber: number;
}

const Statistics = () => {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [districtsData, setDistrictsData] = useState<BarChartData[]>([]);
  const [citiesData, setCitiesData] = useState<BarChartData[]>([]);
  const [showCitiesData, setShowCitiesData] = useState<boolean>(false);
  const [priceSellTimeData, setPriceSellTimeData] = useState<ScatterPlotData[]>([]);
  const [priceRoomsData, setPriceRoomsData] = useState<ScatterPlotData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${Api_Url}/sold-advertisements`);
      const data = await response.json().then();
      setAdvertisements(data);

      const uniqueDistricts = Array.from(
        new Set(data.map((ad: Advertisement) => ad.district))
      );
      const districtsData: BarChartData[] = uniqueDistricts.map((district) => ({
        uniqueText: district as string,
        count: data.filter((ad: Advertisement) => ad.district === district)
          .length as number,
      }));
      setDistrictsData(districtsData);

      const uniqueCities = Array.from(
        new Set(data.map((ad: Advertisement) => ad.city))
      );
      const citiesData: BarChartData[] = uniqueCities.map((city) => ({
        uniqueText: city as string,
        count: data.filter((ad: Advertisement) => ad.city === city)
          .length as number,
      }));
      setCitiesData(citiesData);

      const scatterPlotDataPriceTime: ScatterPlotData[] = advertisements.map((ad) => ({
        firstNumber: ad.price as number,
        secondNumber: ad.sellTime as number,
      }));
      setPriceSellTimeData(scatterPlotDataPriceTime);
      
      const scatterPlotDataPriceRooms: ScatterPlotData[] = advertisements.map((ad) => ({
        firstNumber: ad.price as number,
        secondNumber: ad.roomsCount as number,
      }));
      setPriceRoomsData(scatterPlotDataPriceRooms);
    };

    fetchData();
  }, []);

  const handleToggleData = () => {
    setShowCitiesData(!showCitiesData);
  };

  if (!advertisements.length) {
    return (
      <div className="text-3xl font-bold text-themeColor flex justify-center items-center h-screen w-full">
        Loading data...
      </div>
    );
  }

  return (
    <div className="flex justify-center bg-[#f1f1f1] min-h-screen py-10">
      <Header />
      <div className="w-10/12 h-full flex flex-col mt-32 mb-16">
        <h1 className="text-4xl font-bold text-themeColor relative text-center">
          Statistics
        </h1>
        <div className="flex flex-row mx-5">
          <div className="flex justify-center mt-8 mb-4 flex-col place-items-center">
            <button
              className="outline-none border-none w-4/12 bg-themeColor py-2 font-semibold px-6 text-white rounded-md hover:-translate-x-3 duration-300"
              onClick={handleToggleData}
            >
              {showCitiesData ? "Show Districts Data" : "Show Cities Data"}
            </button>
            <h1 className="text-themeColor font-semibold text-center text-[22px]">
              Number of Advertisements by {showCitiesData ? "City" : "District"}
            </h1>
            <BarchartGraph
              barChartData={showCitiesData ? citiesData : districtsData}
            />
          </div>
          <div className="flex justify-center mt-8 mb-4 flex-col place-items-center">
            {/* <button
              className="outline-none border-none w-4/12 bg-themeColor py-2 font-semibold px-6 text-white rounded-md hover:-translate-x-3 duration-300"
              onClick={handleToggleData}
            >
              {showCitiesData ? "Show Districts Data" : "Show Cities Data"}
            </button> */}
            <h1 className="text-themeColor font-semibold text-center text-[22px]">
              Price and sell time
            </h1>
            <ScatterPlotGraph
              scatterPlotData={priceSellTimeData}
            />
          </div>
        </div>
        <div className="flex flex-row mx-5">
          <div className="flex justify-center mt-8 mb-4 flex-col place-items-center">
            <button
              className="outline-none border-none w-4/12 bg-themeColor py-2 font-semibold px-6 text-white rounded-md hover:-translate-x-3 duration-300"
              onClick={handleToggleData}
            >
              {showCitiesData ? "Show Districts Data" : "Show Cities Data"}
            </button>
            <h1 className="text-themeColor font-semibold text-center text-[22px]">
              Number of Advertisements by {showCitiesData ? "City" : "District"}
            </h1>
            <BarchartGraph
              barChartData={showCitiesData ? citiesData : districtsData}
            />
          </div>
          <div className="flex justify-center mt-8 mb-4 flex-col place-items-center">
            {/* <button
              className="outline-none border-none w-4/12 bg-themeColor py-2 font-semibold px-6 text-white rounded-md hover:-translate-x-3 duration-300"
              onClick={handleToggleData}
            >
              {showCitiesData ? "Show Districts Data" : "Show Cities Data"}
            </button> */}
            <h1 className="text-themeColor font-semibold text-center text-[22px]">
              Price and sell time
            </h1>
            <ScatterPlotGraph
              scatterPlotData={priceSellTimeData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
