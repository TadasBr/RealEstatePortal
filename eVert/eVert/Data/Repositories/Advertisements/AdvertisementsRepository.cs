using eVert.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace eVert.Data.Repositories.Advertisements
{
    public class AdvertisementsRepository : IAdvertisementsRepository
    {
        private readonly eVertDbContext _eVertDbContext;

        public AdvertisementsRepository(eVertDbContext eVertDbContext)
        {
            _eVertDbContext = eVertDbContext;
        }

        public async Task<IReadOnlyList<Advertisement>> GetManyAsync()
        {
            return await _eVertDbContext.Advertisements.ToListAsync();
        }

        public async Task<Advertisement?> GetAsync(int advertisementId)
        {
            return await _eVertDbContext.Advertisements.FirstOrDefaultAsync(o => o.Id == advertisementId);
        }

        public async Task CreateAsync(Advertisement advertisement)
        {
            _eVertDbContext.Advertisements.Add(advertisement);
            await _eVertDbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(Advertisement advertisement)
        {
            _eVertDbContext.Advertisements.Update(advertisement);
            await _eVertDbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(Advertisement advertisement)
        {
            _eVertDbContext.Advertisements.Remove(advertisement);
            await _eVertDbContext.SaveChangesAsync();
        }
    }
}
