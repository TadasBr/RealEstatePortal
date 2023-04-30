using Microsoft.Identity.Client;

namespace eVert.Data.Dtos.BuyAdvertisiments
{
    public class GetKampasDto
    {
        public int Price { get; set; }
        public double Area { get; set; }
        public string Location { get; set; }
        public int RoomsCount { get; set; }

        public GetKampasDto(int price, double area, string location, int roomsCount)
        {
            Price = price;
            Area = area;
            Location = location;
            RoomsCount = roomsCount;
        }
    }
}
