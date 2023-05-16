using Moq;
using NUnit.Framework;
using Microsoft.EntityFrameworkCore;
using eVert.Data.Entities;
using eVert.Data.Repositories.Advertisements;
using eVert.Data;
namespace eVert.RepositoriesTests
{
    [TestFixture]
    public class AdvertisementsRepositoryTests
    {
        private eVertDbContext _dbContext;
        private AdvertisementsRepository _repository;

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<eVertDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
            _dbContext = new eVertDbContext(options);

            _dbContext.Advertisements.Add(new Advertisement
            {
                Id = 1,
                Title = "Ad1",
                Address = "123 Main St",
                City = "New York",
                Description = "This is Advertisement 1",
                District = "Manhattan",
                PhoneNumber = "555-1234",
                UserId = "user123"
            });

            _dbContext.Advertisements.Add(new Advertisement
            {
                Id = 2,
                Title = "Ad2",
                Address = "456 Elm St",
                City = "Los Angeles",
                Description = "This is Advertisement 2",
                District = "Downtown",
                PhoneNumber = "555-5678",
                UserId = "user456"
            });

            _dbContext.Advertisements.Add(new Advertisement
            {
                Id = 3,
                Title = "Ad3",
                Address = "789 Oak St",
                City = "Chicago",
                Description = "This is Advertisement 3",
                District = "North Side",
                PhoneNumber = "555-9101",
                UserId = "user789"
            });

            _dbContext.SaveChanges();


            _repository = new AdvertisementsRepository(_dbContext);
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
            var newAd = new Advertisement
            {
                Id = 4,
                Title = "Ad3",
                Address = "789 Oak St",
                City = "Chicago",
                Description = "This is Advertisement 3",
                District = "North Side",
                PhoneNumber = "555-9101",
                UserId = "user789"
            };
            await _repository.CreateAsync(newAd);

            var allAds = await _repository.GetManyAsync();
            Assert.AreEqual(4, allAds.Count);
        }

        [Test]
        public async Task UpdateAsync_UpdatesItemInDbSet()
        {
            var updatedAd = await _repository.GetAsync(1);
            if (updatedAd != null)
            {
                updatedAd.Title = "UpdatedAd";
                await _repository.UpdateAsync(updatedAd);
            }


            var updatedAdFromDb = await _repository.GetAsync(1);
            Assert.AreEqual("UpdatedAd", updatedAdFromDb.Title);
        }

        [Test]
        public async Task DeleteAsync_RemovesItemFromDbSet()
        {
            var adToRemove = await _dbContext.Advertisements.FindAsync(1);
            await _repository.DeleteAsync(adToRemove);

            var allAds = await _repository.GetManyAsync();
            Assert.AreEqual(2, allAds.Count);
        }
    }
}