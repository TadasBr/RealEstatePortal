namespace eVert.Auth.Model.Dtos
{
    public class UserDto
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string EmailAddress { get; set; }
        public bool IsSeller { get; set; }

        public UserDto(string id, string userName, string email, bool isSeller)
        {
            Id = id;
            UserName = userName;
            EmailAddress = email;
            IsSeller = isSeller;
        }
    }
}
