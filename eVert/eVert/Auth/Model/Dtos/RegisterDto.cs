using System.ComponentModel.DataAnnotations;

namespace eVert.Auth.Model.Dtos
{
    public class RegisterDto
    {
        [Required]
        public string UserName { get; set; }

        [EmailAddress][Required]
        public string EmailAddress { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
