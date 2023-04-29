namespace eVert.Data.Dtos.Photos
{
    public class CreatePhotoDto
    {
        public string Data { get; set; }
        public int AdvertisementId { get; set; }

        public CreatePhotoDto(string data, int advertisementId)
        {
            Data = data;
            AdvertisementId = advertisementId;
        }
    }
}
