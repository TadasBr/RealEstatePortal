using eVert.Data.Entities;

namespace eVert.Data.Repositories.BuyAdvertisiments
{
    public interface IBuyAdvertisementsRepository
    {
        Task CreateAsync(BuyAdvertisement advertisement);
        Task DeleteAsync(BuyAdvertisement advertisement);
        Task<BuyAdvertisement?> GetAsync(int advertisementId);
        Task<IReadOnlyList<BuyAdvertisement>> GetManyAsync();
        Task UpdateAsync(BuyAdvertisement advertisement);
    }
}