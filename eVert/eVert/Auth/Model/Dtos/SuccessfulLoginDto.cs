namespace eVert.Auth.Model.Dtos
{
    public class SuccessfulLoginDto
    {
        public string AccessToken { get; set; }
        public string UserName { get; set; }
        public bool IsSeller { get; set; }    

        public SuccessfulLoginDto(string accessToken, string userName, bool isSeller)
        {
            AccessToken = accessToken;
            UserName = userName;
            IsSeller = isSeller;
        }
    }
}
