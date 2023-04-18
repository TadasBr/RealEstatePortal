namespace eVert.Data.Dtos.BuyAdvertisiments
{
    public class UpdateBuyAdvertisementDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string City { get; set; }
        public string District { get; set; }
        public int MinPrice { get; set; }
        public int MaxPrice { get; set; }
        public int MinArea { get; set; }
        public int MaxArea { get; set; }
        public int MinRoomsCount { get; set; }
        public int MaxRoomsCount { get; set; }
        public bool HasParking { get; set; }
        public int CategoryId { get; set; }

        public UpdateBuyAdvertisementDto(string title, string description, string city, string district, int minPrice, int maxPrice, int minArea, int maxArea, int minRoomsCount, int maxRoomsCount, bool hasParking, int categoryId)
        {
            Title = title;
            Description = description;
            City = city;
            District = district;
            MinPrice = minPrice;
            MaxPrice = maxPrice;
            MinArea = minArea;
            MaxArea = maxArea;
            MinRoomsCount = minRoomsCount;
            MaxRoomsCount = maxRoomsCount;
            HasParking = hasParking;
            CategoryId = categoryId;
        }
    }
}
