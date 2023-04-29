using eVert.Data.Entities;

namespace eVert.Data.Repositories.SoldAdvertisiments
{
    public interface ISoldAdvertisementsRepository
    {
        Task CreateAsync(SoldAdvertisement advertisement);
        Task<IReadOnlyList<SoldAdvertisement>> GetManyAsync();
    }
}