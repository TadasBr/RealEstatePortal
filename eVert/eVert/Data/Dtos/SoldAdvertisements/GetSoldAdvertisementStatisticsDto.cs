namespace eVert.Data.Dtos.SoldAdvertisements
{
    public class GetSoldAdvertisementStatisticsDto
    {
        public int Id { get; set; }
        public string City { get; set; }
        public string District { get; set; }
        public int Price { get; set; }
        public bool HasParking { get; set; }
        public int SellTime { get; set; }
        public int CategoryId { get; set; }
    }
}
