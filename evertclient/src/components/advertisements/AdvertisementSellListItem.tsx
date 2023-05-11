import Image from "./Image";

interface Advertisement {
  id: number;
  title: string;
  city: string;
  district: string;
  address: string;
  price: number;
  photos: string[];
  description: string;
  roomsCount: number;
  area: number;
  hasParking: boolean;
  views: number;
  createdDate: Date;
  updatedDate: Date;
  phoneNumber: string;
  builtYear: number;
}

interface AdvertisementListItemProps {
  item: Advertisement;
  adType: "sell" | "buy";
  navigate: (path: string) => void;
}

const AdvertisementSellListItem: React.FC<AdvertisementListItemProps> = ({
  item,
  adType,
  navigate,
}) => {
  return (
    <div
      className="rounded-lg bg-white shadow-2xl w-full h-full flex gap-5 hover:scale-[102%] duration-300 overflow-hidden mb-12 cursor-pointer"
      onClick={() => navigate(`/${adType}-advertisements/${item.id}`)}
    >
      <div className="h-[130px] max-w-[20%]">
        <Image base64String={item.photos[0]} />
      </div>
      <div className="flex flex-col gap-2 py-2">
        <h2 className="text-xl font-semibold text-themeColor">{item.title}</h2>
        <div className="text-sm font-semibold">
          {item.city}, {item.district}, {item.address}
        </div>
        <h6 className="text-lg font-semibold text-themeColor font-sans">
          {item.price}€
        </h6>
      </div>
    </div>
  );
};

export default AdvertisementSellListItem;
