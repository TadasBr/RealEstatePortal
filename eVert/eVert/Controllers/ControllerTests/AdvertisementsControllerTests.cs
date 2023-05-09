using eVert.Auth.Model;
using eVert.Data.Dtos.Advertisements;
using eVert.Data.Entities;
using eVert.Data.Repositories.Advertisements;
using eVert.Data.Repositories.Photos;
using eVert.Data.Repositories.SoldAdvertisiments;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using NUnit.Framework;
using Assert = NUnit.Framework.Assert;
using CollectionAssert = NUnit.Framework.CollectionAssert;

namespace eVert.Controllers.ControllerTests
{
    [TestFixture]
    public class AdvertisementsControllerTests
    {
        private Mock<IAdvertisementsRepository> _mockAdvertisementsRepository;
        private Mock<IAuthorizationService> _mockAuthorizationService;
        private Mock<ISoldAdvertisementsRepository> _mockSoldAdvertisementsRepository;
        private Mock<IPhotosRepository> _mockPhotosRepository;
        private Mock<UserManager<eVertUser>> _mockUserManager;
        private AdvertisementsController _controller;

        [SetUp]
        public void Setup()
        {
            _mockAdvertisementsRepository = new Mock<IAdvertisementsRepository>();
            _mockAuthorizationService = new Mock<IAuthorizationService>();
            _mockSoldAdvertisementsRepository = new Mock<ISoldAdvertisementsRepository>();
            _mockPhotosRepository = new Mock<IPhotosRepository>();
            _mockUserManager = new Mock<UserManager<eVertUser>>(MockBehavior.Strict, new object[] { null, null, null, null, null, null, null, null, null });

            //_controller = new AdvertisementsController(_mockAdvertisementsRepository.Object, _mockAuthorizationService.Object, _mockUserManager.Object, _mockSoldAdvertisementsRepository.Object, _mockPhotosRepository.Object);
        }

        [Test]
        public async Task GetManyAsync_ReturnsAdvertisements()
        {
            // Arrange
            var expectedAdvertisement = new Advertisement
            {
                Id = 1,
                Description = "Test advertisement",
                Title = "Test title",
                City = "Test city",
                Address = "Test address",
                District = "Test district",
                Price = 1234,
                RoomsCount = 2,
                Area = 56,
                HasParking = true,
                Views = 0,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now,
                PhoneNumber = "123456789",
                BuiltYear = 2000
            };
            _mockAdvertisementsRepository.Setup(x => x.GetManyAsync()).ReturnsAsync(new List<Advertisement> { expectedAdvertisement });
            _mockPhotosRepository.Setup(x => x.GetMany(It.IsAny<int>())).ReturnsAsync(new List<Photo>());

            // Act
            var result = await _controller.GetManyAsync();
            var advertisementDto = result.Single();

            // Assert
            Assert.AreEqual(expectedAdvertisement.Id, advertisementDto.Id);
            Assert.AreEqual(expectedAdvertisement.Description, advertisementDto.Description);
            Assert.AreEqual(expectedAdvertisement.Title, advertisementDto.Title);
            Assert.AreEqual(expectedAdvertisement.City, advertisementDto.City);
            Assert.AreEqual(expectedAdvertisement.Address, advertisementDto.Address);
            Assert.AreEqual(expectedAdvertisement.District, advertisementDto.District);
            Assert.AreEqual(expectedAdvertisement.Price, advertisementDto.Price);
            Assert.AreEqual(expectedAdvertisement.RoomsCount, advertisementDto.RoomsCount);
            Assert.AreEqual(expectedAdvertisement.Area, advertisementDto.Area);
            Assert.AreEqual(expectedAdvertisement.HasParking, advertisementDto.HasParking);
            Assert.AreEqual(expectedAdvertisement.Views, advertisementDto.Views);
            Assert.AreEqual(expectedAdvertisement.CreatedDate, advertisementDto.CreatedDate);
            Assert.AreEqual(expectedAdvertisement.UpdatedDate, advertisementDto.UpdatedDate);
            Assert.AreEqual(expectedAdvertisement.PhoneNumber, advertisementDto.PhoneNumber);
            Assert.AreEqual(expectedAdvertisement.BuiltYear, advertisementDto.BuiltYear);
        }
    }

}
