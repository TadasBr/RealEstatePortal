namespace eVert.Auth.Model.Dtos
{
    public class SuccessfulLoginDto
    {
        public string AccessToken { get; set; }
        public string UserName { get; set; }

        public SuccessfulLoginDto(string accessToken, string userName)
        {
            AccessToken = accessToken;
            UserName = userName;
        }
    }
}
