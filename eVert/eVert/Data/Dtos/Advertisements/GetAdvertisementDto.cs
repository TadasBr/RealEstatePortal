﻿namespace eVert.Data.Dtos.Advertisements
{
    public class GetAdvertisementDto
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string Title { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string District { get; set; }
        public int Price { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }

        public GetAdvertisementDto(int id, string description, string title, string city, string address, string district, int price, DateTime createdDate, DateTime updatedDate)
        {
            Id = id;
            Description = description;
            Title = title;
            City = city;
            Address = address;
            District = district;
            Price = price;
            CreatedDate = createdDate;
            UpdatedDate = updatedDate;
        }
    }
}
