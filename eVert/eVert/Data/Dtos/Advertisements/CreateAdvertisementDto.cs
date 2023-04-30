using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

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
        public int RoomsCount { get; set; }
        public int Area { get; set; }
        public bool HasParking { get; set; }
        public int CategoryId { get; set; }
        public string PhoneNumber { get; set; }

        public CreateAdvertisementDto(string title, string description, string city, string address, string district, int price, int roomsCount, int area, bool hasParking, int categoryId, string phoneNumber)
        {
            Title = title;
            Description = description;
            City = city;
            Address = address;
            District = district;
            Price = price;
            CategoryId = categoryId;
            RoomsCount = roomsCount;
            Area = area;
            HasParking = hasParking;
            PhoneNumber = phoneNumber;
        }
    }
}
