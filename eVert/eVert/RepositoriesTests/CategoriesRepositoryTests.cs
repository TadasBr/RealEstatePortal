using NUnit.Framework;
using Microsoft.EntityFrameworkCore;
using System;
using eVert.Data;
using eVert.Data.Entities;
using eVert.Data.Repositories.Categories;
using System.Threading.Tasks;

namespace eVert.RepositoriesTests
{
    public class CategoriesRepositoryTests
    {
        private eVertDbContext _dbContext;
        private CategoriesRepository _repository;

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<eVertDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
            _dbContext = new eVertDbContext(options);

            _dbContext.Categories.Add(new Category { Id = 1, Name = "Category1" });
            _dbContext.Categories.Add(new Category { Id = 2, Name = "Category2" });
            _dbContext.Categories.Add(new Category { Id = 3, Name = "Category3" });
            _dbContext.SaveChanges();

            _repository = new CategoriesRepository(_dbContext);
        }

        [Test]
        public async Task GetManyAsync_ReturnsCorrectNumberOfItems()
        {
            var results = await _repository.GetManyAsync();
            Assert.AreEqual(3, results.Count);
        }

        [Test]
        public async Task GetAsync_ReturnsCorrectItem()
        {
            var result = await _repository.GetAsync(1);
            Assert.AreEqual("Category1", result.Name);
        }

        [Test]
        public async Task CreateAsync_AddsItemToDbSet()
        {
            var newCategory = new Category { Id = 4, Name = "Category4" };
            await _repository.CreateAsync(newCategory);
            Assert.AreEqual(4, await _dbContext.Categories.CountAsync());
        }

        [Test]
        public async Task UpdateAsync_UpdatesItemInDbSet()
        {
            var updatedCategory = await _repository.GetAsync(1);
            updatedCategory.Name = "UpdatedCategory";
            await _repository.UpdateAsync(updatedCategory);

            var updatedItem = await _dbContext.Categories.FindAsync(1);
            Assert.AreEqual("UpdatedCategory", updatedItem.Name);
        }

        [Test]
        public async Task DeleteAsync_RemovesItemFromDbSet()
        {
            var categoryToRemove = await _repository.GetAsync(1);
            await _repository.DeleteAsync(categoryToRemove);
            Assert.AreEqual(2, await _dbContext.Categories.CountAsync());
        }
    }
}
