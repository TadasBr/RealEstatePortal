using Microsoft.AspNetCore.Identity;

namespace eVert.Auth.Model
{
    public class eVertUser : IdentityUser
    {
        bool isSeller { get; set; }

        public void changeRole()
        {
            isSeller = !isSeller;
        }
    }
}
