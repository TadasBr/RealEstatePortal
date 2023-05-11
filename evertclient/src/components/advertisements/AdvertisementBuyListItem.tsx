import React from "react";

interface BuyAdvertisementItem {
  id: number;
  title: string;
  description: string;
  city: string;
  district: string;
  minPrice: number;
  maxPrice: number;
  minArea: number;
  maxArea: number;
  minRoomsCount: number;
  maxRoomsCount: number;
  hasParking: boolean;
}

interface BuyAdvertisementListItemProps {
  item: BuyAdvertisementItem;
  navigate: (path: string) => void;
}

const BuyAdvertisementListItem: React.FC<BuyAdvertisementListItemProps> = ({
  item,
  navigate,
}) => {
  return (
    <div
      className="rounded-lg bg-white shadow-2xl w-full h-full flex gap-5 hover:scale-[102%] duration-300 overflow-hidden mb-12 p-4 cursor-pointer"
      onClick={() => navigate(`/buy-advertisements/${item.id}`)}
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold text-themeColor">{item.title}</h2>
        <div className="text-sm font-semibold">
          {item.city}, {item.district}
        </div>
        <div className="text-[17px] font-semibold">
          {item.minPrice}€ - {item.maxPrice}€
        </div>
        <div className="text-[17px] font-semibold">
          {item.minArea}m² - {item.maxArea}m²
        </div>
        <div className="text-[17px] font-semibold">
          {item.minRoomsCount} - {item.maxRoomsCount} Rooms
        </div>
        <div className="text-[17px] font-semibold">
          {item.hasParking
            ? "Parking spot is mandatory"
            : "Parking spot is not mandatory"}
        </div>
      </div>
    </div>
  );
};

export default BuyAdvertisementListItem;
