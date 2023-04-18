using eVert.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace eVert.Data.Repositories.BuyAdvertisiments
{
    public class BuyAdvertisementsRepository : IBuyAdvertisementsRepository
    {
        private readonly eVertDbContext _eVertDbContext;

        public BuyAdvertisementsRepository(eVertDbContext eVertDbContext)
        {
            _eVertDbContext = eVertDbContext;
        }

        public async Task<IReadOnlyList<BuyAdvertisement>> GetManyAsync()
        {
            return await _eVertDbContext.BuyAdvertisements.ToListAsync();
        }

        public async Task<BuyAdvertisement?> GetAsync(int advertisementId)
        {
            return await _eVertDbContext.BuyAdvertisements.FirstOrDefaultAsync(o => o.Id == advertisementId);
        }

        public async Task CreateAsync(BuyAdvertisement advertisement)
        {
            _eVertDbContext.BuyAdvertisements.Add(advertisement);
            await _eVertDbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(BuyAdvertisement advertisement)
        {
            _eVertDbContext.BuyAdvertisements.Update(advertisement);
            await _eVertDbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(BuyAdvertisement advertisement)
        {
            _eVertDbContext.BuyAdvertisements.Remove(advertisement);
            await _eVertDbContext.SaveChangesAsync();
        }
    }
}
