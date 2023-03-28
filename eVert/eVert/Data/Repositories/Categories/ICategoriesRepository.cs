using eVert.Data.Entities;

namespace eVert.Data.Repositories.Categories
{
    public interface ICategoriesRepository
    {
        Task CreateAsync(Category category);
        Task DeleteAsync(Category category);
        Task<Category?> GetAsync(int categoryId);
        Task<IReadOnlyList<Category>> GetManyAsync();
        Task UpdateAsync(Category category);
    }
}