using eVert.Auth.Model;
using System.ComponentModel.DataAnnotations;

namespace eVert.Data.Entities
{
    public class Advertisement : IUserOwnedResource
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string District { get; set; }
        public int Price { get; set; }
        public int RoomsCount { get; set; }
        public int Area { get; set; }
        public bool HasParking { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public DateTime? SoldDate { get; set; }
        public int CategoryId { get; set; }
        public int Views { get; set; }

        [Required]
        public string UserId { get; set; }
        public eVertUser User { get; set; }
    }
}
