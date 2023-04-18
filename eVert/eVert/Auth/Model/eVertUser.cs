using Microsoft.AspNetCore.Identity;

namespace eVert.Auth.Model
{
    public class eVertUser : IdentityUser
    {
        public bool IsSeller { get; set; }
    }
}
