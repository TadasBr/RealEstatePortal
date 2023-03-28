namespace eVert.Auth.Model.Dtos
{
    public class SuccessfulLoginDto
    {
        public string AccessToken { get; set; }

        public SuccessfulLoginDto(string accessToken)
        {
            AccessToken = accessToken;
        }
    }
}
