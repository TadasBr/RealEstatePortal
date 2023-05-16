using NUnit.Framework;
using Microsoft.EntityFrameworkCore;
using eVert.Data.Entities;
using eVert.Data.Repositories.BuyAdvertisiments;
using eVert.Data;

namespace eVert.RepositoriesTests
{
    [TestFixture]
    public class BuyAdvertisementsRepositoryTests
    {
        private eVertDbContext _dbContext;
        private BuyAdvertisementsRepository _repository;

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<eVertDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
            _dbContext = new eVertDbContext(options);

            _dbContext.BuyAdvertisements.Add(new BuyAdvertisement { Id = 1, Title = "Ad1", City = "City1", Description = "Description1", District = "District1", PhoneNumber = "1234567890", UserId = "User1" });
            _dbContext.BuyAdvertisements.Add(new BuyAdvertisement { Id = 2, Title = "Ad2", City = "City2", Description = "Description2", District = "District2", PhoneNumber = "1234567890", UserId = "User2" });
            _dbContext.BuyAdvertisements.Add(new BuyAdvertisement { Id = 3, Title = "Ad3", City = "City3", Description = "Description3", District = "District3", PhoneNumber = "1234567890", UserId = "User3" });
            _dbContext.SaveChanges();

            _repository = new BuyAdvertisementsRepository(_dbContext);
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
            Assert.AreEqual("Ad1", result.Title);
        }

        [Test]
        public async Task CreateAsync_AddsItemToDbSet()
        {
            var newAd = new BuyAdvertisement { Id = 4, Title = "Ad4", City = "City4", Description = "Description4", District = "District4", PhoneNumber = "1234567890", UserId = "User4" };
            await _repository.CreateAsync(newAd);

            Assert.AreEqual(4, await _dbContext.BuyAdvertisements.CountAsync());
        }

        [Test]
        public async Task UpdateAsync_UpdatesItemInDbSet()
        {
            var updatedAd = await _repository.GetAsync(1);
            updatedAd.Title = "UpdatedAd";
            await _repository.UpdateAsync(updatedAd);

            var updatedItem = await _dbContext.BuyAdvertisements.FindAsync(1);
            Assert.AreEqual("UpdatedAd", updatedItem.Title);
        }

        [Test]
        public async Task DeleteAsync_RemovesItemFromDbSet()
        {
            var adToRemove = await _dbContext.BuyAdvertisements.FindAsync(1);
            await _repository.DeleteAsync(adToRemove);

            Assert.AreEqual(2, await _dbContext.BuyAdvertisements.CountAsync());
        }

        [TearDown]
        public void TearDown()
        {
            _dbContext.Database.EnsureDeleted();
        }
    }
}

