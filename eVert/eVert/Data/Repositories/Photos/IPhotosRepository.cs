using eVert.Data.Entities;

namespace eVert.Data.Repositories.Photos
{
    public interface IPhotosRepository
    {
        Task CreateAsync(Photo photo);
        Task<IReadOnlyList<Photo>> GetMany(int advertisementId);
    }
}