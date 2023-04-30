namespace eVert.Auth.Model.Dtos
{
    public class UserDto
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string EmailAddress { get; set; }
        public bool IsSeller { get; set; }
        public string PhoneNumber { get; set; }

        public UserDto(string id, string userName, string email, bool isSeller, string phoneNumber)
        {
            Id = id;
            UserName = userName;
            EmailAddress = email;
            IsSeller = isSeller;
            PhoneNumber = phoneNumber;
        }
    }
}
