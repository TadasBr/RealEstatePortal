using eVert.Data.Entities;

namespace eVert.Data.Repositories.Advertisements
{
    public interface IAdvertisementsRepository
    {
        Task CreateAsync(Advertisement advertisement);
        Task DeleteAsync(Advertisement advertisement);
        Task<Advertisement?> GetAsync(int advertisementId);
        Task<IReadOnlyList<Advertisement>> GetManyAsync();
        Task UpdateAsync(Advertisement advertisement);
    }
}