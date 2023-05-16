using eVert.Data.Entities;
using eVert.Data.Repositories.SoldAdvertisiments;
using eVert.Data;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;

namespace eVert.RepositoriesTests
{
    public class SoldAdvertisementsRepositoryTests
    {
        private eVertDbContext _dbContext;
        private SoldAdvertisementsRepository _repository;

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<eVertDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
            _dbContext = new eVertDbContext(options);

            _dbContext.SoldAdvertisements.Add(new SoldAdvertisement
            {
                Id = 1,
                City = "City1",
                District = "District1",
                Price = 100,
                HasParking = true,
                SellTime = 1,
                CategoryId = 1,
                RoomsCount = 1,
                Area = 100,
                BuiltYear = 2000
            });
            _dbContext.SaveChanges();

            _repository = new SoldAdvertisementsRepository(_dbContext);
        }

        [Test]
        public async Task GetManyAsync_ReturnsCorrectNumberOfItems()
        {
            var results = await _repository.GetManyAsync();
            Assert.AreEqual(1, results.Count);
        }

        [Test]
        public async Task CreateAsync_AddsItemToDbSet()
        {
            var newSoldAdvertisement = new SoldAdvertisement
            {
                Id = 2,
                City = "City2",
                District = "District2",
                Price = 200,
                HasParking = false,
                SellTime = 2,
                CategoryId = 2,
                RoomsCount = 2,
                Area = 200,
                BuiltYear = 2010
            };
            await _repository.CreateAsync(newSoldAdvertisement);
            Assert.AreEqual(2, await _dbContext.SoldAdvertisements.CountAsync());
        }
    }
}
