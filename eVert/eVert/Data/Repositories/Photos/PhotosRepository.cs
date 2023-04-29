using eVert.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace eVert.Data.Repositories.Photos
{
    public class PhotosRepository : IPhotosRepository
    {
        private readonly eVertDbContext _eVertDbContext;

        public PhotosRepository(eVertDbContext eVertDbContext)
        {
            _eVertDbContext = eVertDbContext;
        }

        public async Task<IReadOnlyList<Photo>> GetMany(int advertisementId)
        {
            return await _eVertDbContext.Photos.Where(o => o.AdvertisementId == advertisementId).ToListAsync();
        }

        public async Task CreateAsync(Photo photo)
        {
            _eVertDbContext.Photos.Add(photo);
            await _eVertDbContext.SaveChangesAsync();
        }
    }
}
