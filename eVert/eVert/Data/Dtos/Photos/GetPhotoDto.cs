namespace eVert.Data.Dtos.Photos
{
    public class GetPhotoDto
    {
        public string Data { get; set; }

        public GetPhotoDto(string data)
        {
            Data = data;
        }
    }
}
