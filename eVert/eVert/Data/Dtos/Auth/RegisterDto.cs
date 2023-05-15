using System.ComponentModel.DataAnnotations;

namespace eVert.Data.Dtos.Auth
{
    public class RegisterDto
    {
        [Required]
        public string UserName { get; set; }

        [EmailAddress]
        [Required]
        public string EmailAddress { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public bool IsSeller { get; set; }

        [Required]
        public string PhoneNumber { get; set; }
    }
}
