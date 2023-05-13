import { useEffect, useState } from "react";
import { Api_Url } from "../Constants";
import Header from "./Header";
import BarchartGraph from "./Charts/BarchartGraph";
import ScatterPlotGraph from "./Charts/ScatterPlotGraph";
import ScatterPlotGraphRoomsPrice from "./Charts/ScatterPlotGraphRoomsPrice";
import BarchartGraphPrice from "./Charts/BarchartGraphPrice";

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

interface BarChartDataPrice {
  uniqueText: string;
  price: number;
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
  const [scatterPlotData, setScatterPlotData] =
    useState<string>("priceAndTime");
  const [barChartData, setBarChartData] = useState<string>("cities");
  const [priceSellTimeData, setPriceSellTimeData] = useState<ScatterPlotData[]>(
    []
  );
  const [priceRoomsData, setPriceRoomsData] = useState<ScatterPlotData[]>([]);
  const [advertisementsByCategory, setAdvertisementsByCategory] = useState<
    BarChartData[]
  >([]);
  const [averagePricePerBuiltYear, setAveragePricePerBuiltYear] = useState<
    BarChartDataPrice[]
  >([]);
  const [averagePriceByDistrict, setAveragePriceByDistrict] = useState<
    BarChartDataPrice[]
  >([]);
  const [averagePriceByCity, setAveragePriceByCity] = useState<
    BarChartDataPrice[]
  >([]);

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

      const scatterPlotDataPriceTime: ScatterPlotData[] = advertisements.map(
        (ad) => ({
          firstNumber: ad.price as number,
          secondNumber: ad.sellTime as number,
        })
      );
      setPriceSellTimeData(scatterPlotDataPriceTime);

      const scatterPlotDataPriceRooms: ScatterPlotData[] = advertisements.map(
        (ad) => ({
          firstNumber: ad.price as number,
          secondNumber: ad.roomsCount as number,
        })
      );
      setPriceRoomsData(scatterPlotDataPriceRooms);

      const categories = Array.from(
        new Set(advertisements.map((ad) => ad.categoryId))
      );
      const advertisementsByCategory: BarChartData[] = categories.map(
        (categoryId) => ({
          uniqueText: categoryId.toString(),
          count: advertisements.filter((ad) => ad.categoryId === categoryId)
            .length,
        })
      );
      setAdvertisementsByCategory(advertisementsByCategory);

      const uniqueBuiltYears = Array.from(
        new Set(advertisements.map((ad) => ad.builtYear))
      );
      const averagePricePerBuiltYear: BarChartDataPrice[] =
        uniqueBuiltYears.map((builtYear) => {
          const filteredAds = advertisements.filter(
            (ad) => ad.builtYear === builtYear
          );
          const totalPrice = filteredAds.reduce((sum, ad) => sum + ad.price, 0);
          const averagePrice = totalPrice / filteredAds.length;
          return {
            uniqueText: builtYear.toString() as string,
            price: averagePrice,
          };
        });
      setAveragePricePerBuiltYear(averagePricePerBuiltYear);

      const averagePriceByDistrict: BarChartDataPrice[] = uniqueDistricts.map(
        (district) => {
          const filteredAds = advertisements.filter(
            (ad) => ad.district === district
          );
          const totalPrice = filteredAds.reduce((sum, ad) => sum + ad.price, 0);
          const averagePrice = totalPrice / filteredAds.length;
          return {
            uniqueText: district as string,
            price: averagePrice,
          };
        }
      );
      setAveragePriceByDistrict(averagePriceByDistrict);

      const averagePriceByCity: BarChartDataPrice[] = uniqueCities.map(
        (city) => {
          const filteredAds = advertisements.filter((ad) => ad.city === city);
          const totalPrice = filteredAds.reduce((sum, ad) => sum + ad.price, 0);
          const averagePrice = totalPrice / filteredAds.length;
          return {
            uniqueText: city as string,
            price: averagePrice,
          };
        }
      );
      setAveragePriceByCity(averagePriceByCity);
    };

    fetchData();
  }, [priceRoomsData]);

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

  console.log(advertisements);

  return (
    <div className="flex justify-center bg-[#f1f1f1] min-h-screen py-10 whitespace-nowrap overflow-auto scrollbar-hide" >
      <Header />
      <div className="w-11/12 h-full flex flex-col mt-32 mb-16">
        <h1 className="text-4xl font-bold text-themeColor relative text-center">
          Statistics
        </h1>
        <div className="flex flex-row">
          <div className="flex justify-center mt-4 mb-4 flex-col place-items-center">
            <select
              className="outline-none border-none w-5/12 bg-themeColor py-2 font-semibold px-6 text-white rounded-md hover:scale"
              onChange={(event) => {
                const selectedOption = event.target.value;
                setBarChartData(selectedOption);
              }}
            >
              <option value="cities">Advertisements by cities</option>
              <option value="districts">Advertisements by districts</option>
              <option value="category">Advertisements by category</option>
              <option value="builtYear">Price by built year</option>
              <option value="priceByDistrict">Price by district</option>
              <option value="priceByCity">Price by city</option>
            </select>
            {barChartData === "cities" && (
              <div>
                <h1 className="text-themeColor font-semibold text-center text-[22px]">
                  Advertisements by cities
                </h1>
                <BarchartGraph barChartData={citiesData} />
              </div>
            )}
            {barChartData === "districts" && (
              <div className="flex justify-center mt-8 mb-4 flex-col place-items-center">
                <h1 className="text-themeColor font-semibold text-center text-[22px]">
                  Advertisements by districts
                </h1>
                <BarchartGraph barChartData={districtsData} />
              </div>
            )}
            {barChartData === "category" && (
              <div className="flex justify-center mt-8 mb-4 flex-col place-items-center">
                <h1 className="text-themeColor font-semibold text-center text-[22px]">
                  Advertisements by category
                </h1>
                <BarchartGraph barChartData={advertisementsByCategory} />
              </div>
            )}
            {barChartData === "builtYear" && (
              <div className="flex justify-center mt-8 mb-4 flex-col place-items-center">
                <h1 className="text-themeColor font-semibold text-center text-[22px]">
                  Average price by built yearx``
                </h1>
                <BarchartGraphPrice barChartData={averagePricePerBuiltYear} />
              </div>
            )}
            {barChartData === "priceByDistrict" && (
              <div className="flex justify-center mt-8 mb-4 flex-col place-items-center">
                <h1 className="text-themeColor font-semibold text-center text-[22px]">
                  Average price by district
                </h1>
                <BarchartGraphPrice barChartData={averagePriceByDistrict} />
              </div>
            )}
            {barChartData === "priceByCity" && (
              <div className="flex justify-center mt-8 mb-4 flex-col place-items-center">
                <h1 className="text-themeColor font-semibold text-center text-[22px]">
                  Average price by city
                </h1>
                <BarchartGraphPrice barChartData={averagePriceByCity} />
              </div>
            )}
          </div>
          <div className="flex-1" />
          <div className="flex justify-center mt-8 mb-4 flex-col place-items-center">
            <select
              className="outline-none border-none w-5/12 bg-themeColor py-2 font-semibold px-6 text-white rounded-md hover:scale"
              onChange={(event) => {
                const selectedOption = event.target.value;
                if (selectedOption === "priceAndRoomsCount") {
                  setScatterPlotData("priceAndRoomsCount");
                } else if (selectedOption === "priceAndTime") {
                  setScatterPlotData("priceAndTime");
                } else {
                  // Handle other options
                }
              }}
            >
              <option value="priceAndTime">Price and time</option>
              <option value="priceAndRoomsCount">Price and rooms</option>
              <option value="button3">Button 3</option>
              <option value="button4">Button 4</option>
            </select>
            {scatterPlotData === "priceAndTime" && (
              <div>
                <h1 className="text-themeColor font-semibold text-center text-[22px]">
                  Price and sell time
                </h1>
                <ScatterPlotGraph scatterPlotData={priceSellTimeData} />
              </div>
            )}
            {scatterPlotData === "priceAndRoomsCount" && (
              <div className="flex justify-center mt-8 mb-4 flex-col place-items-center">
                <h1 className="text-themeColor font-semibold text-center text-[22px]">
                  Price and rooms count
                </h1>
                <ScatterPlotGraphRoomsPrice scatterPlotData={priceRoomsData} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
