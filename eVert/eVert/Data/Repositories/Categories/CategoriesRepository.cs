using eVert.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace eVert.Data.Repositories.Categories
{
    public class CategoriesRepository : ICategoriesRepository
    {
        private readonly eVertDbContext _eVertDbContext;

        public CategoriesRepository(eVertDbContext eVertDbContext)
        {
            _eVertDbContext = eVertDbContext;
        }

        public async Task<IReadOnlyList<Category>> GetManyAsync()
        {
            return await _eVertDbContext.Categories.ToListAsync();
        }

        public async Task<Category?> GetAsync(int categoryId)
        {
            return await _eVertDbContext.Categories.FirstOrDefaultAsync(o => o.Id == categoryId);
        }

        public async Task CreateAsync(Category category)
        {
            _eVertDbContext.Categories.Add(category);
            await _eVertDbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(Category category)
        {
            _eVertDbContext.Categories.Update(category);
            await _eVertDbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(Category category)
        {
            _eVertDbContext.Categories.Remove(category);
            await _eVertDbContext.SaveChangesAsync();
        }
    }
}
