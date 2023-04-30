namespace eVert.Data.Dtos.BuyAdvertisiments
{
    public class BuyAdvertisementForKampasScrapeDto
    {
        public string City { get; set; }
        public int MinPrice { get; set; }
        public int MaxPrice { get; set; }
        public int MinArea { get; set; }
        public int MaxArea { get; set; }
        public int MinRoomsCount { get; set; }
        public int MaxRoomsCount { get; set; }

        public BuyAdvertisementForKampasScrapeDto(string city, int minPrice, int maxPrice, int minArea, int maxArea, int minRoomsCount, int maxRoomsCount)
        {
            City = city;
            MinPrice = minPrice;
            MaxPrice = maxPrice;
            MinArea = minArea;
            MaxArea = maxArea;
            MinRoomsCount = minRoomsCount;
            MaxRoomsCount = maxRoomsCount;
        }

    }
}
