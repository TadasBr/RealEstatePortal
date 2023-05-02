using Microsoft.Identity.Client;

namespace eVert.Data.Dtos.BuyAdvertisiments
{
    public class GetSimpleAdvertisementDto
    {
        public int Price { get; set; }
        public double Area { get; set; }
        public string Location { get; set; }
        public int RoomsCount { get; set; }
        public string Url { get; set; }

        public GetSimpleAdvertisementDto(int price, double area, string location, int roomsCount, string url)
        {
            Price = price;
            Area = area;
            Location = location;
            RoomsCount = roomsCount;
            Url = url;
        }
    }
}
