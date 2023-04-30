namespace eVert.Data.Dtos.SoldAdvertisements
{
    public class GetSoldAdvertisementStatisticsDto
    {
        public string City { get; set; }
        public string District { get; set; }
        public int Price { get; set; }
        public bool HasParking { get; set; }
        public int SellTime { get; set; }
        public int CategoryId { get; set; }
        public int RoomsCount { get; set; }
        public int Area { get; set; }

        public GetSoldAdvertisementStatisticsDto(string city, string district, int price, bool hasParking, int sellTime, int categoryId, int roomsCount, int area)
        {
            City = city;
            District = district;
            Price = price;
            HasParking = hasParking;
            SellTime = sellTime;
            CategoryId = categoryId;
            RoomsCount = roomsCount;
            Area = area;
        }
    }
}
