using eVert.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace eVert.Data.Repositories.SoldAdvertisiments
{
    public class SoldAdvertisementsRepository : ISoldAdvertisementsRepository
    {
        private readonly eVertDbContext _eVertDbContext;

        public SoldAdvertisementsRepository(eVertDbContext eVertDbContext)
        {
            _eVertDbContext = eVertDbContext;
        }

        public async Task<IReadOnlyList<SoldAdvertisement>> GetManyAsync()
        {
            return await _eVertDbContext.SoldAdvertisements.ToListAsync();
        }

        public async Task CreateAsync(SoldAdvertisement advertisement)
        {
            _eVertDbContext.SoldAdvertisements.Add(advertisement);
            await _eVertDbContext.SaveChangesAsync();
        }
    }
}
