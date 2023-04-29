using eVert.Data.Repositories.Photos;
using Microsoft.AspNetCore.Mvc;

namespace eVert.Controllers
{
    [ApiController]
    [Route("api/photos")]
    public class PhotosController
    {
        public IPhotosRepository _photosRepository;

        public PhotosController(IPhotosRepository photosRepository)
        {
            _photosRepository = photosRepository;
        }
    }
}
