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

interface Category {
  name: string;
  id: number;
}

const Statistics = () => {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [barChartData, setBarChartData] = useState<string>("cities");
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);

  const uniqueCities = Array.from(
    new Set(advertisements.map((ad: Advertisement) => ad.city))
  );

  const [cityBarChart, setCityBarChart] = useState<string>(uniqueCities[0]);
  const [cityBarChartNull, setcityBarChartNull] = useState<string>("");
  const [cityScatterPlotNull, setcityScatterPlotNull] = useState<string>("");


  const getUniqueDistricts = (city?: string): string[] => {
    const dataToFilter = city
      ? advertisements.filter((ad) => ad.city === city)
      : advertisements;
    const uniqueDistricts = Array.from(
      new Set(dataToFilter.map((ad) => ad.district))
    );
    return uniqueDistricts;
  };

  const districtsData: BarChartData[] = getUniqueDistricts(cityBarChart).map(
    (district) => ({
      uniqueText: district as string,
      count: advertisements
        .filter((ad: Advertisement) => ad.city === cityBarChart)
        .filter((ad: Advertisement) => ad.district === district)
        .length as number,
    })
  );

  const getUniqueRoomCounts = () => {
    const roomCounts = new Set<number>();
  
    advertisements.forEach((ad) => {
      roomCounts.add(ad.roomsCount);
    });
  
    return Array.from(roomCounts);
  };

  const [districtBarChartNull, setDistrictBarChartNull] = useState<string>("");
  const [districtScatterPlotNull, setDistrictScatterPlotChartNull] = useState<string>("");
  const [roomsScatterPlotNull, setRoomsScatterPlotNull] = useState<number>();
  const [categoryScatterPlotNull, setCategoryScatterPlotNull] = useState<number>();

  const averagePriceByCity: BarChartDataPrice[] = uniqueCities.map((city) => {
    const filteredAds: Advertisement[] = advertisements.filter(
      (ad: Advertisement) => ad.city === city
    );
    const totalPrice = filteredAds.reduce((sum, ad) => sum + ad.price, 0);
    const averagePrice = Math.round(totalPrice / filteredAds.length);
    return {
      uniqueText: city as string,
      price: averagePrice,
    };
  });

  const citiesData: BarChartData[] = uniqueCities.map((city) => ({
    uniqueText: city as string,
    count: advertisements.filter((ad: Advertisement) => ad.city === city)
      .length as number,
  }));

  const scatterPlotDataPriceTime = () => {
    return advertisements
      .filter((ad: Advertisement) =>
        (!cityScatterPlotNull || ad.city === cityScatterPlotNull) &&
        (!districtScatterPlotNull || ad.district === districtScatterPlotNull) &&
        (!roomsScatterPlotNull || ad.roomsCount === roomsScatterPlotNull) &&
        (!categoryScatterPlotNull || ad.categoryId === categoryScatterPlotNull)
      )
      .map((ad: Advertisement) => ({
        firstNumber: ad.price as number,
        secondNumber: ad.sellTime as number,
      }));
  };

  const categories: number[] = Array.from(
    new Set(advertisements.map((ad: Advertisement) => ad.categoryId))
  );

  const advertisementsByCategory: BarChartData[] = categories.map(
    (categoryId: number) => {
      const category = categoriesList.find((c) => c.id === categoryId);
      return {
        uniqueText: category ? category.name : categoryId.toString(),
        count: advertisements.filter(
          (ad: Advertisement) =>
            ad.categoryId === categoryId &&
            (!cityBarChartNull || ad.city === cityBarChartNull) &&
            (!districtBarChartNull || ad.district === districtBarChartNull)
        ).length,
      };
    }
  );

  const uniqueBuiltYears: number[] = Array.from(
    new Set(advertisements.map((ad: Advertisement) => ad.builtYear))
  );

  const averagePricePerBuiltYear: BarChartDataPrice[] = uniqueBuiltYears.map(
    (builtYear) => {
      const filteredAds: Advertisement[] = advertisements
        .sort((a: Advertisement, b: Advertisement) => a.builtYear - b.builtYear)
        .filter(
          (ad: Advertisement) =>
            ad.builtYear === builtYear &&
            (!cityBarChartNull || ad.city === cityBarChartNull) &&
            (!districtBarChartNull || ad.district === districtBarChartNull)
        );

      const totalPrice = filteredAds.reduce((sum, ad) => sum + ad.price, 0);
      const averagePrice = Math.round(totalPrice / filteredAds.length);
      return {
        uniqueText: builtYear.toString() as string,
        price: averagePrice,
      };
    }
  );

  const averagePriceByDistrict: BarChartDataPrice[] = getUniqueDistricts(cityBarChart).map(
    (district) => {
      const filteredAds: Advertisement[] = advertisements.filter(
        (ad: Advertisement) => ad.district === district
      );
      const totalPrice = filteredAds.reduce((sum, ad) => sum + ad.price, 0);
      const averagePrice = Math.round(totalPrice / filteredAds.length);
      return {
        uniqueText: district as string,
        price: averagePrice,
      };
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${Api_Url}/sold-advertisements`);
      const data = await response.json().then();

      fetch(`${Api_Url}/categories`)
        .then((response) => response.json())
        .then((data) => setCategoriesList(data));
      setAdvertisements(data);
    };

    fetchData();
  }, []);

  if (!advertisements.length) {
    return (
      <div className="text-3xl font-bold text-themeColor flex justify-center items-center h-screen w-full">
        Loading data...
      </div>
    );
  }

  return (
    <div className="flex justify-center bg-[#f1f1f1] min-h-screen py-10 whitespace-nowrap overflow-auto scrollbar-hide">
      <Header />
      <div className="w-11/12 h-full flex flex-col mt-32 mb-16">
        <h1 className="text-4xl font-bold text-themeColor relative text-center">
          Statistics
        </h1>
        <div className="flex flex-col">
          <div className="flex justify-center mt-4 mb-4 flex-col place-items-center">
            <select
              className="outline-none border-none w-4/12 bg-themeColor py-2 font-semibold px-6 text-white rounded-md hover:scale"
              onChange={(event) => {
                const selectedOption = event.target.value;
                setBarChartData(selectedOption);
              }}
            >
              <option value="cities">Advertisements by cities</option>
              <option value="districts">Advertisements by districts</option>
              <option value="category">Advertisements by category</option>
              <option value="builtYear">Average price by built year</option>
              <option value="priceByDistrict">Average price by district</option>
              <option value="priceByCity">Average price by city</option>
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
                <select
                  className="outline-none border-none w-5/12 bg-themeColor py-2 font-semibold px-6 text-white rounded-md hover:scale my-2"
                  onChange={(event) => {
                    const selectedOption = event.target.value;
                    setCityBarChart(selectedOption);
                  }}
                >
                  {uniqueCities.map((city) => {
                    return <option value={city}> {city}</option>;
                  })}
                </select>
                <BarchartGraph barChartData={districtsData} />
              </div>
            )}
            {barChartData === "category" && (
              <div className="flex justify-center mt-8 mb-4 flex-col place-items-center">
                <h1 className="text-themeColor font-semibold text-center text-[22px]">
                  Advertisements by category
                </h1>
                <select
                  value={cityBarChartNull ? cityBarChartNull : ""}
                  className="outline-none border-none w-5/12 bg-themeColor py-2 font-semibold px-6 text-white rounded-md hover:scale my-2"
                  onChange={(event) => {
                    const selectedOption = event.target.value;
                    setcityBarChartNull(selectedOption);
                    setDistrictBarChartNull("");
                    if (selectedOption === "") {
                      setcityBarChartNull("");
                    }
                  }}
                >
                  <option value="">All cities</option>;
                  {uniqueCities.map((city) => {
                    return <option value={city}> {city}</option>;
                  })}
                </select>
                {cityBarChartNull && (
                  <select
                    className="outline-none border-none w-5/12 bg-themeColor py-2 font-semibold px-6 text-white rounded-md hover:scale my-2"
                    onChange={(event) => {
                      const selectedOption = event.target.value;
                      setDistrictBarChartNull(selectedOption);
                    }}
                  >
                    <option value="">All districts</option>;
                    {getUniqueDistricts(cityBarChartNull).map((district) => {
                      return <option value={district}> {district}</option>;
                    })}
                  </select>
                )}
                <BarchartGraph
                  barChartData={advertisementsByCategory.sort(
                    (a, b) => b.count - a.count
                  )}
                />
              </div>
            )}
            {barChartData === "builtYear" && (
              <div className="flex justify-center mt-8 mb-4 flex-col place-items-center">
                <h1 className="text-themeColor font-semibold text-center text-[22px]">
                  Average price by built year
                </h1>
                <select
                  value={cityBarChartNull ? cityBarChartNull : ""}
                  className="outline-none border-none w-5/12 bg-themeColor py-2 font-semibold px-6 text-white rounded-md hover:scale my-2"
                  onChange={(event) => {
                    const selectedOption = event.target.value;
                    setcityBarChartNull(selectedOption);
                    setDistrictBarChartNull("");
                    if (selectedOption === "") {
                      setcityBarChartNull("");
                    }
                  }}
                >
                  <option value="">All cities</option>;
                  {uniqueCities.map((city) => {
                    return <option value={city}> {city}</option>;
                  })}
                </select>
                {cityBarChartNull && (
                  <select
                    className="outline-none border-none w-5/12 bg-themeColor py-2 font-semibold px-6 text-white rounded-md hover:scale my-2"
                    onChange={(event) => {
                      const selectedOption = event.target.value;
                      setDistrictBarChartNull(selectedOption);
                    }}
                  >
                    <option value="">All districts</option>;
                    {getUniqueDistricts(cityBarChartNull).map((district) => {
                      return <option value={district}> {district}</option>;
                    })}
                  </select>
                )}
                <BarchartGraphPrice barChartData={averagePricePerBuiltYear} />
              </div>
            )}
            {barChartData === "priceByDistrict" && (
              <div className="flex justify-center mt-8 mb-4 flex-col place-items-center">
                <h1 className="text-themeColor font-semibold text-center text-[22px]">
                  Average price by district
                </h1>
                <select
                  className="outline-none border-none w-5/12 bg-themeColor py-2 font-semibold px-6 text-white rounded-md hover:scale my-2"
                  onChange={(event) => {
                    const selectedOption = event.target.value;
                    setCityBarChart(selectedOption);
                  }}
                >
                  {uniqueCities.map((city) => {
                    return <option value={city}> {city}</option>;
                  })}
                </select>
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
          <div className="flex justify-center mt-8 mb-4 flex-col place-items-center">
              <div className="flex flex-col place-items-center justify-center">
                <h1 className="text-themeColor font-semibold text-center text-[22px]">
                  Price and sell time
                </h1>
                <select
                  value={cityScatterPlotNull ? cityScatterPlotNull : ""}
                  className="outline-none border-none w-5/12 bg-themeColor py-2 font-semibold px-6 text-white rounded-md hover:scale my-2"
                  onChange={(event) => {
                    const selectedOption = event.target.value;
                    setcityScatterPlotNull(selectedOption);
                    setDistrictScatterPlotChartNull("");
                    if (selectedOption === "") {
                      setcityScatterPlotNull("");
                    }
                  }}
                >
                  <option value="">All cities</option>;
                  {uniqueCities.map((city) => {
                    return <option value={city}> {city}</option>;
                  })}
                </select>
                {cityScatterPlotNull && (
                  <select
                    className="outline-none border-none w-5/12 bg-themeColor py-2 font-semibold px-6 text-white rounded-md hover:scale my-2"
                    onChange={(event) => {
                      const selectedOption = event.target.value;
                      setDistrictScatterPlotChartNull(selectedOption);
                    }}
                  >
                    <option value="">All districts</option>;
                    {getUniqueDistricts(cityScatterPlotNull).map((district) => {
                      return <option value={district}> {district}</option>;
                    })}
                  </select>)}
                  <select
                    className="outline-none border-none w-5/12 bg-themeColor py-2 font-semibold px-6 text-white rounded-md hover:scale my-2"
                    onChange={(event) => {
                      const selectedOption = event.target.value;
                      setRoomsScatterPlotNull(parseInt(selectedOption));
                    }}
                  >
                    <option value="">All room counts</option>;
                    {getUniqueRoomCounts().sort((a, b) => a - b).map((roomsCount) => {
                      return <option value={roomsCount}> {roomsCount}</option>;
                    })}
                  </select>
                  <select
                    className="outline-none border-none w-5/12 bg-themeColor py-2 font-semibold px-6 text-white rounded-md hover:scale my-2"
                    onChange={(event) => {
                      const selectedOption = event.target.value;
                      setCategoryScatterPlotNull(parseInt(selectedOption));
                    }}
                  >
                    <option value="">All categories</option>;
                    {categoriesList.map((category) => {
                      return <option value={category.id}> {category.name}</option>;
                    })}
                  </select>
                <ScatterPlotGraph scatterPlotData={scatterPlotDataPriceTime()} />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
