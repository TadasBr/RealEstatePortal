namespace eVert.Data.Dtos.BuyAdvertisiments
{
    public class GetBuyAdvertisementDto
    {
        public int Id { get; set; }
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
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }

        public GetBuyAdvertisementDto(int id, string title, string description, string city, string district, int minPrice, int maxPrice, int minArea, int maxArea, int minRoomsCount,
            int maxRoomsCount, bool hasParking, DateTime createdDate, DateTime updatedDate)
        {
            Id = id;
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
            CreatedDate = createdDate;
            UpdatedDate = updatedDate;
        }
    }
}
