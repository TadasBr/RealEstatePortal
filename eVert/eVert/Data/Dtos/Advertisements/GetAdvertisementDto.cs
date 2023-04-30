using eVert.Data.Dtos.Photos;
using System;
using System.Collections.Generic;

namespace eVert.Data.Dtos.Advertisements
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
        public int RoomsCount { get; set; }
        public int Area { get; set; }
        public bool HasParking { get; set; }
        public int Views { get; set; }
        public List<string> Photos { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }

        public GetAdvertisementDto(int id, string description, string title, string city, string address, string district, int price, int roomsCount, int area, bool hasParking, int views, DateTime createdDate, DateTime updatedDate, List<string> photos, string phoneNumber)
        {
            Id = id;
            Description = description;
            Title = title;
            City = city;
            Address = address;
            District = district;
            Price = price;
            RoomsCount = roomsCount;
            Area = area;
            HasParking = hasParking;
            Views = views;
            CreatedDate = createdDate;
            UpdatedDate = updatedDate;
            Photos = photos;
            PhoneNumber = phoneNumber;
        }
    }
}
