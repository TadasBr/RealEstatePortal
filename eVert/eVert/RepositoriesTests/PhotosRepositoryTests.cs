using eVert.Data.Entities;
using eVert.Data.Repositories.Photos;
using eVert.Data;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;

namespace eVert.RepositoriesTests
{
    public class PhotosRepositoryTests
    {
        private eVertDbContext _dbContext;
        private PhotosRepository _repository;

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<eVertDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
            _dbContext = new eVertDbContext(options);

            _dbContext.Photos.Add(new Photo
            {
                Id = 1,
                Data = "Data1",
                AdvertisementId = 1
            });
            _dbContext.SaveChanges();

            _repository = new PhotosRepository(_dbContext);
        }

        [Test]
        public async Task GetMany_ReturnsCorrectNumberOfItems()
        {
            var results = await _repository.GetMany(1);
            Assert.AreEqual(1, results.Count);
        }

        [Test]
        public async Task CreateAsync_AddsItemToDbSet()
        {
            var newPhoto = new Photo
            {
                Id = 2,
                Data = "Data2",
                AdvertisementId = 2
            };
            await _repository.CreateAsync(newPhoto);
            Assert.AreEqual(2, await _dbContext.Photos.CountAsync());
        }
    }
}
