namespace eVert.Data.Dtos.SoldAdvertisements
{
    public class CreateSoldAdvertisementDto
    {
        public string City { get; set; }
        public string District { get; set; }
        public int Price { get; set; }
        public bool HasParking { get; set; }
        public int SellTime { get; set; }
        public int CategoryId { get; set; }

        public CreateSoldAdvertisementDto(string city, string district, int price, bool hasParking, int sellTime, int categoryId)
        {
            City = city;
            District = district;
            Price = price;
            HasParking = hasParking;
            SellTime = sellTime;
            CategoryId = categoryId;
        }
    }
}
