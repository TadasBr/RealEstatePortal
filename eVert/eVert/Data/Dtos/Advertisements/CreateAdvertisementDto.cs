namespace eVert.Data.Dtos.Advertisements
{
    public class CreateAdvertisementDto
    {
        public string Description { get; set; }
        public string Title { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string District { get; set; }
        public int Price { get; set; }
        public int CategoryId { get; set; }

        public CreateAdvertisementDto(string title, string description, string city, string address, string district, int price, int categoryId)
        {
            Title = title;
            Description = description;
            City = city;
            Address = address;
            District = district;
            Price = price;
            CategoryId = categoryId;
        }
    }
}
