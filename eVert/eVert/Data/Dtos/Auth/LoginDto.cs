using System.ComponentModel.DataAnnotations;

namespace eVert.Data.Dtos.Auth
{
    public class LoginDto
    {
        public string UserName { get; set; }

        public string Password { get; set; }

        public LoginDto(string userName, string password)
        {
            UserName = userName;
            Password = password;
        }
    }
}
