using eVert.Auth.Model;
using System.ComponentModel.DataAnnotations;

namespace eVert.Data.Entities
{
    public class BuyAdvertisement : IUserOwnedResource
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
        public DateTime? SoldDate { get; set; }
        public int CategoryId { get; set; }

        [Required]
        public string UserId { get; set; }
        public eVertUser User { get; set; }
    }
}
